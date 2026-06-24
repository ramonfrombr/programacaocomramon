"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Challenge } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { ChallengeActions } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-actions";

interface ChallengeSetupHeaderProps {
    challenge: Challenge;
    challengeId: string;
    completionText: string;
    isComplete: boolean;
}

export const ChallengeSetupHeader = ({
    challenge,
    challengeId,
    completionText,
    isComplete,
}: ChallengeSetupHeaderProps) => {
    const language = useLanguageStore().teacherChallengeSetup;

    return (
        <>
            {!challenge.isPublished && (
                <Banner
                    variant="warning"
                    label={language.thisChallengeIsUnpublished}
                />
            )}
            <div className="flex items-center justify-between p-6">
                <div className="w-full">
                    <Link
                        href="/teacher/challenges"
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {language.backToChallenges}
                    </Link>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                {language.challengeSetup}
                            </h1>
                            <span className="text-sm text-slate-700">
                                {language.completeAllFields} {completionText}
                            </span>
                        </div>

                        <ChallengeActions
                            disabled={!isComplete}
                            challengeId={challengeId}
                            isPublished={challenge.isPublished}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
