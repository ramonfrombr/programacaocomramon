"use client";

import { Seminar, MuxData } from "@prisma/client";
import { LayoutDashboard, Video } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { SeminarTitleForm } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-title-form";
import { SeminarDescriptionForm } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-description-form";
import { SeminarImageForm } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-image-form";
import { SeminarVideoForm } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-video-form";

interface SeminarSetupContentProps {
    seminar: Seminar & { muxData?: MuxData | null };
    seminarId: string;
}

export const SeminarSetupContent = ({
    seminar,
    seminarId,
}: SeminarSetupContentProps) => {
    const language = useLanguageStore().teacherSeminarSetup;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            {language.customizeYourSeminar}
                        </h2>
                    </div>
                    <SeminarTitleForm
                        initialData={seminar}
                        seminarId={seminarId}
                    />
                    <SeminarDescriptionForm
                        initialData={seminar}
                        seminarId={seminarId}
                    />
                    <SeminarImageForm
                        initialData={seminar}
                        seminarId={seminarId}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={Video} />
                    <h2 className="text-xl">{language.addAVideo}</h2>
                </div>

                <SeminarVideoForm
                    initialData={seminar}
                    seminarId={seminarId}
                />
            </div>
        </div>
    );
};
