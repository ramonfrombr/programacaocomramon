import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CategoryKind } from "@prisma/client";
import { db } from "@/lib/db";
import { MentorshipSetupHeader } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-setup-header";
import { MentorshipSetupContent } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-setup-content";

const MentorshipIdPage = async ({
    params,
}: {
    params: { mentorshipId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const mentorship = await db.mentorship.findUnique({
        where: { id: params.mentorshipId, userId },
        include: {
            muxData: true,
        },
    });

    const categories = await db.category.findMany({
        where: {
            kind: CategoryKind.MENTORSHIP,
        },
        orderBy: {
            name: "asc",
        },
    });

    if (!mentorship) {
        return redirect("/");
    }

    const requiredFields = [
        mentorship.title,
        mentorship.description,
        mentorship.imageUrl,
        mentorship.videoUrl,
        mentorship.muxData,
        mentorship.categoryIDs.length >= 1,
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
            <MentorshipSetupHeader
                mentorship={mentorship}
                mentorshipId={params.mentorshipId}
                completionText={completionText}
                isComplete={isComplete}
            />

            <MentorshipSetupContent
                mentorship={mentorship}
                mentorshipId={params.mentorshipId}
                categoryOptions={categoryOptions}
            />
        </>
    );
};

export default MentorshipIdPage;
