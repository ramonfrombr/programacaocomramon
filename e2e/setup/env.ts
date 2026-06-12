import { clerkSetup } from "@clerk/testing/playwright";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "../..");
const envTestPath = path.join(repoRoot, ".env.test");

type EnvApplyMode = "fill-empty" | "override-nonempty";

function applyEnvFile(filePath: string, mode: EnvApplyMode): void {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const parsed = dotenv.parse(fs.readFileSync(filePath));

  for (const [key, value] of Object.entries(parsed)) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    if (mode === "fill-empty") {
      const current = process.env[key];
      if (current === undefined || current.trim() === "") {
        process.env[key] = value;
      }
      continue;
    }

    process.env[key] = value;
  }
}

/**
 * Load E2E env vars for Playwright workers.
 *
 * - `.env` / `.env.local` fill gaps for local dev (e.g. Clerk keys not yet copied into `.env.test`)
 * - Non-empty values in `.env.test` override dev env (e.g. dedicated Atlas test `DATABASE_URL`)
 * - In CI, vars can come from workflow secrets without a `.env.test` file
 */
export function loadE2EEnv(): void {
  applyEnvFile(path.join(repoRoot, ".env"), "fill-empty");
  applyEnvFile(path.join(repoRoot, ".env.local"), "fill-empty");

  if (fs.existsSync(envTestPath)) {
    applyEnvFile(envTestPath, "override-nonempty");
    return;
  }

  if (process.env.CI) {
    return;
  }

  throw new Error(
    "Missing .env.test — copy .env.test.example to .env.test and fill in values."
  );
}

function requireEnv(name: string, hint: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set. ${hint}`);
  }
  return value;
}

/**
 * Configure Clerk testing tokens for the current worker.
 *
 * Each Playwright project runs in its own worker, so auth setup projects must
 * call this even after the global setup project — `CLERK_TESTING_TOKEN` does
 * not propagate across workers.
 */
export async function setupClerkTesting(): Promise<void> {
  loadE2EEnv();

  const publishableKey = requireEnv(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "Add it to .env.test (preferred for E2E) or .env."
  );
  const secretKey = requireEnv(
    "CLERK_SECRET_KEY",
    "Add it to .env.test (preferred for E2E) or .env."
  );

  await clerkSetup({
    dotenv: false,
    publishableKey,
    secretKey,
  });
}
