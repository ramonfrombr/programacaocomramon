import Image, { StaticImageData } from "next/image";

interface HeaderProps {
  heading: string;
  image: StaticImageData;
  description: string;
}

const Header = ({ heading, image, description }: HeaderProps) => {
  return (
    <header className="py-5">
      <h1 className="text-3xl lg:text-4xl text-center font-bold mb-5">
        {heading}
      </h1>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:border lg:border-slate-300 lg:p-5 rounded-lg lg:w-[350px]">
          <Image
            src={image}
            height={0}
            width={0}
            alt=""
            className="w-[80px] lg:w-[100px] mx-auto"
          />
        </div>
        <p className="lg:border text-justify lg:border-slate-300 p-3 rounded-lg text-lg">
          {description}
        </p>
      </div>
    </header>
  );
};

export default Header;
