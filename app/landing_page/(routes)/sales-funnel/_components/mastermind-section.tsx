"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { getSessionAccordionLabels } from "../_lib/session-accordion-labels";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";
import { SessionAccordion } from "./session-accordion";

type MastermindSectionProps = {
    mastermind: ISalesFunnelMastermind;
};

type StatsGridProps = {
    stats: ISalesFunnelMastermindStats;
};

function StatsGrid({ stats }: StatsGridProps) {
    const items = [stats.hours, stats.value, stats.availability, stats.recordingNote];

    return (
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-10">
            {items.map((item) => (
                <li
                    key={item.slice(0, 32)}
                    className="rounded-md border bg-gray-50 p-4 text-sm md:text-base text-gray-700"
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

type ExpansionCalloutProps = {
    callout: NonNullable<ISalesFunnelMastermind["expansionCallout"]>;
};

function ExpansionCallout({ callout }: ExpansionCalloutProps) {
    return (
        <aside className="rounded-md border-2 border-blue-600 bg-blue-50 p-5 md:p-6 text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h3 className="text-lg md:text-xl font-bold mb-3">{callout.heading}</h3>

            <MultiLineText
                text={callout.body}
                className="text-gray-700 text-sm md:text-base mb-3"
            />

            <p className="font-semibold text-blue-700">{callout.cta}</p>
        </aside>
    );
}

type SuccessCoachesBlockProps = {
    successCoaches: ISalesFunnelSuccessCoaches;
};

function SuccessCoachesBlock({ successCoaches }: SuccessCoachesBlockProps) {
    return (
        <div className="mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-3">
                {successCoaches.heading}
            </h3>

            <p className="text-gray-600 text-sm md:text-base text-center max-w-3xl mx-auto mb-3">
                {successCoaches.schedule}
            </p>

            {successCoaches.intro ? (
                <MultiLineText
                    text={successCoaches.intro}
                    className="text-gray-600 text-sm md:text-base text-center max-w-3xl mx-auto mb-5"
                />
            ) : null}

            <ul className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto mb-4">
                {successCoaches.topics.map((topic) => (
                    <li
                        key={topic}
                        className="rounded-full border bg-white px-3 py-1 text-xs md:text-sm text-gray-700"
                    >
                        {topic}
                    </li>
                ))}
            </ul>

            {successCoaches.footer ? (
                <p className="text-center font-semibold text-sm md:text-base">
                    {successCoaches.footer}
                </p>
            ) : null}
        </div>
    );
}

export function MastermindSection({ mastermind }: MastermindSectionProps) {
    const { id: languageId } = useLanguageStore();
    const labels = getSessionAccordionLabels(languageId);

    return (
        <section id="mastermind" aria-labelledby="mastermind-heading">
            <SectionHeading id="mastermind-heading" title={mastermind.heading} />

            <div className="max-w-3xl mx-auto space-y-3 mb-6 md:mb-8">
                {mastermind.description.map((paragraph) => (
                    <MultiLineText
                        key={paragraph.slice(0, 32)}
                        text={paragraph}
                        className="text-gray-700 text-sm md:text-base text-center"
                    />
                ))}
            </div>

            <StatsGrid stats={mastermind.stats} />

            <SessionAccordion
                sessions={mastermind.sessions}
                groupSize={10}
                groupHeading={labels.group}
                sessionLabel={labels.session}
            />

            {mastermind.expansionCallout ? (
                <div className="mt-10 md:mt-12">
                    <ExpansionCallout callout={mastermind.expansionCallout} />
                </div>
            ) : null}

            <SuccessCoachesBlock successCoaches={mastermind.successCoaches} />
        </section>
    );
}
