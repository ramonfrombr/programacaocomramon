import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { getChapter } from "@/actions/get-chapter";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/video-player";
import { CourseEnrollButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button";
import { CourseProgressButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-progress-button";
import { ChapterBanners } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/chapter-banners";
import { isTeacher } from "@/lib/teacher";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !isTeacher(userId) && !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  const showPurchaseButton: boolean = (!purchase && !isTeacher(userId));

  return (
    <div>
      <ChapterBanners
        isCompleted={userProgress?.isCompleted!}
        isLocked={isLocked}
      />

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        {showPurchaseButton && (
          <div className="p-5">
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          </div>
        )}
        
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

            {purchase && (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
