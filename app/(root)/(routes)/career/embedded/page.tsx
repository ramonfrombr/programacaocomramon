import image from "@/public/careers/embedded.png";
import CareerPage from "@/app/(root)/(routes)/career/_components/career-page";

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
