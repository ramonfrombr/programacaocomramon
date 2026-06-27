import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { getActiveMembership } from "@/lib/membership";
import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  categories: Category[] | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string | null;
  title?: string;
  categoryId: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const activeMembership = userId ? await getActiveMembership(userId) : null;

    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryIDs: categoryId
          ? {
              has: categoryId,
            }
          : { isEmpty: false },
      },
      include: {
        categories: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId: userId || undefined,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const hasAccess =
            activeMembership !== null || course.purchases.length > 0;

          if (!hasAccess) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = userId
            ? await getProgress(userId, course.id)
            : null;

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
