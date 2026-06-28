import React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSeminars } from "@/actions/get-seminars";
import { SeminarNavbar } from "@/app/(course)/watch-seminar/_components/seminar-navbar";
import { hasGoldOrDiamondAccess } from "@/lib/membership";
import { SeminarSidebar } from "@/app/(course)/watch-seminar/_components/seminar-sidebar";

const SeminarLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    if (!(await hasGoldOrDiamondAccess(userId))) {
        return redirect("/membership");
    }

    const seminars = await getSeminars({});

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <SeminarNavbar seminars={seminars} />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <SeminarSidebar seminars={seminars} />
            </div>
            <main className="md:pl-80 h-full pt-[80px]">{children}</main>
        </div>
    );
};

export default SeminarLayout;
