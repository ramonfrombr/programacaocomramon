"use client";
import { usePathname } from "next/navigation";
import { Layout, Compass, List, BarChart } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";

interface SidebarRoutesProps {
  userLoggedIn: boolean;
}

export const SidebarRoutes = ({ userLoggedIn }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const isTeacherPage = pathname.includes("/teacher");
  const language = useLanguageStore().sidebar;

  const guestRoutes = [{ icon: Compass, label: language.browse, href: "/" }];

  const userRoutes = [
    { icon: Compass, label: language.browse, href: "/courses" },
    { icon: Layout, label: language.dashboard, href: "/dashboard" },
  ];

  const teacherRoutes = [
    { icon: List, label: language.courses, href: "/teacher/courses" },
    { icon: BarChart, label: language.analytics, href: "/teacher/analytics" },
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
        />
      ))}
    </div>
  );
};
