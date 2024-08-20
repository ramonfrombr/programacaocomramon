import Image, { StaticImageData } from "next/image";

interface FeatureProps {
  heading: string;
  paragraph: React.ReactNode;
  image: StaticImageData;
}

export const Feature = ({ heading, paragraph, image }: FeatureProps) => {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <h2 className="text-2xl md:text-4xl font-semibold">{heading}</h2>
      <p className="text-xl text-slate-700 mb-3">{paragraph}</p>

      <Image
        src={image}
        height={0}
        width={0}
        className="w-4/5 border rounded-md"
        alt={heading}
      ></Image>
    </div>
  );
};
