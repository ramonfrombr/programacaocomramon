"use client";
import { SimpleModal } from "@/components/modals/simple-modal";
import { Play } from "lucide-react";
import Image from "next/image";
import placeholder from "@/public/placeholder.webp";
import { Button } from "@/components/ui/button";
import boot from "@/public/subscription_features/boot.svg";
import catalogue from "@/public/subscription_features/catalogue.svg";
import early from "@/public/subscription_features/early.svg";
import exclusive from "@/public/subscription_features/exclusive.svg";
import office_hours from "@/public/subscription_features/office-hours.svg";
import vote from "@/public/subscription_features/vote.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const features = [
  {
    image: boot,
    title: "Catálogo Completo",
    description: "Acesso a todos os cursos do nosso catálogo",
  },
  {
    image: early,
    title: "Acesso Antecipado Imediato",
    description:
      "Obtenha acesso a cursos que ainda estão em desenvolvimento antes de serem lançados",
  },
  {
    image: exclusive,
    title: "Projetos Exclusivos na Nuvem",
    description:
      "Construa seu portfólio na nuvem com nossos projetos exclusivos",
  },
  {
    image: office_hours,
    title: "Ofertas de Bootcamp",
    description:
      "Acesso com desconto aos nossos Bootcamps ao vivo está incluído na sua assinatura",
  },
  {
    image: catalogue,
    title: "Poder de Votação de Conteúdo",
    description:
      "Ajude a determinar quais novos conteúdos serão criados ou atualizados a seguir",
  },
  {
    image: vote,
    title: "Horas de Atendimento no Zoom",
    description:
      "Interaja diretamente com Andrew duas vezes por mês em nossas horas de atendimento",
  },
];

const faqs = [
  {
    question: "O que eu ganho com minha assinatura?",
    answer:
      "Sua assinatura inclui acesso a todos os cursos atuais da plataforma, acesso antecipado a novos lançamentos e acesso exclusivo a cursos somente para assinantes.",
  },
  {
    question: "Posso usar minha conta Paypal para comprar a assinatura?",
    answer:
      "Não. Atualmente, a Assinatura de Membros está disponível apenas para compra com um cartão de crédito válido.",
  },
  {
    question: "E quanto a novos cursos ou atualizações após a data da compra?",
    answer:
      "Os assinantes recebem automaticamente todas as atualizações de novos cursos dentro da plataforma, desde que permaneçam assinantes.",
  },
  {
    question:
      "Como voto para novos conteúdos de cursos e acesso às horas de atendimento?",
    answer:
      "Os assinantes ativos precisam verificar seu e-mail e as notificações dentro da plataforma para atualizações exclusivas mensais, incluindo pesquisas, links para as horas de atendimento e muito mais.",
  },
  {
    question: "Como posso cancelar minha assinatura?",
    answer:
      "Você pode cancelar a qualquer momento acessando as configurações da sua conta dentro da plataforma ou entrando em contato com nossa equipe de suporte. Você continuará tendo acesso ao catálogo até o final do período de faturamento atual em que foi cancelado.",
  },
];

const SubscriptionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/subscription/check`);
      console.log("response2 >>>> ", response);
      setIsSubscribed(response.data.subscribed);
    }
    fetchData();
  }, []);

  const onClickSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/subscription/checkout`);
      console.log(response)
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Algo deu errado.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickCancelSubscription = () => {
    
  }

  return (
    <div className="p-3 sm:px-16 md:px-24 lg:px-36">
      {false ? (
        <>
          <h2 className="font-semibold text-xl mb-3">
            Você já é assinante do Plano Mensal para Membros!
          </h2>
          <Button onClick={onClickCancelSubscription} variant={"destructive"}> 
            Cancelar Assinatura
          </Button>
        </>
        
      ) : (
        <div className={`text-center md:grid grid-cols-2 gap-5 items-start`}>
          <SimpleModal
            trigger={
              <>
                <div className="rounded-xl overflow-hidden relative cursor-pointer">
                  <Image
                    src={placeholder}
                    height={1080}
                    width={1920}
                    alt="Thumbnail"
                  />

                  <span className="bg-blue-800 absolute top-[50%] left-[50%] w-[50px] h-[50px] -translate-y-2/4 -translate-x-2/4 rounded-full flex items-center justify-center ">
                    <Play fill="white" color="white" />
                  </span>
                </div>
              </>
            }
          >
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/yaqVbs9f_xg"
            ></iframe>
          </SimpleModal>

          <div className="p-5 rounded-md border shadow-md">
            <h2 className="font-semibold text-xl mb-3">
              Assinatura de Membro Mensal
            </h2>
            <ul className="text-left list-disc pl-5 mb-5 text-[14px]">
              <li>Tenha Acesso Completo ao nosso Catálogo</li>
              <li>Um Pagamento Recorrente Mensal</li>
              <li>
                Domine as Áreas de Desenvolvimento Web, Mobile, Data Science, e
                muito mais
              </li>
              <li>
                Tenha Acesso Antecipado aos nossos Cursos em Desenvolvimento
                antes do lançamento
              </li>
              <li>Vote para escolher quais novos cursos serão lançados</li>
            </ul>

            <div className="text-2xl mb-3">
              <span className="font-bold">R$199</span> / mês
            </div>

            <Button
              onClick={onClickSubscription}
              disabled={isLoading}
              className="w-full rounded-full p-8 text-xl bg-blue-600 hover:bg-blue-700"
            >
              Inscreva-se Agora
            </Button>
          </div>
        </div>
      )}

      <div className="my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">
          BENEFÍCIOS DOS MEMBROS
        </h2>

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex sm:flex-col items-center sm:text-center gap-3"
            >
              <div className="bg-yellow-400 rounded-full flex flex-col items-center justify-center min-w-20 min-h-20 md:min-h-24 md:min-w-24">
                <Image
                  src={feature.image}
                  height={0}
                  width={0}
                  alt=""
                  className="h-12"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Accordion type="multiple" className="border rounded-md text-sm">
        <h2 className="p-3">Perguntas Frequentes</h2>

        {faqs.map((faq, idx) => (
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

export default SubscriptionPage;
