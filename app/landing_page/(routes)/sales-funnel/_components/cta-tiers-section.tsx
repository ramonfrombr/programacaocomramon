"use client";

import { TierCard } from "./tier-card";

type CtaTiersSectionProps = {
    ctaHeading: string;
    tiers: ISalesFunnelLanding["tiers"];
};

export function CtaTiersSection({ ctaHeading, tiers }: CtaTiersSectionProps) {
    return (
        <>
            <div className="text-center mb-12 md:mb-16 mt-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">
                    {ctaHeading}
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-16">
                <TierCard tier={tiers.silver} />
                <TierCard tier={tiers.gold} />
                <TierCard tier={tiers.diamond} highlighted />
            </div>
        </>
    );
}
