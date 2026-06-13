import { SectionHeading } from "./section-heading";

type CommunitySectionProps = {
    community: ISalesFunnelCommunity;
};

export function CommunitySection({ community }: CommunitySectionProps) {
    return (
        <section id="community" aria-label="community">
            <SectionHeading title={community.studentArea.heading} />
        </section>
    );
}
