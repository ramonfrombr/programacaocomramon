import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { getActiveMembership } from "@/lib/membership";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  categories: Category[];
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

const courseInclude = {
  categories: true,
  chapters: {
    where: {
      isPublished: true,
    },
  },
} as const;

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const activeMembership = await getActiveMembership(userId);

    let courses: CourseWithProgressWithCategory[];

    if (activeMembership) {
      courses = (await db.course.findMany({
        where: {
          isPublished: true,
        },
        include: courseInclude,
        orderBy: {
          position: "asc",
        },
      })) as CourseWithProgressWithCategory[];
    } else {
      const purchasedCourses = await db.purchase.findMany({
        where: {
          userId: userId,
        },
        select: {
          course: {
            include: courseInclude,
          },
        },
      });

      courses = purchasedCourses.map(
        (purchase) => purchase.course
      ) as CourseWithProgressWithCategory[];
    }

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
