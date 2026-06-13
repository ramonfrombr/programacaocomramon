import { SectionHeading } from "./section-heading";

type CurriculumSectionProps = {
    curriculum: ISalesFunnelCurriculum;
};

export function CurriculumSection({ curriculum }: CurriculumSectionProps) {
    return (
        <section id="curriculum" aria-label="curriculum">
            <SectionHeading
                title={curriculum.heading}
                subtitle={curriculum.subtitle}
            />
        </section>
    );
}
