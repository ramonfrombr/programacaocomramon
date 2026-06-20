"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { getSessionAccordionLabels } from "../_lib/session-accordion-labels";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";
import { SessionAccordion } from "./session-accordion";

type CommunitySectionProps = {
    community: ISalesFunnelCommunity;
};

type CommunityItemCardProps = {
    item: ISalesFunnelCommunityItem;
};

function CommunityItemCard({ item }: CommunityItemCardProps) {
    return (
        <article className="rounded-md border p-4 md:p-5 shadow-sm bg-white h-full">
            <h4 className="font-semibold text-sm md:text-base mb-2">{item.title}</h4>

            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-700 mb-3">
                {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                ))}
            </ul>

            <p className="text-xs md:text-sm text-gray-500">{item.duration}</p>
        </article>
    );
}

type StudentAreaBlockProps = {
    studentArea: ISalesFunnelStudentArea;
};

function StudentAreaBlock({ studentArea }: StudentAreaBlockProps) {
    return (
        <div className="mb-12 md:mb-16">
            <SectionHeading
                id="community-student-area-heading"
                title={studentArea.heading}
            />

            <div className="max-w-3xl mx-auto space-y-3 mb-8">
                {studentArea.description.map((paragraph) => (
                    <MultiLineText
                        key={paragraph.slice(0, 32)}
                        text={paragraph}
                        className="text-gray-700 text-sm md:text-base text-center"
                    />
                ))}
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-center mb-5">
                {studentArea.itemsHeading}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6">
                {studentArea.items.map((item) => (
                    <CommunityItemCard key={item.title} item={item} />
                ))}
            </div>

            <p className="text-center text-sm md:text-base font-semibold text-gray-600">
                {studentArea.footer}
            </p>
        </div>
    );
}

type DiamondMentoringBlockProps = {
    diamondMentoring: ISalesFunnelDiamondMentoring;
};

function DiamondMentoringBlock({ diamondMentoring }: DiamondMentoringBlockProps) {
    const { id: languageId } = useLanguageStore();
    const labels = getSessionAccordionLabels(languageId);

    return (
        <div>
            <SectionHeading
                id="community-diamond-heading"
                title={diamondMentoring.heading}
            />

            <div className="max-w-3xl mx-auto space-y-3 mb-8">
                {diamondMentoring.description.map((paragraph) => (
                    <MultiLineText
                        key={paragraph.slice(0, 32)}
                        text={paragraph}
                        className="text-gray-700 text-sm md:text-base text-center"
                    />
                ))}
            </div>

            <SessionAccordion
                sessions={diamondMentoring.sessions}
                groupSize={10}
                groupHeading={labels.group}
                sessionLabel={labels.session}
            />

            <p className="text-center text-sm md:text-base font-semibold text-gray-600 mt-6">
                {diamondMentoring.footer}
            </p>
        </div>
    );
}

export function CommunitySection({ community }: CommunitySectionProps) {
    return (
        <section id="community" aria-labelledby="community-student-area-heading">
            <StudentAreaBlock studentArea={community.studentArea} />
            <DiamondMentoringBlock diamondMentoring={community.diamondMentoring} />
        </section>
    );
}
