import { Menu } from "lucide-react";
import { Seminar } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SeminarSidebar } from "@/app/(course)/watch-seminar/_components/seminar-sidebar";

interface SeminarMobileSidebarProps {
    seminars: Seminar[];
}

export const SeminarMobileSidebar = ({ seminars }: SeminarMobileSidebarProps) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <SeminarSidebar seminars={seminars} />
            </SheetContent>
        </Sheet>
    );
};
