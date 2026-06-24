import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { challengeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const challenge = await db.challenge.findUnique({
            where: {
                id: params.challengeId,
                userId,
            },
        });

        const muxData = await db.muxData.findUnique({
            where: {
                challengeId: params.challengeId,
            },
        });

        if (
            !challenge ||
            !muxData ||
            !challenge.title ||
            !challenge.description ||
            !challenge.imageUrl ||
            !challenge.videoUrl
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChallenge = await db.challenge.update({
            where: {
                id: params.challengeId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedChallenge);
    } catch (error) {
        console.log("[CHALLENGE_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
