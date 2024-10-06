import React from "react";
import placeholder from "@/public/placeholder.webp";
import { Instructor } from "@/app/(root)/_components/instructor";
import { Feature } from "@/app/(root)/_components/feature";

const features = [
  {
    heading: "Páginas de referência perfeitas para fixar consultar o conteúdo",
    paragraph:
      "Nossas páginas de referência são perfeitas para imprimir e contém tudo que você precisa saber.",
    image: placeholder,
  },
  {
    heading: "Nossos cartões de memorização te ajudam a nunca esquecer.",
    paragraph: "Baseado em algoritmos de aprendizado com repetição alternada.",
    image: placeholder,
  },
  {
    heading: "Economize tempo e copie nossas anotações de estudo.",
    paragraph: "Em cada lição, nós criamos anotações de estudo detalhadas.",
    image: placeholder,
  },
  {
    heading: "Acompanhe seu progresso no curso",
    paragraph:
      "Em nosso sistema, você tem controle sobre seu percurso no curso.",
    image: placeholder,
  },
  {
    heading:
      "Faça perguntas sobre programação, receba respostas de especialistas",
    paragraph:
      "Nós investimos tempo para escrever explicações completas e detalhadas para suas perguntas sobre programação.",
    image: placeholder,
  },
];

const Features = () => {
  return (
    <section className="flex flex-col items-center mt-20 w-[90%] md:w-4/5">
      <Instructor />

      <div className="mt-20">
        {features.map((feature) => (
          <Feature
            key={feature.heading}
            heading={feature.heading}
            paragraph={feature.paragraph}
            image={feature.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
