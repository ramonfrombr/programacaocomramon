"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Navbar = () => {
  const { userId } = useAuth();

  return (
    <header className="p-2 md:p-5 flex items-center justify-between shadow-md mb-5">
      <Link
        href={!userId ? "/" : "/courses"}
        className="flex items-center gap-2"
      >
        <Image
          src={logo}
          height={40}
          width={40}
          alt="Logo Programação com Ramon"
        />

        <div>
          <p
            className={`leading-5 font-semibold text-base text-sky-900 ${poppins.className}`}
          >
            Programação com Ramon
          </p>
          <p className="text-sm text-muted-foreground">
            Construa algo incrível!
          </p>
        </div>
      </Link>

      {!userId && (
        <div className="gap-2 hidden md:flex">
          <Link href="/sign-in">
            <Button variant="default">Entrar</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="secondary">Criar conta</Button>
          </Link>
        </div>
      )}

      <Sheet>
        <SheetTrigger className="md:hidden hover:opacity-75 transition">
          <Menu size={35} />
        </SheetTrigger>
        <SheetContent side="right" className="bg-white w-72 flex flex-col p-5">
          <Link href="/sign-in">
            <Button variant="default">Entrar</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="secondary">Criar conta</Button>
          </Link>
        </SheetContent>
      </Sheet>
    </header>
  );
};
