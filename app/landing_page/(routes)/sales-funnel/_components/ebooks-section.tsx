import { MultiLineText } from "./multi-line-text";
import { SectionHeading } from "./section-heading";

type EbooksSectionProps = {
    ebooks: ISalesFunnelEbooks;
};

export function EbooksSection({ ebooks }: EbooksSectionProps) {
    return (
        <section
            id="ebooks"
            aria-labelledby="closing-ebooks-heading"
            className="mb-12 md:mb-16"
        >
            <SectionHeading
                id="closing-ebooks-heading"
                title={ebooks.heading}
            />

            <div className="max-w-3xl mx-auto space-y-3 mb-6">
                {ebooks.intro.map((paragraph) => (
                    <MultiLineText
                        key={paragraph.slice(0, 32)}
                        text={paragraph}
                        className="text-gray-700"
                    />
                ))}
            </div>

            <h3 className="font-semibold text-lg mb-3 text-center">
                {ebooks.includesHeading}
            </h3>

            <ul className="list-disc pl-5 max-w-xl mx-auto space-y-1">
                {ebooks.items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    );
}
