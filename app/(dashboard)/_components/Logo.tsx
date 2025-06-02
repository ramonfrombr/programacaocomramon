"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useLanguageStore } from "@/hooks/use-language-store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Logo = () => {
  const language = useLanguageStore();
  
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image height={40} width={40} alt="logo" src="/logo.png" />

        <div className="ml-3">
          <p
            className={`leading-5 font-semibold text-base text-sky-900 ${poppins.className}`}
          >
            {language.title}
          </p>

          <p className="text-sm text-muted-foreground">
            {language.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};
