import { SectionHeading } from "./section-heading";

type MastermindSectionProps = {
    mastermind: ISalesFunnelMastermind;
};

export function MastermindSection({ mastermind }: MastermindSectionProps) {
    return (
        <section id="mastermind" aria-label="mastermind">
            <SectionHeading title={mastermind.heading} />
        </section>
    );
}
