import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { SearchPage } from "@/app/(root)/_components/search-page";
import { SalesFunnelPage } from "@/app/landing_page/(routes)/sales-funnel/_components/sales-funnel-page";
import { language } from "@/lib/serverSideLanguage";

interface PageProps {
    searchParams: {
        title: string;
        categoryId: string;
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { userId } = auth();

    if (!userId) {
        const { landing } = language.salesFunnel;
        const description =
            landing.tagline.replace(/\n+/g, " ").trim() ||
            landing.highlights[0]?.replace(/^✔\s*/, "") ||
            landing.headline;

        return {
            title: landing.headline,
            description,
        };
    }

    return {};
}

export default function Page({ searchParams }: PageProps) {
    const { userId } = auth();

    if (!userId) {
        return <SalesFunnelPage />;
    }

    return <SearchPage searchParams={searchParams} />;
}
