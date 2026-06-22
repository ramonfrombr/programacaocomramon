import { expect, test } from "../fixtures";
import {
  E2E_DRAFT_MENTORSHIP,
  E2E_MENTORSHIP_CATEGORIES,
  E2E_PUBLISHED_MENTORSHIP,
  watchMentorshipPath,
} from "../constants";

test.describe("student mentorships", () => {
  test("published mentorship appears on the catalog", async ({ page }) => {
    await page.goto("/mentorships");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_MENTORSHIP.title })
    ).toBeVisible();
  });

  test("draft mentorship is hidden from the catalog", async ({ page }) => {
    await page.goto("/mentorships");

    await expect(page.getByText(E2E_DRAFT_MENTORSHIP.title)).toHaveCount(0);
  });

  test("catalog search filters mentorships by title", async ({ page }) => {
    await page.goto("/mentorships");

    await page
      .locator(".border-b")
      .getByRole("textbox", { name: /search for a mentorship/i })
      .fill("Published");
    await expect(page).toHaveURL(/title=Published/);
    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_MENTORSHIP.title })
    ).toBeVisible();
  });

  test("watch page shows the mentorship title and category chip", async ({
    page,
  }) => {
    await page.goto(watchMentorshipPath(E2E_PUBLISHED_MENTORSHIP.id));

    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_MENTORSHIP.title,
        level: 1,
      })
    ).toBeVisible();
    await expect(
      page.getByText(E2E_MENTORSHIP_CATEGORIES[0].name)
    ).toBeVisible();
  });
});
