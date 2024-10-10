"use client";
import image from "@/public/careers/embedded.png";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";
import { useLanguageStore } from "@/hooks/use-language-store";

const ChooseACareerEmbedded = () => {
  const language = useLanguageStore().careersPage.embeddedSystems;

  return (
    <CareerPage
      heading={language.title}
      description={language.description}
      image={image}
      slug="embedded"
    />
  );
};

export default ChooseACareerEmbedded;
