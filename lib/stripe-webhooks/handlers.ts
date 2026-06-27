import { MembershipSubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

import {
  syncMembershipSubscriptionFromStripe,
  upsertMembershipFromCheckoutSession,
} from "./sync-membership-subscription";

function getSubscriptionId(
  subscription: Stripe.Checkout.Session["subscription"]
): string | null {
  if (typeof subscription === "string") {
    return subscription;
  }

  return subscription?.id ?? null;
}

function getInvoiceSubscriptionId(
  subscription: Stripe.Invoice["subscription"]
): string | null {
  if (typeof subscription === "string") {
    return subscription;
  }

  return subscription?.id ?? null;
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  if (session.metadata?.type === "membership") {
    const subscriptionId = getSubscriptionId(session.subscription);

    if (!subscriptionId) {
      return new NextResponse("Webhook Error: Missing subscription", {
        status: 400,
      });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const result = await upsertMembershipFromCheckoutSession(
      session,
      subscription
    );

    if (!result.synced) {
      console.error("[WEBHOOK_MEMBERSHIP_CHECKOUT]", result.reason);
      return new NextResponse(
        `Webhook Error: Membership checkout sync failed (${result.reason})`,
        { status: 400 }
      );
    }

    return new NextResponse(null, { status: 200 });
  }

  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;

  if (!userId || !courseId) {
    return new NextResponse("Webhook Error: Missing metadata", { status: 400 });
  }

  await db.purchase.create({
    data: {
      courseId,
      userId,
      price: (session.amount_total || 0) / 100,
    },
  });

  return new NextResponse(null, { status: 200 });
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const result = await syncMembershipSubscriptionFromStripe(subscription);

  if (!result.synced) {
    console.error("[WEBHOOK_SUBSCRIPTION_UPDATED]", result.reason, {
      subscriptionId: subscription.id,
    });
  }

  return new NextResponse(null, { status: 200 });
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const existing = await db.membershipSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!existing) {
    return new NextResponse(null, { status: 200 });
  }

  await db.membershipSubscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: MembershipSubscriptionStatus.CANCELED,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  return new NextResponse(null, { status: 200 });
}

export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = getInvoiceSubscriptionId(invoice.subscription);

  if (!subscriptionId) {
    return new NextResponse(null, { status: 200 });
  }

  const existing = await db.membershipSubscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!existing) {
    return new NextResponse(null, { status: 200 });
  }

  await db.membershipSubscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: MembershipSubscriptionStatus.PAST_DUE,
    },
  });

  return new NextResponse(null, { status: 200 });
}
