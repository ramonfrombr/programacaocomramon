"use client";

import { Category, Interview } from "@prisma/client";
import { InterviewCard } from "@/components/interview-card";
import { useLanguageStore } from "@/hooks/use-language-store";

type InterviewWithCategories = Interview & {
  categories: Category[];
};

interface InterviewsListProps {
  items: InterviewWithCategories[];
}

export const InterviewsList = ({ items }: InterviewsListProps) => {
  const language = useLanguageStore().interviews;

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <InterviewCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            guestName={item.guestName}
            difficulty={item.difficulty}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          {language.noInterviewsFound}
        </div>
      )}
    </div>
  );
};
