"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InterviewActionsProps {
    disabled: boolean;
    interviewId: string;
    isPublished: boolean;
}

export const InterviewActions = ({
    disabled,
    interviewId,
    isPublished,
}: InterviewActionsProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/interviews/${interviewId}/unpublish`);
                toast.success(language.interviewUnpublished);
            } else {
                await axios.patch(`/api/interviews/${interviewId}/publish`);
                toast.success(language.interviewPublished);
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
            await axios.delete(`/api/interviews/${interviewId}`);
            toast.success(language.interviewDeleted);
            router.push("/teacher/interviews");
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
