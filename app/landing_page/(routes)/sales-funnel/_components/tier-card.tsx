"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { MultiLineText } from "./multi-line-text";

type TierCardProps = {
    tier: ISalesFunnelTier;
    highlighted?: boolean;
};

export function TierCard({ tier, highlighted = false }: TierCardProps) {
    const { signUp } = useLanguageStore();

    return (
        <article
            className={`flex flex-col p-5 rounded-md border shadow-md h-full ${
                highlighted ? "border-blue-600 ring-2 ring-blue-600/20" : ""
            }`}
        >
            <h3 className="font-semibold text-lg md:text-xl mb-2">{tier.name}</h3>

            {tier.tagline ? (
                <MultiLineText
                    text={tier.tagline}
                    className="text-lg text-gray-600 mb-3"
                />
            ) : null}

            <div className="text-2xl md:text-3xl font-bold mb-4">{tier.price}</div>

            <ul className="text-left list-disc pl-5 mb-5 text-lg space-y-1 flex-1">
                {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>

            {tier.newFeaturesHeading && tier.newFeatures?.length ? (
                <div className="mb-4">
                    <h4 className="font-semibold text-lg mb-2">
                        {tier.newFeaturesHeading}
                    </h4>
                    <ul className="text-left list-disc pl-5 text-lg space-y-1">
                        {tier.newFeatures.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {tier.exclusiveAccessHeading && tier.exclusiveAccess?.length ? (
                <div className="mb-5">
                    <h4 className="font-semibold text-lg mb-2">
                        {tier.exclusiveAccessHeading}
                    </h4>
                    <ul className="text-left list-disc pl-5 text-lg space-y-1">
                        {tier.exclusiveAccess.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <Link href="/sign-up">
                <Button className="w-full rounded-full p-8 text-2xl bg-blue-600 hover:bg-blue-700">
                    {signUp}
                </Button>
            </Link>
        </article>
    );
}
