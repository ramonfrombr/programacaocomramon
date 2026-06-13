import type { Metadata } from "next";
import { language } from "@/lib/serverSideLanguage";

const { landing } = language.salesFunnel;

const description =
    landing.tagline.replace(/\n+/g, " ").trim() ||
    landing.highlights[0]?.replace(/^✔\s*/, "") ||
    landing.headline;

export const metadata: Metadata = {
    title: landing.headline,
    description,
};

export default function SalesFunnelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
