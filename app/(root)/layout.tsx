import { auth } from "@clerk/nextjs/server";
import { RootLayoutSwitch } from "@/app/(root)/_components/root-layout-switch";
import { hasDiamondAccess, hasGoldOrDiamondAccess } from "@/lib/membership";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    const userLoggedIn = !!userId;
    const [premiumContentAccess, diamondContentAccess] = userId
        ? await Promise.all([
              hasGoldOrDiamondAccess(userId),
              hasDiamondAccess(userId),
          ])
        : [false, false];

    return (
        <RootLayoutSwitch
            userLoggedIn={userLoggedIn}
            hasGoldOrDiamondAccess={premiumContentAccess}
            hasDiamondAccess={diamondContentAccess}
        >
            {children}
        </RootLayoutSwitch>
    );
};

export default RootLayout;
