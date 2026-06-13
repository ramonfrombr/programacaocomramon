import { SectionHeading } from "./section-heading";

type LandingSectionProps = {
    landing: ISalesFunnelLanding;
};

export function LandingSection({ landing }: LandingSectionProps) {
    return (
        <section id="landing" aria-label="landing">
            <SectionHeading title={landing.headline} subtitle={landing.presenter} />
        </section>
    );
}
