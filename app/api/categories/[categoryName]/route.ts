import { db } from "@/lib/db";
import { Level } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { categoryName: string } }) {
  try {
    const technology = await db.category.findFirst({
      where: {
        name: params.categoryName,
      },
    });

    const beginnerCourses = await db.course.findMany({
      where: {
        level: Level.BEGINNER,
        isPublished: true,
        categoryIDs: {
            has: technology!.id,
          },
      },
    });

    const intermediateCourses = await db.course.findMany({
      where: {
        level: Level.INTERMEDIATE,
        isPublished: true,
        categoryIDs: {
            has: technology!.id,
          },
      },
    });

    const advancedCourses = await db.course.findMany({
      where: {
        level: Level.ADVANCED,
        isPublished: true,
        categoryIDs: {
            has: technology!.id,
          },
      },
    });

    const specialistCourses = await db.course.findMany({
      where: {
        level: Level.SPECIALIST,
        isPublished: true,
        categoryIDs: {
            has: technology!.id,
          },
      },
    });

    const courses = {
      category: technology,
      beginner: beginnerCourses,
      intermediate: intermediateCourses,
      advanced: advancedCourses,
      specialist: specialistCourses,
    };

    return NextResponse.json(courses);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
