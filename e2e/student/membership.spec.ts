import { expect, test } from "../fixtures";
import {
  E2E_CHAPTER_IDS,
  E2E_MEMBERSHIP_ACCESS_CHAPTER,
  E2E_MEMBERSHIP_ACCESS_COURSE,
  E2E_MEMBERSHIP_TIERS,
  E2E_PUBLISHED_CHALLENGE,
  E2E_PUBLISHED_INTERVIEW,
  E2E_PUBLISHED_MENTORSHIP,
  E2E_PUBLISHED_SEMINAR,
  watchChapterPath,
} from "../constants";
import {
  clearMembershipSubscription,
  createMembershipDb,
  readClerkUserId,
  simulateMembershipCancelAtPeriodEnd,
  simulateMembershipCheckoutCompleted,
  simulateMembershipPaymentFailed,
  simulateMembershipSubscriptionDeleted,
  simulateMembershipUpgrade,
} from "../helpers/membership";

test.describe.configure({ mode: "serial" });

test.describe("student membership", () => {
  let userId: string;
  const db = createMembershipDb();

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/student.json",
    });
    const page = await context.newPage();
    userId = await readClerkUserId(page);
    await clearMembershipSubscription(db, userId);
    await context.close();
  });

  test.afterAll(async () => {
    if (userId) {
      await clearMembershipSubscription(db, userId);
    }

    await db.$disconnect();
  });

  test("non-member sees three tier cards with subscribe CTAs", async ({
    page,
  }) => {
    await clearMembershipSubscription(db, userId);

    await page.goto("/membership");

    await expect(page).toHaveURL(/\/membership/);
    await expect(
      page.getByRole("heading", { name: "Membership", level: 1 })
    ).toBeVisible();

    for (const tier of E2E_MEMBERSHIP_TIERS) {
      await expect(page.getByRole("heading", { name: tier.englishName })).toBeVisible();
    }

    await expect(
      page.getByRole("button", { name: /Subscribe - Silver Member/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Subscribe - Gold Member/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Subscribe - Diamond Member/i })
    ).toBeVisible();
  });

  test("checkout webhook activates membership and shows member panel", async ({
    page,
  }) => {
    await simulateMembershipCheckoutCompleted(userId, "SILVER");

    await page.goto("/membership");

    await expect(page.getByRole("heading", { name: "Silver Member", level: 2 })).toBeVisible();
    await expect(page.getByText("Active")).toBeVisible();
    await expect(page.getByText("Renews on")).toBeVisible();
    await expect(page.getByText("Your current plan")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Upgrade - Diamond Member/i })
    ).toBeVisible();
  });

  test("active member can access a paid chapter without a course purchase", async ({
    page,
  }) => {
    await page.goto(
      watchChapterPath(
        E2E_MEMBERSHIP_ACCESS_COURSE.id,
        E2E_CHAPTER_IDS.membershipPaid
      )
    );

    await expect(page.getByText("This chapter is locked")).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: E2E_MEMBERSHIP_ACCESS_CHAPTER.title,
        level: 2,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mark as completed" })
    ).toBeVisible();
  });

  test.describe("premium content gating (seminars and mentorships)", () => {
    test("non-member visiting /seminars is redirected to membership", async ({
      page,
    }) => {
      await clearMembershipSubscription(db, userId);

      await page.goto("/seminars");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("non-member visiting /mentorships is redirected to membership", async ({
      page,
    }) => {
      await clearMembershipSubscription(db, userId);

      await page.goto("/mentorships");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Silver member visiting /seminars is redirected to membership", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "SILVER");

      await page.goto("/seminars");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Silver member visiting /mentorships is redirected to membership", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "SILVER");

      await page.goto("/mentorships");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Gold member can access seminars and mentorships catalogs", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "GOLD");

      await page.goto("/membership");
      await expect(
        page.getByRole("heading", { name: "Gold Member", level: 2 })
      ).toBeVisible();

      await page.goto("/seminars");

      await expect(page).toHaveURL(/\/seminars/);
      await expect(
        page.getByRole("link", { name: E2E_PUBLISHED_SEMINAR.title })
      ).toBeVisible();

      await page.goto("/mentorships");

      await expect(page).toHaveURL(/\/mentorships/);
      await expect(
        page.getByRole("link", { name: E2E_PUBLISHED_MENTORSHIP.title })
      ).toBeVisible();
    });
  });

  test.describe("diamond content gating (challenges and interviews)", () => {
    test("non-member visiting /challenges is redirected to membership", async ({
      page,
    }) => {
      await clearMembershipSubscription(db, userId);

      await page.goto("/challenges");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("non-member visiting /interviews is redirected to membership", async ({
      page,
    }) => {
      await clearMembershipSubscription(db, userId);

      await page.goto("/interviews");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Silver member visiting /challenges is redirected to membership", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "SILVER");

      await page.goto("/challenges");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Gold member visiting /challenges is redirected to membership", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "GOLD");

      await page.goto("/challenges");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Gold member visiting /interviews is redirected to membership", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "GOLD");

      await page.goto("/interviews");

      await expect(page).toHaveURL(/\/membership/);
    });

    test("Diamond member can access challenges and interviews catalogs", async ({
      page,
    }) => {
      await simulateMembershipCheckoutCompleted(userId, "DIAMOND");

      await page.goto("/membership");
      await expect(
        page.getByRole("heading", { name: "Diamond Member", level: 2 })
      ).toBeVisible();

      await page.goto("/challenges");

      await expect(page).toHaveURL(/\/challenges/);
      await expect(
        page.getByRole("link", { name: E2E_PUBLISHED_CHALLENGE.title })
      ).toBeVisible();

      await page.goto("/interviews");

      await expect(page).toHaveURL(/\/interviews/);
      await expect(
        page.getByRole("link", { name: E2E_PUBLISHED_INTERVIEW.title })
      ).toBeVisible();
    });
  });

  test("subscription upgrade webhook updates the highlighted tier", async ({
    page,
  }) => {
    await simulateMembershipUpgrade("GOLD");

    await page.goto("/membership");

    await expect(page.getByRole("heading", { name: "Gold Member", level: 2 })).toBeVisible();
    await expect(page.getByText("Your current plan")).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: /Upgrade - Diamond Member/i })
    ).toBeVisible();
  });

  test("payment failure webhook revokes paid chapter access immediately", async ({
    page,
  }) => {
    await simulateMembershipPaymentFailed();

    await page.goto(
      watchChapterPath(
        E2E_MEMBERSHIP_ACCESS_COURSE.id,
        E2E_CHAPTER_IDS.membershipPaid
      )
    );

    await expect(page.getByText("This chapter is locked")).toBeVisible();
  });

  test("cancel at period end keeps access until subscription deleted webhook", async ({
    page,
  }) => {
    await simulateMembershipCheckoutCompleted(userId, "SILVER");
    await simulateMembershipCancelAtPeriodEnd(db);

    await page.goto("/membership");
    await expect(
      page.getByText(
        "Your subscription will cancel at the end of the current period."
      )
    ).toBeVisible();

    await page.goto(
      watchChapterPath(
        E2E_MEMBERSHIP_ACCESS_COURSE.id,
        E2E_CHAPTER_IDS.membershipPaid
      )
    );
    await expect(page.getByText("This chapter is locked")).toHaveCount(0);

    await simulateMembershipSubscriptionDeleted();

    await page.goto(
      watchChapterPath(
        E2E_MEMBERSHIP_ACCESS_COURSE.id,
        E2E_CHAPTER_IDS.membershipPaid
      )
    );
    await expect(page.getByText("This chapter is locked")).toBeVisible();
  });
});
