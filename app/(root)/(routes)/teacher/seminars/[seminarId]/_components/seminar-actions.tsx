"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SeminarActionsProps {
    disabled: boolean;
    seminarId: string;
    isPublished: boolean;
}

export const SeminarActions = ({
    disabled,
    seminarId,
    isPublished,
}: SeminarActionsProps) => {
    const language = useLanguageStore().teacherSeminarSetup;
    const sidebar = useLanguageStore().sidebar;
    const seminarsHref = `/${sidebar.teacherURL}/${sidebar.seminarsURL}`;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/seminars/${seminarId}/unpublish`);
                toast.success(language.seminarUnpublished);
            } else {
                await axios.patch(`/api/seminars/${seminarId}/publish`);
                toast.success(language.seminarPublished);
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
            await axios.delete(`/api/seminars/${seminarId}`);
            toast.success(language.seminarDeleted);
            router.push(seminarsHref);
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
