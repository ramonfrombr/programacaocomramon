import { test as setup } from "@playwright/test";
import { execSync } from "node:child_process";
import path from "node:path";
import { loadE2EEnv, setupClerkTesting } from "./env";

setup.describe.configure({ mode: "serial" });

const repoRoot = path.resolve(__dirname, "../..");

loadE2EEnv();

setup("clerk testing tokens", async () => {
  await setupClerkTesting();
});

setup("reset and seed database", async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required — set it in .env.test or CI secrets."
    );
  }

  if (!process.env.NEXT_PUBLIC_TEACHER_ID) {
    throw new Error(
      "NEXT_PUBLIC_TEACHER_ID is required — set it to the Clerk teacher userId in .env.test."
    );
  }

  execSync("npm run db:e2e:reset", {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env,
  });
});
