"use client";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import { useLanguageStore } from "@/hooks/use-language-store";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const Navbar = () => {
    const { userId } = useAuth();
    const language = useLanguageStore();

    return (
        <header className="p-2 md:p-5 flex items-center justify-between shadow-md mb-5">
            <Link href="/" className="flex items-center gap-2">
                <span className="md:hidden">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="Logo Escola de Programação"
                    />
                </span>
                <span className="hidden md:inline">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="Logo Escola de Programação"
                    />
                </span>

                <div>
                    <p
                        className={`leading-5 font-semibold text-base md:text-[1.2rem] text-sky-900 ${poppins.className}`}
                    >
                        Escola de Programação
                    </p>
                    <p className="text-sm md:text-[1rem] text-muted-foreground">
                        Construa algo incrível!
                    </p>
                </div>
            </Link>

            {!userId ? (
                <div className="gap-2 hidden md:flex">
                    <Link href={`/${language.signInURL}`}>
                        <Button variant="default">{language.signIn}</Button>
                    </Link>
                    <Link href={`/${language.signUpURL}`}>
                        <Button variant="secondary">{language.signUp}</Button>
                    </Link>
                </div>
            ) : (
                <span className="hidden md:inline">
                    <UserButton />
                </span>
            )}

            <Sheet>
                <SheetTrigger className="md:hidden hover:opacity-75 transition">
                    <Menu size={35} />
                </SheetTrigger>
                <SheetContent
                    side="right"
                    className="bg-white w-72 flex flex-col p-5"
                >
                    <Link href={`/${language.signInURL}`}>
                        <Button variant="default">{language.signIn}</Button>
                    </Link>
                    <Link href={`/${language.signUpURL}`}>
                        <Button variant="secondary">{language.signUp}</Button>
                    </Link>
                </SheetContent>
            </Sheet>
        </header>
    );
};
