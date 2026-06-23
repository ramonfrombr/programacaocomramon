import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
import { db } from "@/lib/db";
import { ChallengeSetupHeader } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-setup-header";
import { ChallengeSetupContent } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-setup-content";

const ChallengeIdPage = async ({
    params,
}: {
    params: { challengeId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const challenge = await db.challenge.findUnique({
        where: { id: params.challengeId, userId },
        include: {
            muxData: true,
        },
    });

    const categories = await db.category.findMany({
        where: {
            kind: CategoryKind.CHALLENGE,
        },
        orderBy: {
            name: "asc",
        },
    });

    if (!challenge) {
        return redirect("/");
    }

    const requiredFields = [
        challenge.title,
        challenge.description,
        challenge.imageUrl,
        challenge.videoUrl,
        challenge.muxData,
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
            <ChallengeSetupHeader
                challenge={challenge}
                challengeId={params.challengeId}
                completionText={completionText}
                isComplete={isComplete}
            />

            <ChallengeSetupContent
                challenge={challenge}
                challengeId={params.challengeId}
                categoryOptions={categoryOptions}
            />
        </>
    );
};

export default ChallengeIdPage;
