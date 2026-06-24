"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Mentorship } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { MentorshipActions } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-actions";

interface MentorshipSetupHeaderProps {
    mentorship: Mentorship;
    mentorshipId: string;
    completionText: string;
    isComplete: boolean;
}

export const MentorshipSetupHeader = ({
    mentorship,
    mentorshipId,
    completionText,
    isComplete,
}: MentorshipSetupHeaderProps) => {
    const language = useLanguageStore().teacherMentorshipSetup;
    const sidebar = useLanguageStore().sidebar;
    const mentorshipsHref = `/${sidebar.teacherURL}/${sidebar.mentorshipsURL}`;

    return (
        <>
            {!mentorship.isPublished && (
                <Banner
                    variant="warning"
                    label={language.thisMentorshipIsUnpublished}
                />
            )}
            <div className="flex items-center justify-between p-6">
                <div className="w-full">
                    <Link
                        href={mentorshipsHref}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {language.backToMentorships}
                    </Link>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                {language.mentorshipSetup}
                            </h1>
                            <span className="text-sm text-slate-700">
                                {language.completeAllFields} {completionText}
                            </span>
                        </div>

                        <MentorshipActions
                            disabled={!isComplete}
                            mentorshipId={mentorshipId}
                            isPublished={mentorship.isPublished}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
