"use client";
import image from "@/public/careers/data-science.png";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";
import { useLanguageStore } from "@/hooks/use-language-store";

const ChooseACareerDataScience = () => {
  const language = useLanguageStore().careersPage.dataScience;

  return (
    <CareerPage
      heading={language.title}
      description={language.description}
      image={image}
      slug="data-science"
    />
  );
};

export default ChooseACareerDataScience;
