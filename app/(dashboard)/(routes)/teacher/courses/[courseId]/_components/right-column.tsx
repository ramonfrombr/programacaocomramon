"use client";
import { CircleDollarSign, File, ListChecks } from "lucide-react";
import { Attachment, Chapter, Course } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { PriceForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/price-form";
import { ChaptersForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapters-form";
import { AttachmentForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/attachment-form";

interface RightColumnProps {
  course: Course & {
    chapters: Chapter[];
    attachments: Attachment[];
  };
}

export const RightColumn = ({ course }: RightColumnProps) => {
  const language = useLanguageStore().teacherCourseSetup;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={ListChecks} />
          <h2 className="text-xl">{language.courseChapters}</h2>
        </div>
        <ChaptersForm initialData={course} courseId={course.id} />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={CircleDollarSign} />
          <h2 className="text-xl">{language.sellYourCourse}</h2>
        </div>
        <PriceForm initialData={course} courseId={course.id} />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={File} />
          <h2 className="text-xl">{language.resourcesAndAttachments}</h2>
        </div>
        <AttachmentForm initialData={course} courseId={course.id} />
      </div>
    </div>
  );
};
