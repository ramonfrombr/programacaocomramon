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

        const seminar = await db.seminar.findUnique({
            where: {
                id: params.seminarId,
                userId,
            },
        });

        const muxData = await db.muxData.findUnique({
            where: {
                seminarId: params.seminarId,
            },
        });

        if (
            !seminar ||
            !muxData ||
            !seminar.title ||
            !seminar.description ||
            !seminar.videoUrl
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedSeminar = await db.seminar.update({
            where: {
                id: params.seminarId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedSeminar);
    } catch (error) {
        console.log("[SEMINAR_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
