import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR, frFR, esES, enUS } from "@clerk/localizations";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Escola de Programação",
    description:
        "Cursos e tutoriais de programação web, full stack, backend, frontend, e muito mais. Tópicos incluem HTML, CSS, JavaScript, TypeScript, NodeJS, ExpressJS, ReactJS, NextJS, Python, Django, Flask, e muito mais.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let localization;

    switch (process.env.NEXT_PUBLIC_LANGUAGE) {
        case "portuguese":
            localization = ptBR;
            break;
        case "english":
            localization = enUS;
            break;
        case "spanish":
            localization = esES;
            break;
        case "french":
            localization = frFR;
            break;
        default:
            localization = enUS;
    }

    return (
        <ClerkProvider localization={localization} afterSignOutUrl="/">
            <html lang="en">
                <body className={inter.className}>
                    <ConfettiProvider />
                    <ToastProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
