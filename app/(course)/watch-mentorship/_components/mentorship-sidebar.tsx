import { Category, Mentorship } from "@prisma/client";
import { MentorshipSidebarItem } from "@/app/(course)/watch-mentorship/_components/mentorship-sidebar-item";
import { language } from "@/lib/serverSideLanguage";

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

interface MentorshipSidebarProps {
  mentorships: MentorshipWithCategories[];
}

export const MentorshipSidebar = ({ mentorships }: MentorshipSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{language.sidebar.mentorships}</h1>
      </div>
      <div className="flex flex-col w-full">
        {mentorships.map((mentorship) => (
          <MentorshipSidebarItem
            key={mentorship.id}
            id={mentorship.id}
            label={mentorship.title}
          />
        ))}
      </div>
    </div>
  );
};
