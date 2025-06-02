"use client";
import image from "@/public/careers/webdev.webp";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";
import { useLanguageStore } from "@/hooks/use-language-store";

const ChooseACareerWebDev = () => {
  const language = useLanguageStore().careersPage;

  return (
    <CareerPage
      heading={`${language.chooseACourse} ${language.webDevelopment.title}`}
      description={language.webDevelopment.description}
      image={image}
      slug="webdev"
    />
  );
};

export default ChooseACareerWebDev;
