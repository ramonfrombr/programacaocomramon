import { expect, test } from "@playwright/test";
import {
  courseCatalogPath,
  E2E_PUBLISHED_COURSE,
} from "../constants";

test.describe("guest catalog", () => {
  test("home page shows the sales funnel", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("#landing-heading")).toBeVisible();
  });

  test("course catalog page redirects guests to home", async ({ page }) => {
    await page.goto(courseCatalogPath(E2E_PUBLISHED_COURSE.slug));

    await expect(page).toHaveURL("/");
    await expect(page.locator("#main-content")).toBeVisible();
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
