import { MembershipSubscriptionStatus, MembershipTierSlug } from "@prisma/client";
import Stripe from "stripe";

import { db } from "@/lib/db";

import { mapStripeSubscriptionStatus } from "./map-subscription-status";

function getStripeCustomerId(
  customer: Stripe.Subscription["customer"]
): string | null {
  if (typeof customer === "string") {
    return customer;
  }

  return customer?.id ?? null;
}

function getStripePriceId(subscription: Stripe.Subscription): string | null {
  return subscription.items.data[0]?.price?.id ?? null;
}

async function resolveUserId(
  subscription: Stripe.Subscription,
  stripeCustomerId: string
): Promise<string | null> {
  const existing = await db.membershipSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    select: { userId: true },
  });

  if (existing) {
    return existing.userId;
  }

  const stripeCustomer = await db.stripeCustomer.findUnique({
    where: { stripeCustomerId },
    select: { userId: true },
  });

  return stripeCustomer?.userId ?? null;
}

export async function syncMembershipSubscriptionFromStripe(
  subscription: Stripe.Subscription
): Promise<{ synced: boolean; reason?: string }> {
  const stripeCustomerId = getStripeCustomerId(subscription.customer);
  const priceId = getStripePriceId(subscription);

  if (!stripeCustomerId) {
    return { synced: false, reason: "missing_customer" };
  }

  if (!priceId) {
    return { synced: false, reason: "missing_price" };
  }

  const tier = await db.membershipTier.findFirst({
    where: { stripePriceId: priceId },
  });

  if (!tier) {
    return { synced: false, reason: "tier_not_found" };
  }

  const userId = await resolveUserId(subscription, stripeCustomerId);

  if (!userId) {
    return { synced: false, reason: "user_not_found" };
  }

  const data = {
    tierId: tier.id,
    stripeCustomerId,
    status: mapStripeSubscriptionStatus(subscription.status),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  };

  await db.membershipSubscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeSubscriptionId: subscription.id,
      ...data,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      ...data,
    },
  });

  return { synced: true };
}

export async function upsertMembershipFromCheckoutSession(
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription
): Promise<{ synced: boolean; reason?: string }> {
  const userId = session.metadata?.userId;
  const tierSlug = session.metadata?.tierSlug;

  if (!userId || !tierSlug) {
    return { synced: false, reason: "missing_metadata" };
  }

  const stripeCustomerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  if (!stripeCustomerId) {
    return { synced: false, reason: "missing_customer" };
  }

  const tier = await db.membershipTier.findUnique({
    where: { slug: tierSlug as MembershipTierSlug },
  });

  if (!tier) {
    return { synced: false, reason: "tier_not_found" };
  }

  await db.membershipSubscription.upsert({
    where: { userId },
    create: {
      userId,
      tierId: tier.id,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId,
      status: MembershipSubscriptionStatus.ACTIVE,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      tierId: tier.id,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId,
      status: mapStripeSubscriptionStatus(subscription.status),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  return { synced: true };
}
