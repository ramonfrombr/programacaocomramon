"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/app/(root)/_components/banner";

const Promotions = () => {
  const language = useLanguageStore().homepage.subcriptionBanner;

  return (
    <section className="flex flex-col items-center hidden">
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
