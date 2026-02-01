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
} from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";

interface SidebarRoutesProps {
    userLoggedIn: boolean;
}

export const SidebarRoutes = ({ userLoggedIn }: SidebarRoutesProps) => {
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
            href: "/courses",
            locked: false,
        },
        {
            icon: Layout,
            label: language.dashboard,
            href: "/dashboard",
            locked: false,
        },
        /*
        { icon: School, label: "Seminários", href: "/seminars", locked: true },
        {
            icon: Puzzle,
            label: "Desafios de Programação",
            href: "/challenges",
            locked: true,
        },
        {
            icon: MessagesSquare,
            label: "Entrevistas",
            href: "/interview",
            locked: true,
        },
        {
            icon: Newspaper,
            label: "Newsletter",
            href: "/newsletter",
            locked: true,
        },
        { icon: Pencil, label: "Blog", href: "/blog", locked: true },
        { icon: Users, label: "Comunidade", href: "/community", locked: true },
        */
    ];

    const teacherRoutes = [
        {
            icon: List,
            label: language.courses,
            href: "/teacher/courses",
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
                />
            ))}
        </div>
    );
};
