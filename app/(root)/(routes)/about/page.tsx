import React from "react";
import ramon from "@/public/portrait.jpg";
import Image from "next/image";

const AboutSection = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <section>
      <h1 className="relative w-full block text-center">
        <span className="inline-block bg-black p-[8px] text-white font-extrabold text-[12px] text-center uppercase z-[2] relative">
          {text}
        </span>
        <span className="top-[17px] w-full border-b block absolute z-[1]"></span>
      </h1>
      {children}
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="px-5 md:px-20 pt-5 md:pt-10">
      <AboutSection text="Nossa Missão">
        <h1 className="text-2xl font-bold py-12 md:py-20 text-center">
          Ser a melhor plataforma de aprendizado de programação.
        </h1>
      </AboutSection>

      <AboutSection text="Nossa História">
        <p className="text-lg text-gray-700 py-5 md:py-14 text-center">
          Originalmente apenas um canal no YouTube com tutoriais sobre
          programação, a plataforma Programação com Ramon hoje se tornou uma
          referência em aprendizado de programação e ciências da computação.
        </p>
      </AboutSection>

      <AboutSection text="Conheça A Equipe">
        <div className="flex flex-col items-center pt-10 md:pt-14">
          <Image width={200} src={ramon} alt="Fundador Ramon Rodrigues" />
          <p className="mt-5 font-bold">Ramon Rodrigues</p>
          <p className="text-gray-700 text-sm">Fundador</p>
        </div>
      </AboutSection>
    </div>
  );
};

export default AboutPage;
