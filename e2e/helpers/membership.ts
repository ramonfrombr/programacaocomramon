import {
  MembershipSubscriptionStatus,
  MembershipTierSlug,
  PrismaClient,
} from "@prisma/client";
import type { Page } from "@playwright/test";
import type Stripe from "stripe";

import {
  handleInvoicePaymentFailed,
  handleSubscriptionDeleted,
} from "@/lib/stripe-webhooks/handlers";
import {
  syncMembershipSubscriptionFromStripe,
  upsertMembershipFromCheckoutSession,
} from "@/lib/stripe-webhooks/sync-membership-subscription";

import {
  E2E_MEMBERSHIP_STRIPE_CUSTOMER_ID,
  E2E_MEMBERSHIP_STRIPE_PRICE_IDS,
  E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID,
  E2E_MEMBERSHIP_TIERS,
} from "../constants";

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

function futurePeriodEndSeconds(from = Date.now()) {
  return Math.floor(from / 1000) + THIRTY_DAYS_SECONDS;
}

export function createMembershipDb() {
  return new PrismaClient();
}

export async function readClerkUserId(page: Page): Promise<string> {
  await page.goto("/dashboard");
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 });

  await page.waitForFunction(
    () => typeof window.Clerk !== "undefined" && !!window.Clerk?.user?.id,
    { timeout: 30_000 }
  );

  const userId = await page.evaluate(() => window.Clerk?.user?.id ?? null);

  if (!userId) {
    throw new Error(
      "Failed to read Clerk userId — ensure the student auth storage state is valid."
    );
  }

  return userId;
}

export async function clearMembershipSubscription(
  db: PrismaClient,
  userId: string
) {
  await db.membershipSubscription.deleteMany({ where: { userId } });
}

export async function simulateMembershipCheckoutCompleted(
  userId: string,
  tierSlug: MembershipTierSlug
) {
  const tier = E2E_MEMBERSHIP_TIERS.find((record) => record.slug === tierSlug);

  if (!tier) {
    throw new Error(`Unknown membership tier slug: ${tierSlug}`);
  }

  const periodEnd = futurePeriodEndSeconds();

  await upsertMembershipFromCheckoutSession(
    {
      metadata: {
        userId,
        tierSlug,
        type: "membership",
      },
      customer: E2E_MEMBERSHIP_STRIPE_CUSTOMER_ID,
    } as unknown as Stripe.Checkout.Session,
    {
      id: E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID,
      current_period_end: periodEnd,
      cancel_at_period_end: false,
      status: "active",
    } as unknown as Stripe.Subscription
  );

  return { periodEnd: new Date(periodEnd * 1000) };
}

export async function simulateMembershipUpgrade(
  tierSlug: Extract<MembershipTierSlug, "GOLD" | "DIAMOND">
) {
  const priceId = E2E_MEMBERSHIP_STRIPE_PRICE_IDS[tierSlug.toLowerCase() as "gold" | "diamond"];
  const periodEnd = futurePeriodEndSeconds();

  const result = await syncMembershipSubscriptionFromStripe({
    id: E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID,
    customer: E2E_MEMBERSHIP_STRIPE_CUSTOMER_ID,
    current_period_end: periodEnd,
    cancel_at_period_end: false,
    status: "active",
    items: {
      data: [{ price: { id: priceId } }],
    },
  } as unknown as Stripe.Subscription);

  if (!result.synced) {
    throw new Error(`Membership upgrade sync failed: ${result.reason}`);
  }

  return { periodEnd: new Date(periodEnd * 1000) };
}

export async function simulateMembershipCancelAtPeriodEnd(db: PrismaClient) {
  const periodEnd = futurePeriodEndSeconds();

  await db.membershipSubscription.update({
    where: { stripeSubscriptionId: E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID },
    data: {
      status: MembershipSubscriptionStatus.ACTIVE,
      cancelAtPeriodEnd: true,
      currentPeriodEnd: new Date(periodEnd * 1000),
    },
  });

  return { periodEnd: new Date(periodEnd * 1000) };
}

export async function simulateMembershipPaymentFailed() {
  await handleInvoicePaymentFailed({
    subscription: E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID,
  } as unknown as Stripe.Invoice);
}

export async function simulateMembershipSubscriptionDeleted() {
  const periodEnd = futurePeriodEndSeconds(Date.now() - 1000);

  await handleSubscriptionDeleted({
    id: E2E_MEMBERSHIP_STRIPE_SUBSCRIPTION_ID,
    current_period_end: periodEnd,
    cancel_at_period_end: true,
  } as unknown as Stripe.Subscription);
}
