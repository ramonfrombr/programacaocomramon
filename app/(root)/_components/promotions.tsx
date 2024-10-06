"use client";
import React from "react";
import { Banner } from "./banner";
import { useLanguageStore } from "@/hooks/use-language-store";

const Promotions = () => {
  const language = useLanguageStore().homepage.subcriptionBanner;

  return (
    <section className="flex flex-col items-center">
      <Banner
        heading={language.heading}
        paragraph={language.description}
        buttonText={language.learnMore}
        url="/subscription"
      />
    </section>
  );
};

export default Promotions;
