import { MarketingLayout } from "@/app/landing_page/_components/marketing-layout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <MarketingLayout>{children}</MarketingLayout>;
};

export default RootLayout;
