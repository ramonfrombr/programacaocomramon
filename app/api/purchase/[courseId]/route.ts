import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: { userId: user.id, courseId: params.courseId },
        },
    });

    return NextResponse.json({ purchased: !!purchase });
}
