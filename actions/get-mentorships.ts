import { Category, Mentorship } from "@prisma/client";
import { db } from "@/lib/db";

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

type GetMentorships = {
  title?: string;
};

export const getMentorships = async ({
  title,
}: GetMentorships): Promise<MentorshipWithCategories[]> => {
  try {
    return await db.mentorship.findMany({
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
    console.log("[GET_MENTORSHIPS]", error);
    return [];
  }
};
