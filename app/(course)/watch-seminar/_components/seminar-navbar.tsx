import { NavbarRoutes } from "@/components/navbar-routes";
import { Seminar } from "@prisma/client";
import { SeminarMobileSidebar } from "@/app/(course)/watch-seminar/_components/seminar-mobile-sidebar";

interface SeminarNavbarProps {
    seminars: Seminar[];
}

export const SeminarNavbar = ({ seminars }: SeminarNavbarProps) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <SeminarMobileSidebar seminars={seminars} />
            <NavbarRoutes />
        </div>
    );
};
