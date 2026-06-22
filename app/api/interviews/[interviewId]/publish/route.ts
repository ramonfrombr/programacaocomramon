import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
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

        const interview = await db.interview.findUnique({
            where: {
                id: params.interviewId,
                userId,
            },
        });

        const muxData = await db.muxData.findUnique({
            where: {
                interviewId: params.interviewId,
            },
        });

        if (
            !interview ||
            !muxData ||
            !interview.title ||
            !interview.description ||
            !interview.imageUrl ||
            !interview.videoUrl ||
            !interview.guestName ||
            !interview.guestCompany ||
            !interview.guestRole ||
            !interview.difficulty ||
            interview.categoryIDs.length < 1
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const interviewCategories = await db.category.findMany({
            where: {
                id: { in: interview.categoryIDs },
                kind: CategoryKind.INTERVIEW,
            },
        });

        if (interviewCategories.length < 1) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedInterview = await db.interview.update({
            where: {
                id: params.interviewId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedInterview);
    } catch (error) {
        console.log("[INTERVIEW_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
