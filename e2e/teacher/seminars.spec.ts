import { expect, test } from "@playwright/test";
import {
  E2E_DRAFT_SEMINAR,
  E2E_PUBLISHED_SEMINAR,
  teacherSeminarSetupPath,
} from "../constants";

test.describe("teacher seminars", () => {
  test("seminars page lists seeded seminars", async ({ page }) => {
    await page.goto("/teacher/seminars");

    await expect(page).toHaveURL(/\/teacher\/seminars/);
    await expect(page.getByText(E2E_PUBLISHED_SEMINAR.title)).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_SEMINAR.title)).toBeVisible();
  });

  test("create form renders", async ({ page }) => {
    await page.goto("/teacher/seminars/create");

    await expect(page).toHaveURL(/\/teacher\/seminars\/create/);
    await expect(
      page.getByRole("heading", { name: "Name Your Seminar", level: 1 })
    ).toBeVisible();
    await expect(page.getByLabel("Seminar Title")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });

  test("draft setup form renders", async ({ page }) => {
    await page.goto(teacherSeminarSetupPath(E2E_DRAFT_SEMINAR.id));

    await expect(page).toHaveURL(
      new RegExp(`/teacher/seminars/${E2E_DRAFT_SEMINAR.id}`)
    );
    await expect(
      page.getByRole("heading", { name: "Seminar Setup", level: 1 })
    ).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_SEMINAR.title)).toBeVisible();
    await expect(
      page.getByText(
        "This seminar is unpublished. It will not be visible to students."
      )
    ).toBeVisible();
  });
});
