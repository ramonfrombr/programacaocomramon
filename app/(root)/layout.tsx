import { auth } from "@clerk/nextjs/server";
import { RootLayoutSwitch } from "@/app/(root)/_components/root-layout-switch";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    const userLoggedIn = !!userId;

    return (
        <RootLayoutSwitch userLoggedIn={userLoggedIn}>
            {children}
        </RootLayoutSwitch>
    );
};

export default RootLayout;
