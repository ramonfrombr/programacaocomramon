"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface MentorshipActionsProps {
    disabled: boolean;
    mentorshipId: string;
    isPublished: boolean;
}

export const MentorshipActions = ({
    disabled,
    mentorshipId,
    isPublished,
}: MentorshipActionsProps) => {
    const language = useLanguageStore().teacherMentorshipSetup;
    const sidebar = useLanguageStore().sidebar;
    const mentorshipsHref = `/${sidebar.teacherURL}/${sidebar.mentorshipsURL}`;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(
                    `/api/mentorships/${mentorshipId}/unpublish`
                );
                toast.success(language.mentorshipUnpublished);
            } else {
                await axios.patch(`/api/mentorships/${mentorshipId}/publish`);
                toast.success(language.mentorshipPublished);
            }

            router.refresh();
        } catch {
            toast.error(language.somethingWentWrong);
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/mentorships/${mentorshipId}`);
            toast.success(language.mentorshipDeleted);
            router.push(mentorshipsHref);
            router.refresh();
        } catch {
            toast.error(language.somethingWentWrong);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? language.unpublish : language.publish}
            </Button>

            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};
