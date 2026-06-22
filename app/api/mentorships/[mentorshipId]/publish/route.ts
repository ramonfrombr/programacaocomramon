import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { mentorshipId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const mentorship = await db.mentorship.findUnique({
            where: {
                id: params.mentorshipId,
                userId,
            },
        });

        const muxData = await db.muxData.findUnique({
            where: {
                mentorshipId: params.mentorshipId,
            },
        });

        if (
            !mentorship ||
            !muxData ||
            !mentorship.title ||
            !mentorship.description ||
            !mentorship.imageUrl ||
            !mentorship.videoUrl ||
            mentorship.categoryIDs.length < 1
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const mentorshipCategories = await db.category.findMany({
            where: {
                id: { in: mentorship.categoryIDs },
                kind: CategoryKind.MENTORSHIP,
            },
        });

        if (mentorshipCategories.length < 1) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedMentorship = await db.mentorship.update({
            where: {
                id: params.mentorshipId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedMentorship);
    } catch (error) {
        console.log("[MENTORSHIP_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
