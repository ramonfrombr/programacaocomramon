import { Menu } from "lucide-react";
import { Category, Interview } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { InterviewSidebar } from "@/app/(course)/watch-interview/_components/interview-sidebar";

type InterviewWithCategories = Interview & {
  categories: Category[];
};

interface InterviewMobileSidebarProps {
  interviews: InterviewWithCategories[];
}

export const InterviewMobileSidebar = ({
  interviews,
}: InterviewMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <InterviewSidebar interviews={interviews} />
      </SheetContent>
    </Sheet>
  );
};
