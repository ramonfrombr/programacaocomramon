import { expect, test } from "../fixtures";
import {
  E2E_DRAFT_INTERVIEW,
  E2E_PUBLISHED_INTERVIEW,
  watchInterviewPath,
} from "../constants";
import {
  clearMembershipSubscription,
  createMembershipDb,
  readClerkUserId,
  simulateMembershipCheckoutCompleted,
} from "../helpers/membership";

test.describe.configure({ mode: "serial" });

test.describe("student interviews", () => {
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

  test("published interview appears on the catalog", async ({ page }) => {
    await page.goto("/interviews");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_INTERVIEW.title })
    ).toBeVisible();
  });

  test("draft interview is hidden from the catalog", async ({ page }) => {
    await page.goto("/interviews");

    await expect(page.getByText(E2E_DRAFT_INTERVIEW.title)).toHaveCount(0);
  });

  test("catalog search filters interviews by title", async ({ page }) => {
    await page.goto("/interviews");

    await page
      .locator(".border-b")
      .getByRole("textbox", { name: /search for an interview/i })
      .fill("Published");
    await expect(page).toHaveURL(/title=Published/);
    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_INTERVIEW.title })
    ).toBeVisible();
  });

  test("watch page shows the interview title and guest", async ({ page }) => {
    await page.goto(watchInterviewPath(E2E_PUBLISHED_INTERVIEW.id));

    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_INTERVIEW.title,
        level: 1,
      })
    ).toBeVisible();
    await expect(
      page.getByText(E2E_PUBLISHED_INTERVIEW.guestName)
    ).toBeVisible();
  });
});
