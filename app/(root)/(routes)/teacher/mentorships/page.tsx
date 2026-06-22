import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { columns } from "@/app/(root)/(routes)/teacher/mentorships/_components/columns";
import { DataTable } from "@/app/(root)/(routes)/teacher/mentorships/_components/data-table";

const MentorshipsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const mentorships = await db.mentorship.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={mentorships} />
        </div>
    );
};

export default MentorshipsPage;
