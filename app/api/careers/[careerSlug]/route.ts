import { db } from "@/lib/db";
import { Level } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { careerSlug: string } }) {
  try {
    const career = await db.career.findFirst({
      where: {
        slug: params.careerSlug
      },
    });

    const beginnerCourses = await db.course.findMany({
      where: {
        level: Level.BEGINNER,
        isPublished: true,
        careerIDs: {
          has: career!.id,
        },
      },
    });

    const intermediateCourses = await db.course.findMany({
      where: {
        level: Level.INTERMEDIATE,
        isPublished: true,
        careerIDs: {
          has: career!.id,
        },
      },
    });

    const advancedCourses = await db.course.findMany({
      where: {
        level: Level.ADVANCED,
        isPublished: true,
        careerIDs: {
          has: career!.id,
        },
      },
    });

    const specialistCourses = await db.course.findMany({
      where: {
        level: Level.SPECIALIST,
        isPublished: true,
        careerIDs: {
          has: career!.id,
        },
      },
    });

    const courses = {
      career: career,
      beginner: beginnerCourses,
      intermediate: intermediateCourses,
      advanced: advancedCourses,
      specialist: specialistCourses,
    };

    return NextResponse.json(courses);
  } catch (error) {
    console.log("[CAREERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
