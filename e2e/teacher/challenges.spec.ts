import { expect, test } from "../fixtures";
import {
  E2E_DRAFT_CHALLENGE,
  E2E_PUBLISHED_CHALLENGE,
  teacherChallengeSetupPath,
} from "../constants";

test.describe("teacher challenges", () => {
  test("challenges page lists seeded challenges", async ({ page }) => {
    await page.goto("/teacher/challenges");

    await expect(page).toHaveURL(/\/teacher\/challenges/);
    await expect(page.getByText(E2E_PUBLISHED_CHALLENGE.title)).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_CHALLENGE.title)).toBeVisible();
  });

  test("create form renders", async ({ page }) => {
    await page.goto("/teacher/challenges/create");

    await expect(page).toHaveURL(/\/teacher\/challenges\/create/);
    await expect(
      page.getByRole("heading", { name: "Name Your Challenge", level: 1 })
    ).toBeVisible();
    await expect(page.getByLabel("Challenge Title")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });

  test("draft setup form renders", async ({ page }) => {
    await page.goto(teacherChallengeSetupPath(E2E_DRAFT_CHALLENGE.id));

    await expect(page).toHaveURL(
      new RegExp(`/teacher/challenges/${E2E_DRAFT_CHALLENGE.id}`)
    );
    await expect(
      page.getByRole("heading", { name: "Challenge Setup", level: 1 })
    ).toBeVisible();
    await expect(page.getByText(E2E_DRAFT_CHALLENGE.title)).toBeVisible();
    await expect(
      page.getByText(
        "This challenge is unpublished. It will not be visible to students."
      )
    ).toBeVisible();
  });
});
