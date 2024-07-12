"use client";
import { IconBadge } from "@/components/icon-badge";
import { Eye, LayoutDashboard } from "lucide-react";
import { ChapterTitleForm } from "./chapter-title-form";
import { ChapterDescriptionForm } from "./chapter-description-form";
import { ChapterAccessForm } from "./chapter-access-form";
import { Chapter } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";

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
