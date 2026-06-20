import Image from "next/image";
import { useState } from "react";
import { LessonPreviewsSection } from "./lesson-previews-section";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";

type CurriculumSectionProps = {
    curriculum: ISalesFunnelCurriculum;
};

type ModuleCardProps = {
    module: ISalesFunnelModule;
    variant: ISalesFunnelCurriculumGroup;
};

function ModuleCard({ module, variant }: ModuleCardProps) {
    const isCourse = variant === "courses";

    return (
        <article
            className="flex flex-col h-full rounded-lg border bg-white p-6 md:p-8 shadow-md transition-shadow hover:shadow-lg"
            style={{ contentVisibility: "auto" }}
        >
            <div className="flex justify-center mb-5">
                <Image
                    src={module.image}
                    alt={module.title}
                    width={isCourse ? 400 : 200}
                    height={isCourse ? 225 : 200}
                    className={
                        isCourse
                            ? "w-full aspect-video object-contain rounded-md"
                            : "w-36 h-36 md:w-44 md:h-44 object-contain"
                    }
                />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-center">
                {module.title}
            </h3>

            {module.description ? (
                <MultiLineText
                    text={module.description}
                    className="text-gray-700 text-base md:text-lg"
                />
            ) : null}

            {module.bullets?.length ? (
                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm md:text-base">
                    {module.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            ) : null}
        </article>
    );
}

type CurriculumGroupToggleProps = {
    activeGroup: ISalesFunnelCurriculumGroup;
    groupLabels: ISalesFunnelCurriculumGroupLabels;
    onChange: (group: ISalesFunnelCurriculumGroup) => void;
};

function CurriculumGroupToggle({
    activeGroup,
    groupLabels,
    onChange,
}: CurriculumGroupToggleProps) {
    const groups: ISalesFunnelCurriculumGroup[] = ["courses", "bundles"];

    return (
        <div
            role="tablist"
            aria-label="Curriculum groups"
            className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10"
        >
            {groups.map((group) => {
                const isActive = activeGroup === group;

                return (
                    <button
                        key={group}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(group)}
                        className={`rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-colors ${
                            isActive
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-700"
                        }`}
                    >
                        {groupLabels[group]}
                    </button>
                );
            })}
        </div>
    );
}

export function CurriculumSection({ curriculum }: CurriculumSectionProps) {
    const [activeGroup, setActiveGroup] =
        useState<ISalesFunnelCurriculumGroup>("courses");
    const activeModules = curriculum[activeGroup];

    return (
        <section id="curriculum" aria-labelledby="curriculum-heading">
            <SectionHeading
                id="curriculum-heading"
                title={curriculum.heading}
                subtitle={curriculum.subtitle}
            />

            {curriculum.updateNote ? (
                <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-10 italic max-w-2xl mx-auto">
                    {curriculum.updateNote}
                </p>
            ) : null}

            <CurriculumGroupToggle
                activeGroup={activeGroup}
                groupLabels={curriculum.groupLabels}
                onChange={setActiveGroup}
            />

            <div
                role="tabpanel"
                aria-label={curriculum.groupLabels[activeGroup]}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
            >
                {activeModules.map((module) => (
                    <ModuleCard
                        key={`${activeGroup}-${module.title}`}
                        module={module}
                        variant={activeGroup}
                    />
                ))}
            </div>

            {/*<LessonPreviewsSection
                heading={curriculum.previewHeading}
                intro={curriculum.previewIntro}
                lessonPreviews={curriculum.lessonPreviews}
            />*/}
        </section>
    );
}
