import { db } from "@/lib/db";

type CoursePreview = {
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
};

type GetCourse = {
    courseId: string | undefined;
};

export const getCourse = async ({
    courseId,
}: GetCourse): Promise<CoursePreview | null> => {
    try {
        if (!courseId) return null;

        const course = await db.course.findFirst({
            where: {
                isPublished: true,
                id: courseId,
            },
            select: {
                price: true,
                title: true,
                description: true,
                imageUrl: true,
            },
        });

        return course;
    } catch (error) {
        console.log("[GET_COURSE]", error);
        return null;
    }
};
