import { Category, Challenge } from "@prisma/client";
import { ChallengeSidebarItem } from "@/app/(course)/watch-challenge/_components/challenge-sidebar-item";
import { language } from "@/lib/serverSideLanguage";

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

interface ChallengeSidebarProps {
  challenges: ChallengeWithCategories[];
}

export const ChallengeSidebar = ({ challenges }: ChallengeSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{language.sidebar.challenges}</h1>
      </div>
      <div className="flex flex-col w-full">
        {challenges.map((challenge) => (
          <ChallengeSidebarItem
            key={challenge.id}
            id={challenge.id}
            label={challenge.title}
          />
        ))}
      </div>
    </div>
  );
};
