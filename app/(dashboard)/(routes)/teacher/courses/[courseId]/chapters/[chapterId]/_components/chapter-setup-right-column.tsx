"use client";
import { Video } from "lucide-react";
import { Chapter } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { ChapterVideoForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/chapter-video-form";

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
