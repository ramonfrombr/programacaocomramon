import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { columns } from "@/app/(root)/(routes)/teacher/interviews/_components/columns";
import { DataTable } from "@/app/(root)/(routes)/teacher/interviews/_components/data-table";

const InterviewsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const interviews = await db.interview.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={interviews} />
        </div>
    );
};

export default InterviewsPage;
