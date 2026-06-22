import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
import { db } from "@/lib/db";
import { InterviewSetupHeader } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-setup-header";
import { InterviewSetupContent } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-setup-content";

const InterviewIdPage = async ({
    params,
}: {
    params: { interviewId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const interview = await db.interview.findUnique({
        where: { id: params.interviewId, userId },
        include: {
            muxData: true,
        },
    });

    const categories = await db.category.findMany({
        where: {
            kind: CategoryKind.INTERVIEW,
        },
        orderBy: {
            name: "asc",
        },
    });

    if (!interview) {
        return redirect("/");
    }

    const requiredFields = [
        interview.title,
        interview.description,
        interview.imageUrl,
        interview.videoUrl,
        interview.muxData,
        interview.guestName,
        interview.guestCompany,
        interview.guestRole,
        interview.difficulty,
        interview.categoryIDs.length >= 1,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <>
            <InterviewSetupHeader
                interview={interview}
                interviewId={params.interviewId}
                completionText={completionText}
                isComplete={isComplete}
            />

            <InterviewSetupContent
                interview={interview}
                interviewId={params.interviewId}
                categoryOptions={categoryOptions}
            />
        </>
    );
};

export default InterviewIdPage;
