import { auth } from "@clerk/nextjs/server";
import { RootLayoutSwitch } from "@/app/(root)/_components/root-layout-switch";
import { hasGoldOrDiamondAccess } from "@/lib/membership";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    const userLoggedIn = !!userId;
    const premiumContentAccess = userId
        ? await hasGoldOrDiamondAccess(userId)
        : false;

    return (
        <RootLayoutSwitch
            userLoggedIn={userLoggedIn}
            hasGoldOrDiamondAccess={premiumContentAccess}
        >
            {children}
        </RootLayoutSwitch>
    );
};

export default RootLayout;
