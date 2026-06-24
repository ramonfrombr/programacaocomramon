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
} from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { SidebarItem } from "@/app/(root)/_components/sidebar-item";

interface SidebarRoutesProps {
    userLoggedIn: boolean;
    onNavigate?: () => void;
}

export const SidebarRoutes = ({ userLoggedIn, onNavigate }: SidebarRoutesProps) => {
    const pathname = usePathname();
    const isTeacherPage = pathname.includes("/teacher");
    const language = useLanguageStore().sidebar;

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
            href: "/dashboard",
            locked: false,
        },
        {
            icon: School,
            label: language.seminars,
            href: "/seminars",
            locked: false,
        },
        {
            icon: GraduationCap,
            label: language.mentorships,
            href: "/mentorships",
            locked: false,
        },
        {
            icon: MessagesSquare,
            label: language.interviews,
            href: "/interviews",
            locked: false,
        },
        {
            icon: Puzzle,
            label: language.challenges,
            href: "/challenges",
            locked: false,
        },
    ];

    const teacherRoutes = [
        {
            icon: List,
            label: language.courses,
            href: "/teacher/courses",
            locked: false,
        },
        {
            icon: School,
            label: language.seminars,
            href: "/teacher/seminars",
            locked: false,
        },
        {
            icon: GraduationCap,
            label: language.mentorships,
            href: "/teacher/mentorships",
            locked: false,
        },
        {
            icon: MessagesSquare,
            label: language.interviews,
            href: "/teacher/interviews",
            locked: false,
        },
        {
            icon: Puzzle,
            label: language.challenges,
            href: "/teacher/challenges",
            locked: false,
        },
        {
            icon: BarChart,
            label: language.analytics,
            href: "/teacher/analytics",
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
