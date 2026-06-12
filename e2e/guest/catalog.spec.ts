import { expect, test } from "@playwright/test";
import {
  E2E_DRAFT_COURSE,
  E2E_PUBLISHED_COURSE,
} from "../constants";

test.describe("guest catalog", () => {
  test("home page shows the published E2E course", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_COURSE.title })
    ).toBeVisible();
  });

  test("unpublished course is not listed on the catalog", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(E2E_DRAFT_COURSE.title)).toHaveCount(0);
  });

  test("dashboard redirects unauthenticated users away", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL("/");
  });

  test("teacher area redirects non-teachers away", async ({ page }) => {
    await page.goto("/teacher/courses");

    await expect(page).toHaveURL("/");
  });
});
