"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  MembershipSubscriptionPanelData,
  MembershipTierCardData,
} from "@/actions/get-membership-page-data";
import { useLanguageStore } from "@/hooks/use-language-store";

import { MembershipSubscriptionPanel } from "./membership-subscription-panel";
import { MembershipTierCard } from "./membership-tier-card";

type MembershipPageContentProps = {
  tiers: MembershipTierCardData[];
  subscriptionPanel: MembershipSubscriptionPanelData | null;
  currentTierId: string | null;
  currentTierPosition: number | null;
};

export function MembershipPageContent({
  tiers,
  subscriptionPanel,
  currentTierId,
  currentTierPosition,
}: MembershipPageContentProps) {
  const { membership } = useLanguageStore();
  const searchParams = useSearchParams();
  const isMember = subscriptionPanel !== null;

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      toast.success(membership.checkoutSuccess);
    }

    if (searchParams.get("canceled") === "1") {
      toast.error(membership.checkoutCanceled);
    }
  }, [membership.checkoutCanceled, membership.checkoutSuccess, searchParams]);

  function getTierMode(tier: MembershipTierCardData) {
    if (!isMember || currentTierPosition === null) {
      return "subscribe" as const;
    }

    if (tier.id === currentTierId) {
      return "current" as const;
    }

    if (tier.position > currentTierPosition) {
      return "upgrade" as const;
    }

    return "lower" as const;
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{membership.pageTitle}</h1>
      </div>

      {subscriptionPanel ? (
        <MembershipSubscriptionPanel subscription={subscriptionPanel} />
      ) : null}

      {tiers.length === 0 ? (
        <p className="text-muted-foreground">{membership.noTiersAvailable}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {tiers.map((tier) => (
            <MembershipTierCard
              key={tier.id}
              tier={tier}
              highlighted={tier.id === currentTierId}
              mode={getTierMode(tier)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
