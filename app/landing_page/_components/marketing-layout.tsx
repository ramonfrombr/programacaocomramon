import { Navbar } from "@/app/landing_page/_components/navbar";
import { Footer } from "@/components/footer";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const MarketingLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div
            className={`${nunito.className} flex flex-col justify-between min-h-screen`}
        >
            <div>
                <Navbar />
                {children}
            </div>
            <Footer />
        </div>
    );
};
