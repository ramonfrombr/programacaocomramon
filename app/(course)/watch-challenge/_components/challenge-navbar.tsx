import { NavbarRoutes } from "@/components/navbar-routes";
import { Category, Challenge } from "@prisma/client";
import { ChallengeMobileSidebar } from "@/app/(course)/watch-challenge/_components/challenge-mobile-sidebar";

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

interface ChallengeNavbarProps {
  challenges: ChallengeWithCategories[];
}

export const ChallengeNavbar = ({ challenges }: ChallengeNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <ChallengeMobileSidebar challenges={challenges} />
      <NavbarRoutes />
    </div>
  );
};
