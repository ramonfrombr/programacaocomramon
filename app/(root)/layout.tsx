import { auth } from "@clerk/nextjs/server";
import { RootLayoutSwitch } from "@/app/(root)/_components/root-layout-switch";
import { DashboardLayout } from "@/app/(root)/_components/dashboard-layout";
import { MarketingLayout } from "@/app/landing_page/_components/marketing-layout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    const userLoggedIn = !!userId;

    return (
        <RootLayoutSwitch
            userLoggedIn={userLoggedIn}
            marketingLayout={MarketingLayout}
            dashboardLayout={DashboardLayout}
        >
            {children}
        </RootLayoutSwitch>
    );
};

export default RootLayout;
