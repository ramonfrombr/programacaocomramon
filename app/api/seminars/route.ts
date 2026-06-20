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

        const seminar = await db.seminar.create({
            data: { userId, title },
        });

        return NextResponse.json(seminar);
    } catch (error) {
        console.log("[SEMINARS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
