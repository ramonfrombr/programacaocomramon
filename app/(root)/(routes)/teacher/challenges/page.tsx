import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { columns } from "@/app/(root)/(routes)/teacher/challenges/_components/columns";
import { DataTable } from "@/app/(root)/(routes)/teacher/challenges/_components/data-table";

const ChallengesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const challenges = await db.challenge.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={challenges} />
        </div>
    );
};

export default ChallengesPage;
