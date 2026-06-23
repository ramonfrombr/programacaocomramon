import React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChallenges } from "@/actions/get-challenges";
import { ChallengeNavbar } from "@/app/(course)/watch-challenge/_components/challenge-navbar";
import { ChallengeSidebar } from "@/app/(course)/watch-challenge/_components/challenge-sidebar";

const ChallengeLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const challenges = await getChallenges({});

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <ChallengeNavbar challenges={challenges} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <ChallengeSidebar challenges={challenges} />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default ChallengeLayout;
