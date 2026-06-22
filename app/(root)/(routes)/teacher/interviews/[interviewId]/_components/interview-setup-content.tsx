"use client";

import { Interview, MuxData } from "@prisma/client";
import { LayoutDashboard, List, User, Video } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { InterviewTitleForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-title-form";
import { InterviewDescriptionForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-description-form";
import { InterviewImageForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-image-form";
import { InterviewGuestForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-guest-form";
import { InterviewDifficultyForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-difficulty-form";
import { InterviewCategoriesForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-categories-form";
import { InterviewVideoForm } from "@/app/(root)/(routes)/teacher/interviews/[interviewId]/_components/interview-video-form";

interface InterviewSetupContentProps {
    interview: Interview & { muxData?: MuxData | null };
    interviewId: string;
    categoryOptions: { label: string; value: string }[];
}

export const InterviewSetupContent = ({
    interview,
    interviewId,
    categoryOptions,
}: InterviewSetupContentProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            {language.customizeYourInterview}
                        </h2>
                    </div>
                    <InterviewTitleForm
                        initialData={interview}
                        interviewId={interviewId}
                    />
                    <InterviewDescriptionForm
                        initialData={interview}
                        interviewId={interviewId}
                    />
                    <InterviewImageForm
                        initialData={interview}
                        interviewId={interviewId}
                    />
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={User} />
                        <h2 className="text-xl">
                            {language.interviewGuestField.interviewGuest}
                        </h2>
                    </div>
                    <InterviewGuestForm
                        initialData={interview}
                        interviewId={interviewId}
                    />
                </div>

                <div>
                    <InterviewDifficultyForm
                        initialData={interview}
                        interviewId={interviewId}
                    />
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={List} />
                        <h2 className="text-xl">
                            {language.interviewCategoryField.interviewCategory}
                        </h2>
                    </div>
                    <InterviewCategoriesForm
                        initialData={interview}
                        interviewId={interviewId}
                        options={categoryOptions}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={Video} />
                    <h2 className="text-xl">{language.addAVideo}</h2>
                </div>

                <InterviewVideoForm
                    initialData={interview}
                    interviewId={interviewId}
                />
            </div>
        </div>
    );
};
