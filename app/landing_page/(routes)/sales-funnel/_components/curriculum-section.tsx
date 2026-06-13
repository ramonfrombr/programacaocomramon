import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";

type CurriculumSectionProps = {
    curriculum: ISalesFunnelCurriculum;
};

type ModuleAccordionProps = {
    modules: ISalesFunnelModule[];
};

function ModuleAccordion({ modules }: ModuleAccordionProps) {
    return (
        <Accordion type="multiple" className="border rounded-md text-sm md:text-base">
            {modules.map((module, index) => (
                <AccordionItem
                    key={module.title}
                    value={`module-${index}`}
                    className="sales-funnel-module-item"
                    style={{ contentVisibility: "auto" }}
                >
                    <AccordionTrigger className="p-3 md:p-4 bg-gray-100 hover:bg-gray-200 hover:no-underline text-left font-semibold">
                        {module.title}
                    </AccordionTrigger>
                    <AccordionContent className="p-3 md:p-4">
                        {module.description ? (
                            <MultiLineText
                                text={module.description}
                                className="text-gray-700"
                            />
                        ) : null}

                        {module.bullets?.length ? (
                            <ul className="list-disc pl-5 mt-3 space-y-1">
                                {module.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        ) : null}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

type LessonPreviewCardProps = {
    preview: ISalesFunnelLessonPreview;
};

function LessonPreviewCard({ preview }: LessonPreviewCardProps) {
    return (
        <article className="rounded-md border p-4 shadow-sm bg-white h-full">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
                {preview.lesson}
            </p>
            <h4 className="font-semibold text-sm md:text-base">{preview.title}</h4>
        </article>
    );
}

export function CurriculumSection({ curriculum }: CurriculumSectionProps) {
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

            <ModuleAccordion modules={curriculum.modules} />

            <div className="mt-12 md:mt-16">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-3">
                    {curriculum.previewHeading}
                </h3>

                <MultiLineText
                    text={curriculum.previewIntro}
                    className="text-gray-600 text-sm md:text-base text-center max-w-3xl mx-auto mb-6 md:mb-8"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {curriculum.lessonPreviews.map((preview) => (
                        <LessonPreviewCard
                            key={`${preview.lesson}-${preview.title}`}
                            preview={preview}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
