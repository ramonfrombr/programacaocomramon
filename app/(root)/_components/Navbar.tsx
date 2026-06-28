"use client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "@/app/(root)/_components/MobileSidebar";

export const Navbar = ({
    hasGoldOrDiamondAccess,
    hasDiamondAccess,
}: {
    hasGoldOrDiamondAccess: boolean;
    hasDiamondAccess: boolean;
}) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar
                hasGoldOrDiamondAccess={hasGoldOrDiamondAccess}
                hasDiamondAccess={hasDiamondAccess}
            />
            <NavbarRoutes />
        </div>
    );
};
