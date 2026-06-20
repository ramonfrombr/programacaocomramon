import { expect, test } from "@playwright/test";
import {
  courseCatalogPath,
  E2E_CHAPTER_IDS,
  E2E_DRAFT_COURSE,
  E2E_PUBLISHED_CHAPTERS,
  E2E_PUBLISHED_COURSE,
  watchChapterPath,
} from "../constants";

test.describe.configure({ mode: "serial" });

test.describe("student learning", () => {
  test("dashboard shows the purchased course in progress", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText("In Progress")).toBeVisible();
    await expect(page.getByText(E2E_PUBLISHED_COURSE.title)).toBeVisible();
  });

  test("unpublished course is not listed on the catalog", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: E2E_PUBLISHED_COURSE.title })
    ).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_COURSE.title)).toHaveCount(0);
  });

  test("course page shows a progress bar", async ({ page }) => {
    await page.goto(courseCatalogPath(E2E_PUBLISHED_COURSE.slug));

    await expect(
      page.getByRole("heading", { name: E2E_PUBLISHED_COURSE.title, level: 1 })
    ).toBeVisible();
    await expect(page.getByText(/\d+% Complete/)).toBeVisible();
  });

  test("free chapter watch page shows the chapter title", async ({ page }) => {
    await page.goto(
      watchChapterPath(E2E_PUBLISHED_COURSE.id, E2E_CHAPTER_IDS.free)
    );

    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_CHAPTERS[0].title,
        level: 2,
      })
    ).toBeVisible();
  });

  test("paid chapter is accessible after purchase is seeded", async ({
    page,
  }) => {
    await page.goto(
      watchChapterPath(E2E_PUBLISHED_COURSE.id, E2E_CHAPTER_IDS.paid)
    );

    await expect(page.getByText("This chapter is locked")).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: E2E_PUBLISHED_CHAPTERS[1].title,
        level: 2,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mark as completed" })
    ).toBeVisible();
  });

  test("marking a chapter complete updates dashboard progress", async ({
    page,
  }) => {
    await page.goto(
      watchChapterPath(E2E_PUBLISHED_COURSE.id, E2E_CHAPTER_IDS.free)
    );

    await page.getByRole("button", { name: "Mark as completed" }).click();

    // Completing a chapter with a next chapter auto-advances the player.
    await expect(page).toHaveURL(
      watchChapterPath(E2E_PUBLISHED_COURSE.id, E2E_CHAPTER_IDS.paid)
    );
    await expect(page.getByText("50% Complete")).toBeVisible();

    await page.goto("/dashboard");

    await expect(page.getByText("50% Complete")).toBeVisible();
  });
});
