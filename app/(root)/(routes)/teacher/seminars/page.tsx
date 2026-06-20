import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { columns } from "@/app/(root)/(routes)/teacher/seminars/_components/columns";
import { DataTable } from "@/app/(root)/(routes)/teacher/seminars/_components/data-table";

const SeminarsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const seminars = await db.seminar.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={seminars} />
        </div>
    );
};

export default SeminarsPage;
