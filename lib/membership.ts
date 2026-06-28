import {
  MembershipSubscription,
  MembershipSubscriptionStatus,
  MembershipTier,
  MembershipTierSlug,
} from "@prisma/client";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export type ActiveMembership = MembershipSubscription & {
  tier: MembershipTier;
};

const PREMIUM_CONTENT_TIERS = new Set<MembershipTierSlug>(["GOLD", "DIAMOND"]);

export async function hasGoldOrDiamondAccess(userId: string): Promise<boolean> {
  if (isTeacher(userId)) {
    return true;
  }

  const membership = await getActiveMembership(userId);
  return membership !== null && PREMIUM_CONTENT_TIERS.has(membership.tier.slug);
}

export async function getActiveMembership(
  userId: string
): Promise<ActiveMembership | null> {
  const subscription = await db.membershipSubscription.findUnique({
    where: { userId },
    include: { tier: true },
  });

  if (!subscription) {
    return null;
  }

  if (subscription.status !== MembershipSubscriptionStatus.ACTIVE) {
    return null;
  }

  if (
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd <= new Date()
  ) {
    return null;
  }

  return subscription;
}

export async function hasCourseAccess({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}): Promise<boolean> {
  if (isTeacher(userId)) {
    return true;
  }

  const [purchase, membership] = await Promise.all([
    db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    }),
    getActiveMembership(userId),
  ]);

  return purchase !== null || membership !== null;
}
