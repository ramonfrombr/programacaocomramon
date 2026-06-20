"use client";

import Link from "next/link";
import { useLanguageStore } from "@/hooks/use-language-store";

interface SeminarCardProps {
  id: string;
  title: string;
  description: string | null;
}

export const SeminarCard = ({ id, title, description }: SeminarCardProps) => {
  const language = useLanguageStore().seminars;

  const plainDescription = description?.replace(/<[^>]+>/g, "").trim();

  return (
    <Link href={`/${language.watchSeminarURL}/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full flex flex-col">
        <div className="flex flex-col flex-1 justify-between p-5 bg-white">
          <div>
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 mb-2">
              {title}
            </div>
            {plainDescription ? (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {plainDescription}
              </p>
            ) : null}
          </div>
          <span className="text-sm font-medium text-sky-700">{language.watch}</span>
        </div>
      </div>
    </Link>
  );
};
