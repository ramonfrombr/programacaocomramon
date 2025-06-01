import React from "react";
import { Navbar } from "@/app/(root)/_components/navbar";
import { Footer } from "@/components/footer";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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

export default RootLayout;
