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
      "Quanto tempo terei acesso aos meus cursos no Programação com Ramon?",
    answer:
      "A maioria dos planos de curso oferece 12 meses de acesso ao material. Após o período de 12 meses, você precisará comprar o curso novamente para manter o acesso.",
  },
];

const billingQuestions = [
  {
    question: "O Stripe não suporta pagamentos do meu país, vocês aceitam Pix?",
    answer:
      "Por enquanto, não aceitamos pagamento por Pix. Todos os pagamentos devem ser feitos com um cartão de crédito válido",
  },
  {
    question:
      "Preciso cancelar minha assinatura para não ser cobrado novamente?",
    answer:
      "Não, todos os planos de curso no Programação com Ramon são pagos apenas uma vez. Não há assinatura para cancelar, você nunca será cobrado uma segunda vez sem comprar explicitamente outro curso.",
  },
  {
    question:
      "Como faço para excluir as informações do meu cartão de pagamento do Programação com Ramon?",
    answer:
      "Você não precisa, no Programação com Ramon nunca salvamos suas informações de pagamento no sistema. Como nossos planos são de pagamento único, não retemos suas informações pessoais.",
  },
];

const FaqsPage = () => {
  return (
    <div className="pt-5 p-8 sm:px-16 md:px-20 lg:px-32 w-full">
      <h1 className="text-2xl md:text-4xl font-semibold mb-3 text-center">
        Perguntas Frequentes
      </h1>

      <Accordion type="multiple" className="border rounded-md text-sm mb-5">
        <h2 className="p-3">Perguntas Frequentes</h2>

        {generalQuestions.map((faq, idx) => (
          <AccordionItem key={faq.question} value={`item-${idx + 1}`}>
            <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="p-3">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Accordion type="multiple" className="border rounded-md text-sm">
        <h2 className="p-3">Perguntas sobre Pagamento</h2>

        {billingQuestions.map((faq, idx) => (
          <AccordionItem key={faq.question} value={`item-${idx + 1}`}>
            <AccordionTrigger className="p-3 bg-gray-100 hover:bg-gray-200 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="p-3">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqsPage;
