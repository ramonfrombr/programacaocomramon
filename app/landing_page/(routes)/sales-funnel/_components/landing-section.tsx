"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { HeroVideo } from "./hero-video";
import { MultiLineText } from "./multi-line-text";
import { TierCard } from "./tier-card";

type LandingSectionProps = {
    landing: ISalesFunnelLanding;
};

type ValuePropBlockProps = {
    section: ISalesFunnelLandingSection;
};

function ValuePropBlock({ section }: ValuePropBlockProps) {
    return (
        <article className="rounded-md border p-5 shadow-sm bg-white">
            <h3 className="text-lg md:text-xl font-semibold mb-3">
                {section.heading}
            </h3>

            {section.body ? (
                <MultiLineText
                    text={section.body}
                    className="text-gray-700 text-sm md:text-base"
                />
            ) : null}

            {section.bullets?.length ? (
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm md:text-base">
                    {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            ) : null}
        </article>
    );
}

export function LandingSection({ landing }: LandingSectionProps) {
    const { signUp } = useLanguageStore();
    const valuePropSections = Object.values(landing.sections);

    return (
        <section id="landing" aria-labelledby="landing-heading">
            <div className="text-center md:text-left md:grid md:grid-cols-2 gap-8 md:gap-10 items-start mb-10 md:mb-14">
                <div>
                    <p className="text-sm md:text-base text-gray-600 mb-2">
                        {landing.presenter}
                    </p>

                    <h1
                        id="landing-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
                    >
                        {landing.headline}
                    </h1>

                    <MultiLineText
                        text={landing.tagline}
                        className="text-gray-600 text-base md:text-lg mb-5"
                    />

                    <ul className="text-left space-y-2 text-sm md:text-base mb-6">
                        {landing.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>

                    <Link href="/sign-up">
                        <Button className="w-full sm:w-auto rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                            {signUp}
                        </Button>
                    </Link>
                </div>

                <HeroVideo videoUrl={landing.heroYoutubeVideoURL} />
            </div>

            <h2
                id="tech-stack-heading"
                className="text-xl md:text-2xl font-bold text-center mb-8"
            >
                {landing.techStackHeading}
            </h2>

            <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-12 md:mb-16">
                <TierCard tier={landing.tiers.platinum} />
                <TierCard tier={landing.tiers.diamond} highlighted />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 md:mb-16">
                {valuePropSections.map((section) => (
                    <ValuePropBlock key={section.heading} section={section} />
                ))}
            </div>

            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">
                    {landing.ctaHeading}
                </h2>

                <Link href="/sign-up">
                    <Button className="rounded-full px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                        {signUp}
                    </Button>
                </Link>
            </div>
        </section>
    );
}
