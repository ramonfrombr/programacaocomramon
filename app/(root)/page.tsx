import { Banner } from "./_components/banner";
import { Feature } from "./_components/feature";
import { Footer } from "@/components/footer";
import { Hero } from "./_components/hero";
import { Instructor } from "./_components/instructor";
import { LanguageList } from "./_components/language-list";
import { Navbar } from "./_components/navbar";
import { Testimonials } from "./_components/testimonials";
import { Nunito_Sans } from "next/font/google";
import placeholder from "@/public/placeholder.webp";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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

const LandingPage = () => {
  const { userId } = auth();

  if (userId) {
    return redirect("/courses");
  }

  return (
    <div className="p-2 md:p-10 lg:p-14 flex flex-col items-center">
      <Hero />
      <LanguageList />

      <Banner
        heading="Assinatura no Plano Anual"
        paragraph="Nesta opção, você tem acesso ao catálogo completo de cursos, com acesso exclusivo a cursos especiais e benefícios."
        buttonText="Saiba Mais"
        url="/subscription"
      />

      <Testimonials />

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
    </div>
  );
};

export default LandingPage;
