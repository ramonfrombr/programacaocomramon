import { Category, Interview, MuxData } from "@prisma/client";
import { db } from "@/lib/db";

interface GetInterviewProps {
  userId: string | null;
  interviewId: string;
}

type InterviewWithCategories = Interview & {
  categories: Category[];
};

type GetInterviewResult = {
  interview: InterviewWithCategories | null;
  muxData: MuxData | null;
};

export const getInterview = async ({
  userId,
  interviewId,
}: GetInterviewProps): Promise<GetInterviewResult> => {
  try {
    const interview = await db.interview.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        muxData: true,
        categories: true,
      },
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    const canAccess = interview.isPublished && !!userId;

    if (!canAccess) {
      return {
        interview: null,
        muxData: null,
      };
    }

    return {
      interview,
      muxData: interview.muxData,
    };
  } catch (error) {
    console.log("[GET_INTERVIEW]", error);

    return {
      interview: null,
      muxData: null,
    };
  }
};
