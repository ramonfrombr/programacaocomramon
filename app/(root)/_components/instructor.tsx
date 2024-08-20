import Image from "next/image";
import portrait from "@/public/portrait.jpg";
import { Cat, Clock, Wand, Coffee, Swords } from "lucide-react";

export const Instructor = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-center text-2xl md:text-4xl font-semibold mb-8">
        Conheça seu Professor de Programação Favorito Ramon Rodrigues
      </h2>

      <div className="flex flex-col items-center gap-6">
        <Image
          src={portrait}
          height={300}
          width={300}
          className="rounded-full"
          alt=""
        />
        <ul className="text-base md:text-2xl flex flex-col gap-2 [&>li]:flex [&>li]:items-center [&>li]:gap-4 ">
          <li>
            <Clock />
            Programador a mais de 10 anos
          </li>
          <li>
            <Cat />
            Criador do curso CS50x em Português
          </li>
          <li>
            <Wand />
            Experiente com diferentes tecnologias
          </li>
          <li>
            <Coffee />
            Brasileiro
          </li>
          <li>
            <Swords />
            Fã de Game of Thrones
          </li>
        </ul>
      </div>
    </div>
  );
};
