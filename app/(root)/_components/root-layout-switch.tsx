"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/app/(root)/_components/dashboard-layout";
import { MarketingLayout } from "@/app/landing_page/_components/marketing-layout";

type RootLayoutSwitchProps = {
    children: React.ReactNode;
    userLoggedIn: boolean;
};

export const RootLayoutSwitch = ({
    children,
    userLoggedIn,
}: RootLayoutSwitchProps) => {
    const pathname = usePathname();
    const showMarketing = !userLoggedIn && pathname === "/";

    if (showMarketing) {
        return <MarketingLayout>{children}</MarketingLayout>;
    }

    return (
        <DashboardLayout userLoggedIn={userLoggedIn}>
            {children}
        </DashboardLayout>
    );
};
