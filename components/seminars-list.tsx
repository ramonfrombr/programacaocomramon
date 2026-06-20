"use client";

import { Seminar } from "@prisma/client";
import { SeminarCard } from "@/components/seminar-card";
import { useLanguageStore } from "@/hooks/use-language-store";

interface SeminarsListProps {
  items: Seminar[];
}

export const SeminarsList = ({ items }: SeminarsListProps) => {
  const language = useLanguageStore().seminars;

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <SeminarCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          {language.noSeminarsFound}
        </div>
      )}
    </div>
  );
};
