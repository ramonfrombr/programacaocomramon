import { Menu } from "lucide-react";
import { Category, Mentorship } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MentorshipSidebar } from "@/app/(course)/watch-mentorship/_components/mentorship-sidebar";

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

interface MentorshipMobileSidebarProps {
  mentorships: MentorshipWithCategories[];
}

export const MentorshipMobileSidebar = ({
  mentorships,
}: MentorshipMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <MentorshipSidebar mentorships={mentorships} />
      </SheetContent>
    </Sheet>
  );
};
