import { Seminar } from "@prisma/client";
import { SeminarSidebarItem } from "@/app/(course)/watch-seminar/_components/seminar-sidebar-item";
import { language } from "@/lib/serverSideLanguage";

interface SeminarSidebarProps {
    seminars: Seminar[];
}

export const SeminarSidebar = ({ seminars }: SeminarSidebarProps) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{language.sidebar.seminars}</h1>
            </div>
            <div className="flex flex-col w-full">
                {seminars.map((seminar) => (
                    <SeminarSidebarItem
                        key={seminar.id}
                        id={seminar.id}
                        label={seminar.title}
                    />
                ))}
            </div>
        </div>
    );
};
