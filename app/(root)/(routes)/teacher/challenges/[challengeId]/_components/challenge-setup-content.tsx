"use client";

import { Challenge, MuxData } from "@prisma/client";
import { LayoutDashboard, List, Video } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { ChallengeTitleForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-title-form";
import { ChallengeDescriptionForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-description-form";
import { ChallengeImageForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-image-form";
import { ChallengeDifficultyForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-difficulty-form";
import { ChallengeCategoriesForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-categories-form";
import { ChallengeVideoForm } from "@/app/(root)/(routes)/teacher/challenges/[challengeId]/_components/challenge-video-form";

interface ChallengeSetupContentProps {
    challenge: Challenge & { muxData?: MuxData | null };
    challengeId: string;
    categoryOptions: { label: string; value: string }[];
}

export const ChallengeSetupContent = ({
    challenge,
    challengeId,
    categoryOptions,
}: ChallengeSetupContentProps) => {
    const language = useLanguageStore().teacherChallengeSetup;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            {language.customizeYourChallenge}
                        </h2>
                    </div>
                    <ChallengeTitleForm
                        initialData={challenge}
                        challengeId={challengeId}
                    />
                    <ChallengeDescriptionForm
                        initialData={challenge}
                        challengeId={challengeId}
                    />
                    <ChallengeImageForm
                        initialData={challenge}
                        challengeId={challengeId}
                    />
                </div>

                <div>
                    <ChallengeDifficultyForm
                        initialData={challenge}
                        challengeId={challengeId}
                    />
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={List} />
                        <h2 className="text-xl">
                            {language.challengeCategoryField.challengeCategory}
                        </h2>
                    </div>
                    <ChallengeCategoriesForm
                        initialData={challenge}
                        challengeId={challengeId}
                        options={categoryOptions}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={Video} />
                    <h2 className="text-xl">{language.addAVideo}</h2>
                </div>

                <ChallengeVideoForm
                    initialData={challenge}
                    challengeId={challengeId}
                />
            </div>
        </div>
    );
};
