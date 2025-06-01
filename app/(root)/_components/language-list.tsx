import Image from "next/image";
import HTML from "@/public/programming_languages/html-logo.png";
import CSS from "@/public/programming_languages/css-logo.png";
import JavaScript from "@/public/programming_languages/javascript-logo.png";
import Python from "@/public/programming_languages/python-logo.webp";
import Link from "next/link";

const programmingLanguages = [
  {
    image: HTML,
    name: "HTML",
  },
  {
    image: CSS,
    name: "CSS",
  },
  {
    image: JavaScript,
    name: "JavaScript",
  },
  {
    image: Python,
    name: "Python",
  },
];

export const LanguageList = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-10 md:my-20 md:w-4/5">
      {programmingLanguages.map((language) => (
        <Link href={`/technology/${language.name}`}
          key={language.name}
          className="items-center shadow-md border w-[100px] h-[100px] p-2 flex flex-col justify-between"
        >
          <Image
            src={language.image}
            height={50}
            width={50}
            alt={language.name}
          />
          <span className="text-blue-500 font-semibold">{language.name}</span>
        </Link>
      ))}
    </div>
  );
};
