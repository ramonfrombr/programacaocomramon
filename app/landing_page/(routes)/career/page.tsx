"use client";
import Link from "next/link";
import { Course } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { CARRERS_URLS } from "@/app/_constants/careers-urls";
export interface CoursesInterface {
  beginner: Course[];
  intermediate: Course[];
  advanced: Course[];
  specialist: Course[];
}

type CareerType = {
  url: string;
  title: string;
};

const ChooseACareer = () => {
  const language = useLanguageStore().careersPage;

  const careers: CareerType[] = [
    { url: CARRERS_URLS.WEBDEV, title: language.webDevelopment.title },
  ];

  return (
    <div className="pt-5 text-center flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-semibold mb-3">
        {language.chooseAProgrammingField}
      </h1>
      <p className="text-gray-500 mb-3">
        {language.whatKindOfProgramsDoYouWantToCreate}{" "}
      </p>
      <div className="flex flex-col p-3 md:w-[500px]">
        {careers.map((career) => (
          <Link
            key={career.url}
            href={`career/${career.url}`}
            data-testid={career.url}
            className="p-3 mb-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-200 font-semibold"
          >
            {career.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ChooseACareer;
