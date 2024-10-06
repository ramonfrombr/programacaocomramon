import CareerPage from "../_components/career-page";
import image from "@/public/careers/data-science.png";

const ChooseACareerDataScience = () => {
  const heading = "Ciência de Dados";
  const description =
    "A ciência de dados é uma área interdisciplinar, que localiza-se entre a estatística e a ciência da computação e utiliza o método científico; processos, algoritmos e sistemas, para extrair conhecimento e tomar decisões a partir de dados dos diversos tipos, sendo eles ruidosos, nebulosos, estruturados ou não-estruturados.";

  return (
    <CareerPage
      heading={heading}
      description={description}
      image={image}
      slug="data-science"
    />
  );
};

export default ChooseACareerDataScience;
