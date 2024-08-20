import React from "react";
import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/Navbar";
import { Footer } from "@/components/footer-dashboard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-[300px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-[300px] pt-[80px] min-h-screen bg-gray-50 flex flex-col justify-between">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
