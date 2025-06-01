"use client";
import { Chapter } from "@prisma/client";
import { Eye, LayoutDashboard } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { ChapterTitleForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/chapter-title-form";
import { ChapterAccessForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/chapter-access-form";
import { ChapterDescriptionForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/chapter-description-form";

interface ChapterSetupLeftColumnProps {
  chapter: Chapter;
  chapterId: string;
  courseId: string;
}

export const ChapterSetupLeftColumn = ({
  chapter,
  chapterId,
  courseId,
}: ChapterSetupLeftColumnProps) => {
  const language = useLanguageStore().teacherCourseChapterSetup;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">{language.customizeYourChapter}</h2>
        </div>
        <ChapterTitleForm
          initialData={chapter}
          chapterId={chapterId}
          courseId={courseId}
        />
        <ChapterDescriptionForm
          initialData={chapter}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>

      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Eye} />
          <h2 className="text-xl">{language.accessSettings}</h2>
        </div>
        <ChapterAccessForm
          initialData={chapter}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </div>
  );
};
