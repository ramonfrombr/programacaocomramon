"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import { FaqSection } from "./faq-section";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";

type ClosingSectionProps = {
    closing: ISalesFunnelClosing;
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
            <h3 className="font-semibold text-lg md:text-xl mb-2">{tier.name}</h3>

            {tier.tagline ? (
                <MultiLineText
                    text={tier.tagline}
                    className="text-sm text-gray-600 mb-3"
                />
            ) : null}

            <div className="text-2xl md:text-3xl font-bold mb-4">{tier.price}</div>

            {tier.includesHeading ? (
                <h4 className="font-semibold text-sm mb-2">{tier.includesHeading}</h4>
            ) : null}

            <ul className="text-left list-disc pl-5 mb-5 text-sm space-y-1 flex-1">
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

type TestimonialCardProps = {
    testimonial: ISalesFunnelTestimonial;
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    const body = testimonial.quote ?? testimonial.outcome;

    return (
        <article className="flex flex-col rounded-md border p-5 shadow-sm bg-white h-full">
            <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} fill="orange" color="orange" size={18} />
                ))}
            </div>

            {body ? (
                <p className="text-sm md:text-base text-gray-700 flex-1">{body}</p>
            ) : null}

            <div className="mt-4 pt-4 border-t">
                <p className="font-semibold">{testimonial.name}</p>
                {testimonial.role ? (
                    <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
                ) : null}
            </div>
        </article>
    );
}

export function ClosingSection({ closing }: ClosingSectionProps) {
    const { signUp, footer } = useLanguageStore();

    return (
        <section id="closing" aria-label="closing">
            <div className="mb-12 md:mb-16">
                <SectionHeading title={closing.ebooks.heading} />

                <div className="max-w-3xl mx-auto space-y-3 mb-6">
                    {closing.ebooks.intro.map((paragraph) => (
                        <MultiLineText
                            key={paragraph.slice(0, 32)}
                            text={paragraph}
                            className="text-gray-700"
                        />
                    ))}
                </div>

                <h3 className="font-semibold text-lg mb-3 text-center">
                    {closing.ebooks.includesHeading}
                </h3>

                <ul className="list-disc pl-5 max-w-xl mx-auto space-y-1">
                    {closing.ebooks.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-12 md:mb-16">
                <SectionHeading title={closing.instructor.heading} />

                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-1">
                        {closing.instructor.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{closing.instructor.alias}</p>
                    <p className="text-gray-700 mb-4">{closing.instructor.intro}</p>

                    <div className="space-y-3 text-left">
                        {closing.instructor.bio.map((paragraph) => (
                            <MultiLineText
                                key={paragraph.slice(0, 32)}
                                text={paragraph}
                                className="text-gray-700"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-12 md:mb-16">
                <SectionHeading
                    title={closing.results.heading}
                    subtitle={closing.results.subheading}
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {closing.results.testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={`${testimonial.name}-${testimonial.role ?? ""}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>

            <div id="pricing" className="mb-12 md:mb-16 scroll-mt-8">
                <div className="grid md:grid-cols-2 gap-5 md:gap-8">
                    <PricingTierCard tier={closing.pricing.platinum} />
                    <PricingTierCard tier={closing.pricing.diamond} highlighted />
                </div>
            </div>

            <div className="mb-12 md:mb-16">
                <FaqSection
                    faqs={closing.faq}
                    heading={footer.faqs.title}
                    id="faq"
                />
            </div>

            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">
                    {closing.finalCta.heading}
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
