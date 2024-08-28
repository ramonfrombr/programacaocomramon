import CareerPage from "../_components/career-page";
import image from "@/public/careers/embedded.png";

const ChooseACareerEmbedded = () => {
  const heading = "Sistemas Embarcados";
  const description =
    "Um sistema embarcado é um sistema eletrônico microprocessado, completamente encapsulado, dedicado ao dispositivo ou sistema que ele controla.";

  return (
    <CareerPage
      heading={heading}
      description={description}
      image={image}
      slug="embedded"
    />
  );
};

export default ChooseACareerEmbedded;
