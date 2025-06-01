"use client";
import image from "@/public/careers/webdev.webp";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";
import { useLanguageStore } from "@/hooks/use-language-store";

const ChooseACareerWebDev = () => {
  const language = useLanguageStore().careersPage.webDevelopment;

  return (
    <CareerPage
      heading={language.title}
      description={language.description}
      image={image}
      slug="webdev"
    />
  );
};

export default ChooseACareerWebDev;
