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

        const ownChallenge = await db.challenge.findUnique({
            where: {
                id: params.challengeId,
                userId,
            },
        });

        if (!ownChallenge) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedChallenge = await db.challenge.update({
            where: {
                id: params.challengeId,
            },
            data: {
                isPublished: false,
            },
        });

        return NextResponse.json(unpublishedChallenge);
    } catch (error) {
        console.log("[CHALLENGE_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
