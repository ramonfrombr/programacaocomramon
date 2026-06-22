import { expect, test } from "../fixtures";
import {
  E2E_DRAFT_SEMINAR,
  E2E_PUBLISHED_SEMINAR,
  watchSeminarPath,
} from "../constants";

test.describe("student seminars", () => {
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
