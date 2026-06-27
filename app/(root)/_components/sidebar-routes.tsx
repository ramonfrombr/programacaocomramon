"use client";
import { usePathname } from "next/navigation";
import {
    Layout,
    Compass,
    List,
    BarChart,
    MessagesSquare,
    Puzzle,
    Newspaper,
    School,
    Rss,
    Users,
    Trophy,
    Pencil,
    GraduationCap,
    Crown,
    Gem,
} from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { SidebarItem } from "@/app/(root)/_components/sidebar-item";

interface SidebarRoutesProps {
    userLoggedIn: boolean;
    onNavigate?: () => void;
}

export const SidebarRoutes = ({ userLoggedIn, onNavigate }: SidebarRoutesProps) => {
    const pathname = usePathname();
    const language = useLanguageStore().sidebar;
    const teacherBase = `/${language.teacherURL}`;
    const isTeacherPage =
        pathname.startsWith(teacherBase) || pathname.startsWith("/teacher");

    const guestRoutes = [
        { icon: Compass, label: language.browse, href: "/", locked: false },
    ];

    const userRoutes = [
        {
            icon: Compass,
            label: language.browse,
            href: "/",
            locked: false,
        },
        {
            icon: Layout,
            label: language.dashboard,
            href: `/${language.dashboardURL}`,
            locked: false,
        },
        {
            icon: Crown,
            label: language.membership,
            href: `/${language.membershipURL}`,
            locked: false,
        },
        {
            icon: GraduationCap,
            label: language.mentorships,
            href: `/${language.mentorshipsURL}`,
            locked: false,
        },
        {
            icon: School,
            label: language.seminars,
            href: `/${language.seminarsURL}`,
            locked: false,
        },
        {
            icon: Puzzle,
            label: language.challenges,
            href: `/${language.challengesURL}`,
            locked: false,
        },
        {
            icon: MessagesSquare,
            label: language.interviews,
            href: `/${language.interviewsURL}`,
            locked: false,
        },
    ];

    const teacherRoutes = [
        {
            icon: List,
            label: language.courses,
            href: `${teacherBase}/${language.coursesURL}`,
            locked: false,
        },
        {
            icon: GraduationCap,
            label: language.mentorships,
            href: `${teacherBase}/${language.mentorshipsURL}`,
            locked: false,
        },
        {
            icon: School,
            label: language.seminars,
            href: `${teacherBase}/${language.seminarsURL}`,
            locked: false,
        },
        {
            icon: Puzzle,
            label: language.challenges,
            href: `${teacherBase}/${language.challengesURL}`,
            locked: false,
        },
        {
            icon: MessagesSquare,
            label: language.interviews,
            href: `${teacherBase}/${language.interviewsURL}`,
            locked: false,
        },
        {
            icon: Gem,
            label: language.membership,
            href: `${teacherBase}/${language.membershipURL}`,
            locked: false,
        },
        {
            icon: BarChart,
            label: language.analytics,
            href: `${teacherBase}/${language.analyticsURL}`,
            locked: false,
        },
    ];
    const routes = isTeacherPage
        ? teacherRoutes
        : userLoggedIn
          ? userRoutes
          : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    locked={route.locked}
                    onClick={onNavigate}
                />
            ))}
        </div>
    );
};
