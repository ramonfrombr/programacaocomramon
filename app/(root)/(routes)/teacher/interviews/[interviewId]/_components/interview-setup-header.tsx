"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Interview } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { InterviewActions } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-actions";

interface InterviewSetupHeaderProps {
    interview: Interview;
    interviewId: string;
    completionText: string;
    isComplete: boolean;
}

export const InterviewSetupHeader = ({
    interview,
    interviewId,
    completionText,
    isComplete,
}: InterviewSetupHeaderProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    return (
        <>
            {!interview.isPublished && (
                <Banner
                    variant="warning"
                    label={language.thisInterviewIsUnpublished}
                />
            )}
            <div className="flex items-center justify-between p-6">
                <div className="w-full">
                    <Link
                        href="/teacher/interviews"
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {language.backToInterviews}
                    </Link>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                {language.interviewSetup}
                            </h1>
                            <span className="text-sm text-slate-700">
                                {language.completeAllFields} {completionText}
                            </span>
                        </div>

                        <InterviewActions
                            disabled={!isComplete}
                            interviewId={interviewId}
                            isPublished={interview.isPublished}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
