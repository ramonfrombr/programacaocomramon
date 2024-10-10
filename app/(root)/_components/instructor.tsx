"use client";
import Image from "next/image";
import { Cat, Clock, Wand, Coffee, Swords } from "lucide-react";
import portrait from "@/public/portrait.jpg";
import { useLanguageStore } from "@/hooks/use-language-store";

export const Instructor = () => {
  const language = useLanguageStore().homepage.features.instructor;

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-center text-2xl md:text-4xl font-semibold mb-8">
        {language.heading}
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
            {language.programmerForOver10Years}
          </li>
          <li>
            <Cat />
            {language.creatorOfCS50x}
          </li>
          <li>
            <Wand />
            {language.experientInDifferentTechnologies}
          </li>
          <li>
            <Coffee />
            {language.brazilian}
          </li>
          <li>
            <Swords />
            {language.fanOfGameOfThrones}
          </li>
        </ul>
      </div>
    </div>
  );
};
