import { clerk } from "@clerk/testing/playwright";
import { PrismaClient } from "@prisma/client";
import { expect, test as setup } from "../fixtures";
import fs from "node:fs";
import path from "node:path";
import { E2E_PUBLISHED_COURSE } from "../constants";
import { loadE2EEnv, setupClerkTesting } from "./env";
import { clerkSignInPagePath } from "./clerk-sign-in-page";

loadE2EEnv();

const authFile = path.join(__dirname, "../../playwright/.auth/student.json");

async function upsertStudentPurchase(userId: string) {
  const db = new PrismaClient();

  try {
    await db.purchase.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: E2E_PUBLISHED_COURSE.id,
        },
      },
      create: {
        userId,
        courseId: E2E_PUBLISHED_COURSE.id,
        price: E2E_PUBLISHED_COURSE.price,
      },
      update: {
        price: E2E_PUBLISHED_COURSE.price,
      },
    });
  } finally {
    await db.$disconnect();
  }
}

setup("authenticate student and save storage state", async ({ page }) => {
  const email = process.env.E2E_CLERK_STUDENT_EMAIL;
  const password = process.env.E2E_CLERK_STUDENT_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "E2E_CLERK_STUDENT_EMAIL and E2E_CLERK_STUDENT_PASSWORD are required — set them in .env.test."
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
      "Failed to read Clerk userId after student sign-in — ensure Clerk loaded on the page."
    );
  }

  await upsertStudentPurchase(userId);

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/dashboard/);

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
