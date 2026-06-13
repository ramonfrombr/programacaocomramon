import { SectionHeading } from "./section-heading";

type ClosingSectionProps = {
    closing: ISalesFunnelClosing;
};

export function ClosingSection({ closing }: ClosingSectionProps) {
    return (
        <section id="closing" aria-label="closing">
            <SectionHeading title={closing.finalCta.heading} />
        </section>
    );
}
