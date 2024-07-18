import { Video } from "lucide-react";
import { YoutubeLinkForm } from "./youtube-link-form";
import { IconBadge } from "@/components/icon-badge";
import { Course } from "@prisma/client";

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
