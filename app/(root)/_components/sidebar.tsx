"use client";

import { Logo } from "@/app/(root)/_components/Logo";
import { SidebarRoutes } from "@/app/(root)/_components/sidebar-routes";

interface SidebarProps {
    userLoggedIn: boolean;
    hasGoldOrDiamondAccess: boolean;
    hasDiamondAccess: boolean;
    onNavigate?: () => void;
}

export const Sidebar = ({
    onNavigate,
    userLoggedIn,
    hasGoldOrDiamondAccess,
    hasDiamondAccess,
}: SidebarProps) => {
    return (
        <div className="h-full border-r flex-col overflow-y-auto bg-white shadow-sm md:w-[320px]">
            <div className="p-3">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes
                    userLoggedIn={userLoggedIn}
                    hasGoldOrDiamondAccess={hasGoldOrDiamondAccess}
                    hasDiamondAccess={hasDiamondAccess}
                    onNavigate={onNavigate}
                />
            </div>
        </div>
    );
};
