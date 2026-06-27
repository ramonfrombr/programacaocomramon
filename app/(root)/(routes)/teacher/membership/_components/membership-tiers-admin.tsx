import { getTeacherMembershipTiers } from "@/actions/get-teacher-membership-tiers";
import {
  MembershipTierEditor,
  TeacherMembershipTierData,
} from "@/app/(root)/(routes)/teacher/membership/_components/membership-tier-editor";
import {
  MEMBERSHIP_LOCALES,
  MembershipLocale,
} from "@/lib/membership-locales";

function mapTier(tier: Awaited<ReturnType<typeof getTeacherMembershipTiers>>[number]): TeacherMembershipTierData {
  const translations = MEMBERSHIP_LOCALES.map((locale) => {
    const existing = tier.translations.find((item) => item.locale === locale);

    return {
      locale,
      name: existing?.name ?? "",
      tagline: existing?.tagline ?? null,
      features: existing?.features ?? [],
      newFeaturesHeading: existing?.newFeaturesHeading ?? null,
      newFeatures: existing?.newFeatures ?? [],
      exclusiveAccessHeading: existing?.exclusiveAccessHeading ?? null,
      exclusiveAccess: existing?.exclusiveAccess ?? [],
    };
  });

  return {
    id: tier.id,
    slug: tier.slug,
    position: tier.position,
    monthlyPriceBrl: tier.monthlyPriceBrl,
    isActive: tier.isActive,
    stripeProductId: tier.stripeProductId,
    stripePriceId: tier.stripePriceId,
    translations: translations as Array<{
      locale: MembershipLocale;
      name: string;
      tagline: string | null;
      features: string[];
      newFeaturesHeading: string | null;
      newFeatures: string[];
      exclusiveAccessHeading: string | null;
      exclusiveAccess: string[];
    }>,
  };
}

export async function MembershipTiersAdmin() {
  const tiers = await getTeacherMembershipTiers();

  return (
    <div className="space-y-6">
      {tiers.map((tier) => (
        <MembershipTierEditor key={tier.id} tier={mapTier(tier)} />
      ))}
    </div>
  );
}
