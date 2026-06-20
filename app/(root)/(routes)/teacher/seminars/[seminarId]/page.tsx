import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SeminarSetupHeader } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-setup-header";
import { SeminarSetupContent } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-setup-content";

const SeminarIdPage = async ({
    params,
}: {
    params: { seminarId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const seminar = await db.seminar.findUnique({
        where: { id: params.seminarId, userId },
        include: {
            muxData: true,
        },
    });

    if (!seminar) {
        return redirect("/");
    }

    const requiredFields = [
        seminar.title,
        seminar.description,
        seminar.imageUrl,
        seminar.videoUrl,
        seminar.muxData,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            <SeminarSetupHeader
                seminar={seminar}
                seminarId={params.seminarId}
                completionText={completionText}
                isComplete={isComplete}
            />

            <SeminarSetupContent
                seminar={seminar}
                seminarId={params.seminarId}
            />
        </>
    );
};

export default SeminarIdPage;
