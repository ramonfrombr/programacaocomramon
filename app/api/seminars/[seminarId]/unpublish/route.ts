import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { seminarId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownSeminar = await db.seminar.findUnique({
            where: {
                id: params.seminarId,
                userId,
            },
        });

        if (!ownSeminar) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedSeminar = await db.seminar.update({
            where: {
                id: params.seminarId,
            },
            data: {
                isPublished: false,
            },
        });

        return NextResponse.json(unpublishedSeminar);
    } catch (error) {
        console.log("[SEMINAR_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
