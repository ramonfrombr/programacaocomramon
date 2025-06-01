"use client";
import React from "react";
import placeholder from "@/public/placeholder.webp";
import { Instructor } from "@/app/(root)/_components/instructor";
import { Feature } from "@/app/(root)/_components/feature";
import { useLanguageStore } from "@/hooks/use-language-store";

const Features = () => {
  const language = useLanguageStore().homepage.features;

  const features = [
    {
      heading: language.feature1.heading,
      description: language.feature1.description,
      image: placeholder,
    },
    {
      heading: language.feature2.heading,
      description: language.feature2.description,
      image: placeholder,
    },
    {
      heading: language.feature3.heading,
      description: language.feature3.description,
      image: placeholder,
    },
    {
      heading: language.feature4.heading,
      description: language.feature4.description,
      image: placeholder,
    },
    {
      heading: language.feature5.heading,
      description: language.feature5.description,
      image: placeholder,
    },
  ];

  return (
    <section className="flex flex-col items-center mt-20 w-[90%] md:w-4/5 hidden">
      <Instructor />

      <div className="mt-20">
        {features.map((feature) => (
          <Feature
            key={feature.heading}
            heading={feature.heading}
            paragraph={feature.description}
            image={feature.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
