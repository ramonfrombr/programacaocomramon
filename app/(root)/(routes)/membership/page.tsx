import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getMembershipPageData } from "@/actions/get-membership-page-data";

import { MembershipPageContent } from "./_components/membership-page-content";

export default async function MembershipPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { tiers, subscriptionPanel, currentTierId, activeMembership } =
    await getMembershipPageData(userId);

  return (
    <Suspense fallback={null}>
      <MembershipPageContent
        tiers={tiers}
        subscriptionPanel={subscriptionPanel}
        currentTierId={currentTierId}
        currentTierPosition={activeMembership?.tier.position ?? null}
      />
    </Suspense>
  );
}
