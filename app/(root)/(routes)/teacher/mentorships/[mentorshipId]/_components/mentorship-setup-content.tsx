"use client";

import { Mentorship, MuxData } from "@prisma/client";
import { LayoutDashboard, List, Video } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { MentorshipTitleForm } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-title-form";
import { MentorshipDescriptionForm } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-description-form";
import { MentorshipImageForm } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-image-form";
import { MentorshipCategoriesForm } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-categories-form";
import { MentorshipVideoForm } from "@/app/(root)/(routes)/teacher/mentorships/[mentorshipId]/_components/mentorship-video-form";

interface MentorshipSetupContentProps {
    mentorship: Mentorship & { muxData?: MuxData | null };
    mentorshipId: string;
    categoryOptions: { label: string; value: string }[];
}

export const MentorshipSetupContent = ({
    mentorship,
    mentorshipId,
    categoryOptions,
}: MentorshipSetupContentProps) => {
    const language = useLanguageStore().teacherMentorshipSetup;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            {language.customizeYourMentorship}
                        </h2>
                    </div>
                    <MentorshipTitleForm
                        initialData={mentorship}
                        mentorshipId={mentorshipId}
                    />
                    <MentorshipDescriptionForm
                        initialData={mentorship}
                        mentorshipId={mentorshipId}
                    />
                    <MentorshipImageForm
                        initialData={mentorship}
                        mentorshipId={mentorshipId}
                    />
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={List} />
                        <h2 className="text-xl">
                            {
                                language.mentorshipCategoryField
                                    .mentorshipCategory
                            }
                        </h2>
                    </div>
                    <MentorshipCategoriesForm
                        initialData={mentorship}
                        mentorshipId={mentorshipId}
                        options={categoryOptions}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={Video} />
                    <h2 className="text-xl">{language.addAVideo}</h2>
                </div>

                <MentorshipVideoForm
                    initialData={mentorship}
                    mentorshipId={mentorshipId}
                />
            </div>
        </div>
    );
};
