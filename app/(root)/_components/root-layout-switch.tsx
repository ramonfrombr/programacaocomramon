"use client";

import { usePathname } from "next/navigation";

type RootLayoutSwitchProps = {
    children: React.ReactNode;
    userLoggedIn: boolean;
    marketingLayout: React.ComponentType<{ children: React.ReactNode }>;
    dashboardLayout: React.ComponentType<{
        children: React.ReactNode;
        userLoggedIn: boolean;
    }>;
};

export const RootLayoutSwitch = ({
    children,
    userLoggedIn,
    marketingLayout: MarketingLayout,
    dashboardLayout: DashboardLayout,
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
