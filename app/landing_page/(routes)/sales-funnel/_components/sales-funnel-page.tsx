"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { LandingSection } from "./landing-section";
import { CurriculumSection } from "./curriculum-section";
import { MastermindSection } from "./mastermind-section";
import { CommunitySection } from "./community-section";
import { ClosingSection } from "./closing-section";

export function SalesFunnelPage() {
    const { landing, curriculum, mastermind, community, closing } =
        useLanguageStore().salesFunnel;

    return (
        <main
            id="main-content"
            className="px-5 md:px-10 lg:px-20 py-4 pb-16 space-y-16 md:space-y-24"
        >
            <LandingSection landing={landing} />
            <CurriculumSection curriculum={curriculum} />
            {/*<MastermindSection mastermind={mastermind} />*/}
            {/*<CommunitySection community={community} />*/}

            <ClosingSection closing={closing} />
        </main>
    );
}
