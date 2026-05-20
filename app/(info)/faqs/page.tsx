import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const generalQuestions = [
    {
        question:
            "Quanto tempo terei acesso aos meus cursos no Escola de Programação?",
        answer: "Quando você compra um curso, você tem acesso vitalício.",
    },
];

const FaqsPage = () => {
    return (
        <div className="pt-5 p-8 sm:px-16 md:px-20 lg:px-32 w-full">
            <h1 className="text-2xl md:text-4xl font-semibold mb-3 text-center">
                Perguntas Frequentes
            </h1>

            <Accordion
                type="multiple"
                className="border rounded-md text-sm mb-5"
            >
                <h2 className="p-3">Perguntas Frequentes</h2>

                {generalQuestions.map((faq, idx) => (
                    <AccordionItem key={faq.question} value={`item-${idx + 1}`}>
                        <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FaqsPage;
