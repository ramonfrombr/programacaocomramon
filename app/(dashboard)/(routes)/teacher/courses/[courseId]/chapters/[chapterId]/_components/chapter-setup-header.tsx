"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Chapter } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { ChapterActions } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/chapter-actions";

interface ChapterSetupHeaderProps {
  chapter: Chapter;
  chapterId: string;
  courseId: string;
  completionText: string;
  isComplete: boolean;
}

export const ChapterSetupHeader = ({
  chapter,
  chapterId,
  courseId,
  completionText,
  isComplete,
}: ChapterSetupHeaderProps) => {
  const language = useLanguageStore().teacherCourseChapterSetup;

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant="warning" label={language.thisChapterIsUnpublished} />
      )}
      <div className="flex items-center justify-between p-6">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language.backToCourse}
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                {language.chapterCreation}
              </h1>
              <span className="text-sm text-slate-700">
                {language.completeAllFields} {completionText}
              </span>
            </div>

            <ChapterActions
              disabled={!isComplete}
              courseId={courseId}
              chapterId={chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>
      </div>
    </>
  );
};
