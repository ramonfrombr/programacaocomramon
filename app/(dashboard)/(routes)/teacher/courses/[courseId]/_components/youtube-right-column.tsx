"use client";
import { Video } from "lucide-react";
import { Course } from "@prisma/client";
import { IconBadge } from "@/components/icon-badge";
import { YoutubeLinkForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/youtube-link-form";
import { useLanguageStore } from "@/hooks/use-language-store";

interface YoutubeRightColumnProps {
  course: Course;
}

export const YoutubeRightColumn = ({ course }: YoutubeRightColumnProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Video} />
          <h2 className="text-xl">{language.courseYoutubeLink.courseYoutubeLink}</h2>
        </div>
        <YoutubeLinkForm initialData={course} courseId={course.id} />
      </div>
    </div>
  );
};
