import { Seminar } from "@prisma/client";
import { db } from "@/lib/db";

type GetSeminars = {
  title?: string;
};

export const getSeminars = async ({
  title,
}: GetSeminars): Promise<Seminar[]> => {
  try {
    return await db.seminar.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log("[GET_SEMINARS]", error);
    return [];
  }
};
