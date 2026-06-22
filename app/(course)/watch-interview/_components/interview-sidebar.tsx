import { Category, Interview } from "@prisma/client";
import { InterviewSidebarItem } from "@/app/(course)/watch-interview/_components/interview-sidebar-item";
import { language } from "@/lib/serverSideLanguage";

type InterviewWithCategories = Interview & {
  categories: Category[];
};

interface InterviewSidebarProps {
  interviews: InterviewWithCategories[];
}

export const InterviewSidebar = ({ interviews }: InterviewSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{language.sidebar.interviews}</h1>
      </div>
      <div className="flex flex-col w-full">
        {interviews.map((interview) => (
          <InterviewSidebarItem
            key={interview.id}
            id={interview.id}
            label={interview.title}
          />
        ))}
      </div>
    </div>
  );
};
