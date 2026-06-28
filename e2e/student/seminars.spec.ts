import { expect, test } from "../fixtures";
import {
  E2E_DRAFT_SEMINAR,
  E2E_PUBLISHED_SEMINAR,
  watchSeminarPath,
} from "../constants";
import {
  clearMembershipSubscription,
  createMembershipDb,
  readClerkUserId,
  simulateMembershipCheckoutCompleted,
} from "../helpers/membership";

test.describe.configure({ mode: "serial" });

test.describe("student seminars", () => {
  let userId: string;
  const db = createMembershipDb();

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/student.json",
    });
    const page = await context.newPage();
    userId = await readClerkUserId(page);
    await simulateMembershipCheckoutCompleted(userId, "GOLD");
    await context.close();
  });

  test.afterAll(async () => {
    if (userId) {
      await clearMembershipSubscription(db, userId);
    }

    await db.$disconnect();
  });

  test("published seminar appears on the catalog", async ({ page }) => {
    await page.goto("/seminars");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_SEMINAR.title })
    ).toBeVisible();
  });

  test("draft seminar is hidden from the catalog", async ({ page }) => {
    await page.goto("/seminars");

    await expect(page.getByText(E2E_DRAFT_SEMINAR.title)).toHaveCount(0);
  });

  test("catalog search filters seminars by title", async ({ page }) => {
    await page.goto("/seminars");

    await page
      .locator(".border-b")
      .getByRole("textbox", { name: /search for a seminar/i })
      .fill("Published");
    await expect(page).toHaveURL(/title=Published/);
    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_SEMINAR.title })
    ).toBeVisible();
  });

  test("watch page shows the seminar title", async ({ page }) => {
    await page.goto(watchSeminarPath(E2E_PUBLISHED_SEMINAR.id));

    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_SEMINAR.title,
        level: 1,
      })
    ).toBeVisible();
  });
});
