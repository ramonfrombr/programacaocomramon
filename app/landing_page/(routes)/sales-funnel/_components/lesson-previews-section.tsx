import { MultiLineText } from "./multi-line-text";

type LessonPreviewsSectionProps = {
    heading: string;
    intro: string;
    lessonPreviews: ISalesFunnelLessonPreview[];
};

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

export function LessonPreviewsSection({
    heading,
    intro,
    lessonPreviews,
}: LessonPreviewsSectionProps) {
    return (
        <div className="mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-3">
                {heading}
            </h3>

            <MultiLineText
                text={intro}
                className="text-gray-600 text-sm md:text-base text-center max-w-3xl mx-auto mb-6 md:mb-8"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {lessonPreviews.map((preview) => (
                    <LessonPreviewCard
                        key={`${preview.lesson}-${preview.title}`}
                        preview={preview}
                    />
                ))}
            </div>
        </div>
    );
}
