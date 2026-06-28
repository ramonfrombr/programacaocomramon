import { MuxData, Seminar } from "@prisma/client";

import { db } from "@/lib/db";
import { hasGoldOrDiamondAccess } from "@/lib/membership";
import { isTeacher } from "@/lib/teacher";

interface GetSeminarProps {
  userId: string | null;
  seminarId: string;
}

type GetSeminarResult = {
  seminar: Seminar | null;
  muxData: MuxData | null;
};

export const getSeminar = async ({
  userId,
  seminarId,
}: GetSeminarProps): Promise<GetSeminarResult> => {
  try {
    const seminar = await db.seminar.findUnique({
      where: {
        id: seminarId,
      },
      include: {
        muxData: true,
      },
    });

    if (!seminar) {
      throw new Error("Seminar not found");
    }

    if (!userId) {
      return {
        seminar: null,
        muxData: null,
      };
    }

    const canAccess = seminar.isPublished
      ? await hasGoldOrDiamondAccess(userId)
      : isTeacher(userId);

    if (!canAccess) {
      return {
        seminar: null,
        muxData: null,
      };
    }

    return {
      seminar,
      muxData: seminar.muxData,
    };
  } catch (error) {
    console.log("[GET_SEMINAR]", error);

    return {
      seminar: null,
      muxData: null,
    };
  }
};
