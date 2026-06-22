import React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getInterviews } from "@/actions/get-interviews";
import { InterviewNavbar } from "@/app/(course)/watch-interview/_components/interview-navbar";
import { InterviewSidebar } from "@/app/(course)/watch-interview/_components/interview-sidebar";

const InterviewLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const interviews = await getInterviews({});

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <InterviewNavbar interviews={interviews} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <InterviewSidebar interviews={interviews} />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default InterviewLayout;
