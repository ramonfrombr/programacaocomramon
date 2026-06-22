import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name, kind } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name || kind !== CategoryKind.INTERVIEW) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const existingCategory = await db.category.findFirst({
            where: {
                name,
                kind: CategoryKind.INTERVIEW,
            },
        });

        if (existingCategory) {
            return new NextResponse("Category already exists", { status: 409 });
        }

        const category = await db.category.create({
            data: {
                name,
                kind: CategoryKind.INTERVIEW,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
