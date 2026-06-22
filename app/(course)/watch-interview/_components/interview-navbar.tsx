import { NavbarRoutes } from "@/components/navbar-routes";
import { Category, Interview } from "@prisma/client";
import { InterviewMobileSidebar } from "@/app/(course)/watch-interview/_components/interview-mobile-sidebar";

type InterviewWithCategories = Interview & {
  categories: Category[];
};

interface InterviewNavbarProps {
  interviews: InterviewWithCategories[];
}

export const InterviewNavbar = ({ interviews }: InterviewNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <InterviewMobileSidebar interviews={interviews} />
      <NavbarRoutes />
    </div>
  );
};
