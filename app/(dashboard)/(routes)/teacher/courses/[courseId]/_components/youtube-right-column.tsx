import { Video } from "lucide-react";
import { Course } from "@prisma/client";
import { IconBadge } from "@/components/icon-badge";
import { YoutubeLinkForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/youtube-link-form";

interface YoutubeRightColumnProps {
  course: Course;
}

export const YoutubeRightColumn = ({ course }: YoutubeRightColumnProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Video} />
          <h2 className="text-xl">YouTube Link</h2>
        </div>
        <YoutubeLinkForm initialData={course} courseId={course.id} />
      </div>
    </div>
  );
};
