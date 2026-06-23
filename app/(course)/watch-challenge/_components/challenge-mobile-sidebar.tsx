import { Menu } from "lucide-react";
import { Category, Challenge } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChallengeSidebar } from "@/app/(course)/watch-challenge/_components/challenge-sidebar";

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

interface ChallengeMobileSidebarProps {
  challenges: ChallengeWithCategories[];
}

export const ChallengeMobileSidebar = ({
  challenges,
}: ChallengeMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <ChallengeSidebar challenges={challenges} />
      </SheetContent>
    </Sheet>
  );
};
