"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { MultiLineText } from "./multi-line-text";

type PricingSectionProps = {
    pricing: ISalesFunnelClosing["pricing"];
};

type PricingTierCardProps = {
    tier: ISalesFunnelPricingTier;
    highlighted?: boolean;
};

function PricingTierCard({ tier, highlighted = false }: PricingTierCardProps) {
    const { signUp } = useLanguageStore();

    return (
        <article
            className={`flex flex-col p-5 rounded-md border shadow-md h-full ${
                highlighted ? "border-blue-600 ring-2 ring-blue-600/20" : ""
            }`}
        >
            <h3 className="font-semibold text-xl md:text-2xl mb-2">{tier.name}</h3>

            <div className="text-2xl md:text-3xl font-bold mb-4">{tier.price}</div>

            {tier.tagline ? (
                <MultiLineText
                    text={tier.tagline}
                    className="text-lg text-gray-600 mb-3"
                />
            ) : null}

            {tier.includesHeading ? (
                <h4 className="font-semibold text-lg mb-2">{tier.includesHeading}</h4>
            ) : null}

            <ul className="text-left list-disc pl-5 mb-5 text-lg space-y-1 flex-1">
                {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>

            <Link href="/sign-up">
                <Button className="w-full rounded-full p-6 text-lg bg-blue-600 hover:bg-blue-700">
                    {signUp}
                </Button>
            </Link>
        </article>
    );
}

export function PricingSection({ pricing }: PricingSectionProps) {
    return (
        <div id="pricing" className="mb-12 md:mb-16 scroll-mt-8">
            <div className="grid md:grid-cols-2 gap-5 md:gap-8">
                <PricingTierCard tier={pricing.platinum} />
                <PricingTierCard tier={pricing.diamond} highlighted />
            </div>
        </div>
    );
}
