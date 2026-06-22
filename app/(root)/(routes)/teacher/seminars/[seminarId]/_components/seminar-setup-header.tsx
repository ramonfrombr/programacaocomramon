"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Seminar } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { SeminarActions } from "@/app/(root)/(routes)/teacher/seminars/[seminarId]/_components/seminar-actions";

interface SeminarSetupHeaderProps {
    seminar: Seminar;
    seminarId: string;
    completionText: string;
    isComplete: boolean;
}

export const SeminarSetupHeader = ({
    seminar,
    seminarId,
    completionText,
    isComplete,
}: SeminarSetupHeaderProps) => {
    const language = useLanguageStore().teacherSeminarSetup;

    return (
        <>
            {!seminar.isPublished && (
                <Banner
                    variant="warning"
                    label={language.thisSeminarIsUnpublished}
                />
            )}
            <div className="flex items-center justify-between p-6">
                <div className="w-full">
                    <Link
                        href="/teacher/seminars"
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {language.backToSeminars}
                    </Link>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                {language.seminarSetup}
                            </h1>
                            <span className="text-sm text-slate-700">
                                {language.completeAllFields} {completionText}
                            </span>
                        </div>

                        <SeminarActions
                            disabled={!isComplete}
                            seminarId={seminarId}
                            isPublished={seminar.isPublished}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
