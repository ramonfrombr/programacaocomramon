import React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMentorships } from "@/actions/get-mentorships";
import { MentorshipNavbar } from "@/app/(course)/watch-mentorship/_components/mentorship-navbar";
import { hasGoldOrDiamondAccess } from "@/lib/membership";
import { MentorshipSidebar } from "@/app/(course)/watch-mentorship/_components/mentorship-sidebar";

const MentorshipLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  if (!(await hasGoldOrDiamondAccess(userId))) {
    return redirect("/membership");
  }

  const mentorships = await getMentorships({});

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <MentorshipNavbar mentorships={mentorships} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MentorshipSidebar mentorships={mentorships} />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default MentorshipLayout;
