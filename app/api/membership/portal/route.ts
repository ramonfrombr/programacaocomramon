import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await db.membershipSubscription.findUnique({
      where: { userId: user.id },
      select: { stripeCustomerId: true },
    });

    const stripeCustomerId =
      subscription?.stripeCustomerId ??
      (
        await db.stripeCustomer.findUnique({
          where: { userId: user.id },
          select: { stripeCustomerId: true },
        })
      )?.stripeCustomerId;

    if (!stripeCustomerId) {
      return new NextResponse("No billing account found", { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.log("[MEMBERSHIP_PORTAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
