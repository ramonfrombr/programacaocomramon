"use client";

import { MembershipSubscriptionStatus } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { MembershipSubscriptionPanelData } from "@/actions/get-membership-page-data";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";

type MembershipSubscriptionPanelProps = {
  subscription: MembershipSubscriptionPanelData;
};

function getStatusLabel(
  status: MembershipSubscriptionStatus,
  labels: ILanguageMembership
) {
  switch (status) {
    case MembershipSubscriptionStatus.ACTIVE:
      return labels.statusActive;
    case MembershipSubscriptionStatus.PAST_DUE:
      return labels.statusPastDue;
    case MembershipSubscriptionStatus.CANCELED:
      return labels.statusCanceled;
    case MembershipSubscriptionStatus.INCOMPLETE:
      return labels.statusIncomplete;
    default:
      return status;
  }
}

export function MembershipSubscriptionPanel({
  subscription,
}: MembershipSubscriptionPanelProps) {
  const { membership } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleManageSubscription() {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/membership/portal");
      window.location.assign(response.data.url);
    } catch {
      toast.error(membership.checkoutError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-md border bg-card p-6 shadow-sm space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{subscription.tierName}</h2>
        <p className="text-muted-foreground">
          {getStatusLabel(subscription.status, membership)}
        </p>
      </div>

      {subscription.renewalDate ? (
        <p>
          <span className="font-medium">{membership.renewalLabel}</span>{" "}
          {subscription.renewalDate}
        </p>
      ) : null}

      {subscription.cancelAtPeriodEnd ? (
        <p className="text-amber-700">{membership.cancelAtPeriodEnd}</p>
      ) : null}

      <Button
        type="button"
        onClick={handleManageSubscription}
        disabled={isLoading}
        className="rounded-full"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          membership.manageSubscription
        )}
      </Button>
    </section>
  );
}
