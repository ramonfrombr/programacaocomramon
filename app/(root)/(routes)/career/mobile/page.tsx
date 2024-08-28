import CareerPage from "../_components/career-page";
import image from "@/public/careers/mobile.png";

const ChooseACareerMobile = () => {
  const heading = "Desenvolvimento Mobile";
  const description =
    "O desenvolvimento mobile é o processo de criação de aplicativos e soluções que se voltam especificamente para dispositivos móveis, como smartphones e tablets.  ";

  return (
    <CareerPage
      heading={heading}
      description={description}
      image={image}
      slug="mobile"
    />
  );
};

export default ChooseACareerMobile;
