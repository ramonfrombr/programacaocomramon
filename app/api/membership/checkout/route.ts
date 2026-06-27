import { currentUser } from "@clerk/nextjs/server";
import {
  MembershipSubscriptionStatus,
  MembershipTierSlug,
} from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getOrCreateStripeCustomer } from "@/lib/stripe-customer";
import { stripe } from "@/lib/stripe";

const TIER_SLUGS = new Set<string>(Object.values(MembershipTierSlug));

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user?.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const tierSlug = body?.tierSlug;

    if (!tierSlug || !TIER_SLUGS.has(tierSlug)) {
      return new NextResponse("Invalid tier", { status: 400 });
    }

    const tier = await db.membershipTier.findUnique({
      where: { slug: tierSlug as MembershipTierSlug },
    });

    if (!tier || !tier.isActive) {
      return new NextResponse("Tier not available", { status: 404 });
    }

    if (!tier.stripePriceId) {
      return new NextResponse("Tier not configured for checkout", {
        status: 400,
      });
    }

    const existingSubscription = await db.membershipSubscription.findUnique({
      where: { userId: user.id },
      include: { tier: true },
    });

    if (
      existingSubscription?.status === MembershipSubscriptionStatus.ACTIVE &&
      (!existingSubscription.currentPeriodEnd ||
        existingSubscription.currentPeriodEnd > new Date())
    ) {
      if (existingSubscription.tierId === tier.id) {
        return new NextResponse("Already subscribed to this tier", {
          status: 400,
        });
      }

      if (tier.position < existingSubscription.tier.position) {
        return new NextResponse("Downgrades are not allowed", { status: 400 });
      }

      const stripeSubscription = await stripe.subscriptions.retrieve(
        existingSubscription.stripeSubscriptionId
      );
      const subscriptionItemId = stripeSubscription.items.data[0]?.id;

      if (!subscriptionItemId) {
        return new NextResponse("Subscription item not found", { status: 500 });
      }

      const updatedSubscription = await stripe.subscriptions.update(
        existingSubscription.stripeSubscriptionId,
        {
          items: [{ id: subscriptionItemId, price: tier.stripePriceId }],
          proration_behavior: "create_prorations",
        }
      );

      await db.membershipSubscription.update({
        where: { userId: user.id },
        data: {
          tierId: tier.id,
          currentPeriodEnd: new Date(
            updatedSubscription.current_period_end * 1000
          ),
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
          status: MembershipSubscriptionStatus.ACTIVE,
        },
      });

      return NextResponse.json({ upgraded: true });
    }

    const stripeCustomerId = await getOrCreateStripeCustomer(
      user.id,
      user.emailAddresses[0].emailAddress
    );

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [{ price: tier.stripePriceId, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership?canceled=1`,
      metadata: {
        userId: user.id,
        tierSlug: tier.slug,
        type: "membership",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[MEMBERSHIP_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
