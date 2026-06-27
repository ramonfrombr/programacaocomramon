import {
  MembershipSubscription,
  MembershipSubscriptionStatus,
  MembershipTier,
  MembershipTierSlug,
  MembershipTierTranslation,
} from "@prisma/client";

import { db } from "@/lib/db";

export type MembershipTierCardData = {
  id: string;
  slug: MembershipTierSlug;
  position: number;
  monthlyPriceBrl: number;
  name: string;
  tagline: string | null;
  features: string[];
  newFeaturesHeading: string | null;
  newFeatures: string[];
  exclusiveAccessHeading: string | null;
  exclusiveAccess: string[];
};

export type MembershipSubscriptionPanelData = {
  tierName: string;
  status: MembershipSubscriptionStatus;
  renewalDate: string | null;
  cancelAtPeriodEnd: boolean;
};

const locale = process.env.NEXT_PUBLIC_LANGUAGE ?? "english";

function getDateLocale() {
  switch (locale) {
    case "portuguese":
      return "pt-BR";
    case "spanish":
      return "es-ES";
    case "french":
      return "fr-FR";
    default:
      return "en-US";
  }
}

function formatRenewalDate(date: Date) {
  return new Intl.DateTimeFormat(getDateLocale(), {
    dateStyle: "long",
  }).format(date);
}

type SubscriptionWithTier = MembershipSubscription & {
  tier: MembershipTier & {
    translations: MembershipTierTranslation[];
  };
};

function isActiveSubscription(
  subscription: MembershipSubscription
): boolean {
  if (subscription.status !== MembershipSubscriptionStatus.ACTIVE) {
    return false;
  }

  if (
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd <= new Date()
  ) {
    return false;
  }

  return true;
}

function mapTier(
  tier: {
    id: string;
    slug: MembershipTierSlug;
    position: number;
    monthlyPriceBrl: number;
    translations: Array<{
      name: string;
      tagline: string | null;
      features: string[];
      newFeaturesHeading: string | null;
      newFeatures: string[];
      exclusiveAccessHeading: string | null;
      exclusiveAccess: string[];
    }>;
  }
): MembershipTierCardData | null {
  const translation = tier.translations[0];

  if (!translation) {
    return null;
  }

  return {
    id: tier.id,
    slug: tier.slug,
    position: tier.position,
    monthlyPriceBrl: tier.monthlyPriceBrl,
    name: translation.name,
    tagline: translation.tagline,
    features: translation.features,
    newFeaturesHeading: translation.newFeaturesHeading,
    newFeatures: translation.newFeatures,
    exclusiveAccessHeading: translation.exclusiveAccessHeading,
    exclusiveAccess: translation.exclusiveAccess,
  };
}

export async function getMembershipPageData(userId: string) {
  const [tiers, subscription] = await Promise.all([
    db.membershipTier.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
      include: {
        translations: {
          where: { locale },
        },
      },
    }),
    db.membershipSubscription.findUnique({
      where: { userId },
      include: {
        tier: {
          include: {
            translations: {
              where: { locale },
            },
          },
        },
      },
    }),
  ]);

  const tierCards = tiers
    .map(mapTier)
    .filter((tier): tier is MembershipTierCardData => tier !== null);

  const activeMembership: SubscriptionWithTier | null =
    subscription && isActiveSubscription(subscription) ? subscription : null;

  const subscriptionPanel: MembershipSubscriptionPanelData | null =
    activeMembership
      ? {
          tierName:
            activeMembership.tier.translations[0]?.name ??
            activeMembership.tier.slug,
          status: activeMembership.status,
          renewalDate: activeMembership.currentPeriodEnd
            ? formatRenewalDate(activeMembership.currentPeriodEnd)
            : null,
          cancelAtPeriodEnd: activeMembership.cancelAtPeriodEnd,
        }
      : null;

  return {
    tiers: tierCards,
    activeMembership,
    subscriptionPanel,
    currentTierId: activeMembership?.tierId ?? null,
  };
}
