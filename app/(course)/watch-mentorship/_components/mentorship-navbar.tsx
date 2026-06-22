import { NavbarRoutes } from "@/components/navbar-routes";
import { Category, Mentorship } from "@prisma/client";
import { MentorshipMobileSidebar } from "@/app/(course)/watch-mentorship/_components/mentorship-mobile-sidebar";

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

interface MentorshipNavbarProps {
  mentorships: MentorshipWithCategories[];
}

export const MentorshipNavbar = ({ mentorships }: MentorshipNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MentorshipMobileSidebar mentorships={mentorships} />
      <NavbarRoutes />
    </div>
  );
};
