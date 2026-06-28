import { Category, Challenge, MuxData } from "@prisma/client";

import { db } from "@/lib/db";
import { hasDiamondAccess } from "@/lib/membership";

interface GetChallengeProps {
  userId: string | null;
  challengeId: string;
}

type ChallengeWithCategories = Challenge & {
  categories: Category[];
};

type GetChallengeResult = {
  challenge: ChallengeWithCategories | null;
  muxData: MuxData | null;
};

export const getChallenge = async ({
  userId,
  challengeId,
}: GetChallengeProps): Promise<GetChallengeResult> => {
  try {
    const challenge = await db.challenge.findUnique({
      where: {
        id: challengeId,
      },
      include: {
        muxData: true,
        categories: true,
      },
    });

    if (!challenge) {
      throw new Error("Challenge not found");
    }

    if (!userId) {
      return {
        challenge: null,
        muxData: null,
      };
    }

    const canAccess =
      challenge.isPublished && (await hasDiamondAccess(userId));

    if (!canAccess) {
      return {
        challenge: null,
        muxData: null,
      };
    }

    return {
      challenge,
      muxData: challenge.muxData,
    };
  } catch (error) {
    console.log("[GET_CHALLENGE]", error);

    return {
      challenge: null,
      muxData: null,
    };
  }
};
