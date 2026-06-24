import { Category, Challenge } from "@prisma/client";
import { db } from "@/lib/db";

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

type GetChallenges = {
  title?: string;
};

export const getChallenges = async ({
  title,
}: GetChallenges): Promise<ChallengeWithCategories[]> => {
  try {
    return await db.challenge.findMany({
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
    console.log("[GET_CHALLENGES]", error);
    return [];
  }
};
