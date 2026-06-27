import { MembershipSubscriptionStatus } from "@prisma/client";
import Stripe from "stripe";

export function mapStripeSubscriptionStatus(
  status: Stripe.Subscription.Status
): MembershipSubscriptionStatus {
  switch (status) {
    case "active":
    case "trialing":
      return MembershipSubscriptionStatus.ACTIVE;
    case "past_due":
    case "unpaid":
      return MembershipSubscriptionStatus.PAST_DUE;
    case "incomplete":
      return MembershipSubscriptionStatus.INCOMPLETE;
    case "canceled":
    case "incomplete_expired":
      return MembershipSubscriptionStatus.CANCELED;
    default:
      return MembershipSubscriptionStatus.CANCELED;
  }
}
