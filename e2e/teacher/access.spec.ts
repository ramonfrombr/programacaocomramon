import { expect, test } from "@playwright/test";
import {
  E2E_DRAFT_COURSE,
  E2E_PUBLISHED_COURSE,
} from "../constants";

test.describe("teacher access", () => {
  test("courses page lists seeded courses", async ({ page }) => {
    await page.goto("/teacher/courses");

    await expect(page).toHaveURL(/\/teacher\/courses/);
    await expect(page.getByText(E2E_PUBLISHED_COURSE.title)).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_COURSE.title)).toBeVisible();
  });

  test("create course form renders", async ({ page }) => {
    await page.goto("/teacher/create");

    await expect(page).toHaveURL(/\/teacher\/create/);
    await expect(
      page.getByRole("heading", { name: "Name Your Course", level: 1 })
    ).toBeVisible();
    await expect(page.getByLabel("Course Title")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });
});
