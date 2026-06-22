import { Category, Interview } from "@prisma/client";
import { db } from "@/lib/db";

type InterviewWithCategories = Interview & {
  categories: Category[];
};

type GetInterviews = {
  title?: string;
};

export const getInterviews = async ({
  title,
}: GetInterviews): Promise<InterviewWithCategories[]> => {
  try {
    return await db.interview.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log("[GET_INTERVIEWS]", error);
    return [];
  }
};
