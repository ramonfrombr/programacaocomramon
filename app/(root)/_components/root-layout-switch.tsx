"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/app/(root)/_components/dashboard-layout";
import { MarketingLayout } from "@/app/landing_page/_components/marketing-layout";

type RootLayoutSwitchProps = {
    children: React.ReactNode;
    userLoggedIn: boolean;
    hasGoldOrDiamondAccess: boolean;
    hasDiamondAccess: boolean;
};

export const RootLayoutSwitch = ({
    children,
    userLoggedIn,
    hasGoldOrDiamondAccess,
    hasDiamondAccess,
}: RootLayoutSwitchProps) => {
    const pathname = usePathname();
    const showMarketing = !userLoggedIn && pathname === "/";

    if (showMarketing) {
        return <MarketingLayout>{children}</MarketingLayout>;
    }

    return (
        <DashboardLayout
            userLoggedIn={userLoggedIn}
            hasGoldOrDiamondAccess={hasGoldOrDiamondAccess}
            hasDiamondAccess={hasDiamondAccess}
        >
            {children}
        </DashboardLayout>
    );
};
