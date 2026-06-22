import { clerk } from "@clerk/testing/playwright";
import { expect, test as setup } from "../fixtures";
import fs from "node:fs";
import path from "node:path";
import { loadE2EEnv, setupClerkTesting } from "./env";
import { clerkSignInPagePath } from "./clerk-sign-in-page";

loadE2EEnv();

const authFile = path.join(__dirname, "../../playwright/.auth/teacher.json");

setup("authenticate teacher and save storage state", async ({ page }) => {
  const email = process.env.E2E_CLERK_TEACHER_EMAIL;
  const password = process.env.E2E_CLERK_TEACHER_PASSWORD;
  const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;

  if (!email || !password) {
    throw new Error(
      "E2E_CLERK_TEACHER_EMAIL and E2E_CLERK_TEACHER_PASSWORD are required — set them in .env.test."
    );
  }

  if (!teacherId) {
    throw new Error(
      "NEXT_PUBLIC_TEACHER_ID is required — set it to the Clerk teacher userId in .env.test."
    );
  }

  await setupClerkTesting();

  await page.goto(clerkSignInPagePath());
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: email,
      password,
    },
  });

  const userId = await page.evaluate(() => window.Clerk?.user?.id ?? null);
  if (!userId) {
    throw new Error(
      "Failed to read Clerk userId after teacher sign-in — ensure Clerk loaded on the page."
    );
  }

  if (userId !== teacherId) {
    throw new Error(
      `Signed-in teacher userId (${userId}) does not match NEXT_PUBLIC_TEACHER_ID (${teacherId}). Update .env.test with the Clerk Dashboard userId for the teacher test user.`
    );
  }

  await page.goto("/teacher/courses");
  await expect(page).toHaveURL(/\/teacher\/courses/);

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
