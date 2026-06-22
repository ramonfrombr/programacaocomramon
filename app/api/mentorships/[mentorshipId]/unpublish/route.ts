import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
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

        const ownMentorship = await db.mentorship.findUnique({
            where: {
                id: params.mentorshipId,
                userId,
            },
        });

        if (!ownMentorship) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedMentorship = await db.mentorship.update({
            where: {
                id: params.mentorshipId,
            },
            data: {
                isPublished: false,
            },
        });

        return NextResponse.json(unpublishedMentorship);
    } catch (error) {
        console.log("[MENTORSHIP_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
