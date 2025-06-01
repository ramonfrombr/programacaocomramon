"use client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Banner } from "@/components/banner";
import { Actions } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/actions";

interface LeftColumnProps {
  completionText: string;
  isComplete: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseSetupHeader = ({
  completionText,
  isComplete,
  courseId,
  isPublished,
}: LeftColumnProps) => {
  const language = useLanguageStore().teacherCourseSetup;

  return (
    <>
      {!isPublished && (
        <Banner variant="warning" label={language.thisCourseIsUnpublished} />
      )}
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">{language.courseSetup}</h1>
          <span className="text-sm text-slate-700">
            {language.completeAllFields} {completionText}
          </span>
        </div>
        <Actions
          disabled={!isComplete}
          courseId={courseId}
          isPublished={isPublished}
        />
      </div>
    </>
  );
};
