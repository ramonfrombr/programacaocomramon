"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { FaqSection } from "./faq-section";
import { FinalCtaSection } from "./final-cta-section";
import { InstructorSection } from "./instructor-section";
import { PricingSection } from "./pricing-section";
import { TestimonialsSection } from "./testimonials-section";

type ClosingSectionProps = {
    closing: ISalesFunnelClosing;
};

export function ClosingSection({ closing }: ClosingSectionProps) {
    const { footer } = useLanguageStore();

    return (
        <section id="closing">
            {/* <EbooksSection ebooks={closing.ebooks} /> */}

            <InstructorSection instructor={closing.instructor} />

            <TestimonialsSection results={closing.results} />

            <PricingSection pricing={closing.pricing} />

            <div id="faq" className="mb-12 md:mb-16 scroll-mt-8">
                <FaqSection faqs={closing.faq} heading={footer.faqs.title} />
            </div>

            <FinalCtaSection finalCta={closing.finalCta} />
        </section>
    );
}
