import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const challenge = await db.challenge.create({
            data: { userId, title },
        });

        return NextResponse.json(challenge);
    } catch (error) {
        console.log("[CHALLENGES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
