import { Category, Mentorship, MuxData } from "@prisma/client";

import { db } from "@/lib/db";
import { hasGoldOrDiamondAccess } from "@/lib/membership";

interface GetMentorshipProps {
  userId: string | null;
  mentorshipId: string;
}

type MentorshipWithCategories = Mentorship & {
  categories: Category[];
};

type GetMentorshipResult = {
  mentorship: MentorshipWithCategories | null;
  muxData: MuxData | null;
};

export const getMentorship = async ({
  userId,
  mentorshipId,
}: GetMentorshipProps): Promise<GetMentorshipResult> => {
  try {
    const mentorship = await db.mentorship.findUnique({
      where: {
        id: mentorshipId,
      },
      include: {
        muxData: true,
        categories: true,
      },
    });

    if (!mentorship) {
      throw new Error("Mentorship not found");
    }

    if (!userId) {
      return {
        mentorship: null,
        muxData: null,
      };
    }

    const canAccess =
      mentorship.isPublished && (await hasGoldOrDiamondAccess(userId));

    if (!canAccess) {
      return {
        mentorship: null,
        muxData: null,
      };
    }

    return {
      mentorship,
      muxData: mentorship.muxData,
    };
  } catch (error) {
    console.log("[GET_MENTORSHIP]", error);

    return {
      mentorship: null,
      muxData: null,
    };
  }
};
