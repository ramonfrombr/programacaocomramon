import Image from "next/image";
import HTML from "@/public/programming_languages/html-logo.png";
import CSS from "@/public/programming_languages/css-logo.png";
import JavaScript from "@/public/programming_languages/javascript-logo.png";
import Python from "@/public/programming_languages/python-logo.webp";
import Ruby from "@/public/programming_languages/ruby-logo.png";
import PHP from "@/public/programming_languages/php-logo.png";
import C from "@/public/programming_languages/c-logo.png";
import PostgreSQL from "@/public/programming_languages/postgresql-logo.png";
import MySQL from "@/public/programming_languages/mysql-logo.png";
import MongoDB from "@/public/programming_languages/mongodb-logo.webp";
import Redis from "@/public/programming_languages/redis-logo.webp";

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
  {
    image: PHP,
    name: "PHP",
  },
  {
    image: Ruby,
    name: "Ruby",
  },
  {
    image: C,
    name: "C",
  },
  {
    image: PostgreSQL,
    name: "PostgreSQL",
  },
  {
    image: MySQL,
    name: "MySQL",
  },
  {
    image: MongoDB,
    name: "MongoDB",
  },
  {
    image: Redis,
    name: "Redis",
  },
];

export const LanguageList = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-10 md:my-20 md:w-4/5">
      {programmingLanguages.map((language) => (
        <div
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
        </div>
      ))}
    </div>
  );
};
