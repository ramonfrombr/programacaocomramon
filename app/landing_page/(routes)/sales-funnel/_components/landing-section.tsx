"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { HeroVideo } from "./hero-video";
import { MultiLineText } from "./multi-line-text";
import { CtaTiersSection } from "./cta-tiers-section";
import { TechStackSection } from "./tech-stack-section";
import Image from "next/image";

type LandingSectionProps = {
    landing: ISalesFunnelLanding;
};

type ValuePropBlockProps = {
    section: ISalesFunnelLandingSection;
};

function ValuePropBlock({ section }: ValuePropBlockProps) {
    return (
        <article className="flex flex-col h-full rounded-lg border bg-white p-6 md:p-8 shadow-md transition-shadow hover:shadow-lg">
            <div className="flex justify-center mb-5">
                <Image
                    src={section.image}
                    alt={section.heading}
                    width={200}
                    height={200}
                    className="w-36 h-36 md:w-44 md:h-44 object-contain"
                />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-center">
                {section.heading}
            </h3>

            {section.body ? (
                <MultiLineText
                    text={section.body}
                    className="text-gray-700 text-base md:text-lg"
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
                    <p className="text-sm md:text-xl text-gray-600 mb-2">
                        {landing.presenter}
                    </p>

                    <h1
                        id="landing-heading"
                        className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3"
                    >
                        {landing.headline}
                    </h1>

                    <MultiLineText
                        text={landing.tagline}
                        className="text-gray-600 text-base md:text-2xl mb-5"
                    />

                    <ul className="text-left space-y-2 text-sm md:text-lg mb-6">
                        {landing.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>

                    <Link href="/sign-up">
                        <Button className="w-full sm:w-auto rounded-full px-10 py-8 sm:px-16 sm:py-12 text-2xl sm:text-3xl bg-blue-600 hover:bg-blue-700 mb-5">
                            {signUp}
                        </Button>
                    </Link>
                </div>

                <HeroVideo videoUrl={landing.heroYoutubeVideoURL} />
            </div>


            <TechStackSection techStackHeading={landing.techStackHeading} />

            <CtaTiersSection
                ctaHeading={landing.ctaHeading}
                tiers={landing.tiers}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 md:mb-16">
                {valuePropSections.map((section) => (
                    <ValuePropBlock key={section.heading} section={section} />
                ))}
            </div>
        </section>
    );
}
