import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MultiLineText } from "./multi-line-text";

type FaqSectionProps = {
    faqs: ISalesFunnelFaq[];
    heading?: string;
    id?: string;
};

function FaqAnswer({ faq }: { faq: ISalesFunnelFaq }) {
    const answerLines = Array.isArray(faq.answer)
        ? faq.answer
        : faq.answer
          ? [faq.answer]
          : [];

    return (
        <div className="space-y-3">
            {answerLines.map((line, index) => (
                <MultiLineText key={`${index}-${line.slice(0, 24)}`} text={line} />
            ))}

            {faq.bullets?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                    {faq.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            ) : null}

            {faq.subsections?.map((subsection) => (
                <div key={subsection.title}>
                    <h4 className="font-semibold mb-1">{subsection.title}</h4>
                    <MultiLineText text={subsection.body} className="text-gray-700" />
                </div>
            ))}
        </div>
    );
}

export function FaqSection({ faqs, heading = "FAQ", id = "faq" }: FaqSectionProps) {
    return (
        <section id={id} aria-labelledby={`${id}-heading`}>
            <h2
                id={`${id}-heading`}
                className="text-2xl md:text-3xl font-bold text-center mb-5"
            >
                {heading}
            </h2>

            <Accordion type="multiple" className="border rounded-md text-sm">
                {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
                        <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                            <FaqAnswer faq={faq} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
