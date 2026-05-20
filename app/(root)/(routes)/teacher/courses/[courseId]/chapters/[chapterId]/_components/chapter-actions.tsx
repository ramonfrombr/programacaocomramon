"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const language = useLanguageStore().teacherCourseChapterSetup;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success(language.chapterUnpublished);
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success(language.chapterPublished);
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
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success(language.chapterDeleted);
      router.push(`/teacher/courses/${courseId}`);
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
