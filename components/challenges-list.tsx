"use client";

import { Category, Challenge } from "@prisma/client";
import { ChallengeCard } from "@/components/challenge-card";
import { useLanguageStore } from "@/hooks/use-language-store";

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

interface ChallengesListProps {
  items: ChallengeWithCategories[];
}

export const ChallengesList = ({ items }: ChallengesListProps) => {
  const language = useLanguageStore().challenges;

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ChallengeCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            difficulty={item.difficulty}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          {language.noChallengesFound}
        </div>
      )}
    </div>
  );
};
