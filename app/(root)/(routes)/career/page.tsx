import { Course } from "@prisma/client";
import Link from "next/link";

export interface CoursesInterface {
  beginner: Course[];
  intermediate: Course[];
  advanced: Course[];
  specialist: Course[];
}

type CareerType = {
  url: string;
  name: string;
};

const careers: CareerType[] = [
  { url: "webdev", name: "Desenvolvimento Web" },
  { url: "mobile", name: "Desenvolvimento Mobile" },
  { url: "embedded", name: "Sistemas Embarcados" },
  { url: "data-science", name: "Ciências de Dados" },
];

const ChooseACareer = () => {
  return (
    <div className="pt-5 text-center flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-semibold mb-3">
        Escolha uma área da programação
      </h1>
      <p className="text-gray-500 mb-3">
        Que tipo de programas você quer criar?
      </p>
      <div className="flex flex-col p-3 md:w-[500px]">
        {careers.map((career) => (
          <Link
            key={career.url}
            href={`career/${career.url}`}
            data-testid={career.url}
            className="p-3 mb-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-200 font-semibold"
          >
            {career.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ChooseACareer;
