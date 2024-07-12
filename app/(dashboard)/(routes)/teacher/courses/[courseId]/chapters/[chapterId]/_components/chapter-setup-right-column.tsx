"use client";
import { IconBadge } from "@/components/icon-badge";
import { Chapter } from "@prisma/client";
import { ChapterVideoForm } from "./chapter-video-form";
import { Video } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";

interface ChapterSetupRightColumnProps {
  chapter: Chapter;
  courseId: string;
  chapterId: string;
}
export const ChapterSetupRightColumn = ({
  chapter,
  courseId,
  chapterId,
}: ChapterSetupRightColumnProps) => {
  const language = useLanguageStore().teacherCourseChapterSetup;

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <IconBadge icon={Video} />
        <h2 className="text-xl">{language.addAVideo}</h2>
      </div>

      <ChapterVideoForm
        initialData={chapter}
        chapterId={chapterId}
        courseId={courseId}
      />
    </div>
  );
};
