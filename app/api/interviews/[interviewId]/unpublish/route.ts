import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { interviewId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownInterview = await db.interview.findUnique({
            where: {
                id: params.interviewId,
                userId,
            },
        });

        if (!ownInterview) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedInterview = await db.interview.update({
            where: {
                id: params.interviewId,
            },
            data: {
                isPublished: false,
            },
        });

        return NextResponse.json(unpublishedInterview);
    } catch (error) {
        console.log("[INTERVIEW_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
