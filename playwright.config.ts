import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const baseURL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const isCI = !!process.env.CI;

const AUTH_DIR = path.join(__dirname, "playwright", ".auth");
const STUDENT_AUTH_FILE = path.join(AUTH_DIR, "student.json");
const TEACHER_AUTH_FILE = path.join(AUTH_DIR, "teacher.json");

/** Env vars the Next.js webServer needs — pass through from `.env.test` / CI secrets. */
const WEB_SERVER_ENV_KEYS = [
  "NODE_ENV",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_LANGUAGE",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
  "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
  "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
  "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
  "NEXT_PUBLIC_TEACHER_ID",
  "DATABASE_URL",
  "UPLOADTHING_SECRET",
  "UPLOADTHING_APP_ID",
  "MUX_TOKEN_ID",
  "MUX_TOKEN_SECRET",
  "STRIPE_API_KEY_DEV",
  "STRIPE_API_KEY_PROD",
  "STRIPE_WEBHOOK_SECRET",
  "MP_ACCESS_TOKEN",
  "NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL",
] as const;

function webServerEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const key of WEB_SERVER_ENV_KEYS) {
    const value = process.env[key];
    if (value !== undefined) {
      env[key] = value;
    }
  }
  return env;
}

const chromium = {
  ...devices["Desktop Chrome"],
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["html"], ["github"]] : [["html"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    env: webServerEnv(),
  },
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "auth-student",
      testMatch: /auth-student\.setup\.ts/,
      dependencies: ["setup"],
    },
    {
      name: "auth-teacher",
      testMatch: /auth-teacher\.setup\.ts/,
      dependencies: ["setup"],
    },
    {
      name: "guest",
      testMatch: /guest\/.*\.spec\.ts/,
      use: { ...chromium },
      dependencies: ["setup"],
    },
    {
      name: "student",
      testMatch: /student\/.*\.spec\.ts/,
      use: {
        ...chromium,
        storageState: STUDENT_AUTH_FILE,
      },
      dependencies: ["auth-student"],
    },
    {
      name: "teacher",
      testMatch: /teacher\/.*\.spec\.ts/,
      use: {
        ...chromium,
        storageState: TEACHER_AUTH_FILE,
      },
      dependencies: ["auth-teacher"],
    },
  ],
});
