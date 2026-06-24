"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChallengeActionsProps {
    disabled: boolean;
    challengeId: string;
    isPublished: boolean;
}

export const ChallengeActions = ({
    disabled,
    challengeId,
    isPublished,
}: ChallengeActionsProps) => {
    const language = useLanguageStore().teacherChallengeSetup;
    const sidebar = useLanguageStore().sidebar;
    const challengesHref = `/${sidebar.teacherURL}/${sidebar.challengesURL}`;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/challenges/${challengeId}/unpublish`);
                toast.success(language.challengeUnpublished);
            } else {
                await axios.patch(`/api/challenges/${challengeId}/publish`);
                toast.success(language.challengePublished);
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
            await axios.delete(`/api/challenges/${challengeId}`);
            toast.success(language.challengeDeleted);
            router.push(challengesHref);
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
