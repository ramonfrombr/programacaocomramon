"use client";
import image from "@/public/careers/mobile.png";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";
import { useLanguageStore } from "@/hooks/use-language-store";

const ChooseACareerMobile = () => {
  const language = useLanguageStore().careersPage.mobileDevelopment;

  return (
    <CareerPage
      heading={language.title}
      description={language.description}
      image={image}
      slug="mobile"
    />
  );
};

export default ChooseACareerMobile;
