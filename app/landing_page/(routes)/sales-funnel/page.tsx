"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { LandingSection } from "./_components/landing-section";
import { CurriculumSection } from "./_components/curriculum-section";
import { MastermindSection } from "./_components/mastermind-section";
import { CommunitySection } from "./_components/community-section";
import { ClosingSection } from "./_components/closing-section";

export default function SalesFunnelPage() {
    const { landing, curriculum, mastermind, community, closing } =
        useLanguageStore().salesFunnel;

    return (
        <div className="p-2 md:px-10 lg:px-14 pb-16 space-y-16 md:space-y-24">
            <LandingSection landing={landing} />
            <CurriculumSection curriculum={curriculum} />
            <MastermindSection mastermind={mastermind} />
            <CommunitySection community={community} />
            <ClosingSection closing={closing} />
        </div>
    );
}
