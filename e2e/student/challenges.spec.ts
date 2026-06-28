import { expect, test } from "../fixtures";
import {
  E2E_CHALLENGE_CATEGORIES,
  E2E_DRAFT_CHALLENGE,
  E2E_PUBLISHED_CHALLENGE,
  watchChallengePath,
} from "../constants";
import {
  clearMembershipSubscription,
  createMembershipDb,
  readClerkUserId,
  simulateMembershipCheckoutCompleted,
} from "../helpers/membership";

test.describe.configure({ mode: "serial" });

test.describe("student challenges", () => {
  let userId: string;
  const db = createMembershipDb();

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/student.json",
    });
    const page = await context.newPage();
    userId = await readClerkUserId(page);
    await simulateMembershipCheckoutCompleted(userId, "DIAMOND");
    await context.close();
  });

  test.afterAll(async () => {
    if (userId) {
      await clearMembershipSubscription(db, userId);
    }

    await db.$disconnect();
  });

  test("published challenge appears on the catalog", async ({ page }) => {
    await page.goto("/challenges");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_CHALLENGE.title })
    ).toBeVisible();
  });

  test("draft challenge is hidden from the catalog", async ({ page }) => {
    await page.goto("/challenges");

    await expect(page.getByText(E2E_DRAFT_CHALLENGE.title)).toHaveCount(0);
  });

  test("catalog search filters challenges by title", async ({ page }) => {
    await page.goto("/challenges");

    await page
      .locator(".border-b")
      .getByRole("textbox", { name: /search for a challenge/i })
      .fill("Published");
    await expect(page).toHaveURL(/title=Published/);
    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_CHALLENGE.title })
    ).toBeVisible();
  });

  test("watch page shows the challenge title and metadata badges", async ({
    page,
  }) => {
    await page.goto(watchChallengePath(E2E_PUBLISHED_CHALLENGE.id));

    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_CHALLENGE.title,
        level: 1,
      })
    ).toBeVisible();
    await expect(page.getByText("Medium")).toBeVisible();
    await expect(
      page.getByText(E2E_CHALLENGE_CATEGORIES[0].name)
    ).toBeVisible();
    await expect(
      page.getByText(E2E_CHALLENGE_CATEGORIES[1].name)
    ).toBeVisible();
  });
});
