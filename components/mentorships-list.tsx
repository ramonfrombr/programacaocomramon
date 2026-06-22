"use client";

import { Category, Mentorship } from "@prisma/client";
import { MentorshipCard } from "@/components/mentorship-card";
import { useLanguageStore } from "@/hooks/use-language-store";

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

interface MentorshipsListProps {
  items: MentorshipWithCategories[];
}

export const MentorshipsList = ({ items }: MentorshipsListProps) => {
  const language = useLanguageStore().mentorships;

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <MentorshipCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          {language.noMentorshipsFound}
        </div>
      )}
    </div>
  );
};
