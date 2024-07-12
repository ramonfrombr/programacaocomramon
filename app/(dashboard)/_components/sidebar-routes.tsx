"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/hooks/use-language-store";

export const SidebarRoutes = () => {
  const language = useLanguageStore().sidebar;
  const pathname = usePathname();
  const isTeacherPage = pathname.includes("/teacher");

  const guestRoutes = [
    { icon: Layout, label: language.dashboard, href: "/" },
    { icon: Compass, label: language.browse, href: "/search" },
  ];

  const teacherRoutes = [
    { icon: List, label: language.courses, href: "/teacher/courses" },
    { icon: BarChart, label: language.analytics, href: "/teacher/analytics" },
  ];
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

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
