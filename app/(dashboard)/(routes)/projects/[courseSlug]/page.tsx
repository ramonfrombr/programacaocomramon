import Image from "next/image";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getProgress } from "@/actions/get-progress";
import { ChaptersBadge } from "@/components/chapters-badge";
import { YoutubeBadge } from "@/components/youtube-badge";
import { CourseProgress } from "@/components/course-progress";
import { YoutubeBanner } from "@/app/(dashboard)/(routes)/projects/[courseSlug]/_components/youtube-banner";
import { StartWatchingBanner } from "@/app/(dashboard)/(routes)/projects/[courseSlug]/_components/start-watch-banner";
import { ContinueWatchingBanner } from "@/app/(dashboard)/(routes)/projects/[courseSlug]/_components/continue-watching-banner";

const CourseSlugPage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const { userId } = auth();

  const course = await db.course.findFirst({
    where: {
      slug: params.courseSlug,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      categories: true,
    },
  });

  const progress = userId ? await getProgress(userId!, course?.id!) : 0;

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="p-7 flex flex-col lg:flex-row gap-7">
      <div className="">
        <div className="mb-7 border rounded-md overflow-hidden">
          <Image
            src={course.imageUrl!}
            width={0}
            height={0}
            sizes="100vw"
            alt={course.title}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="bg-white border p-5 rounded-md">
          <div className="self-start">
            {course.youtube ? (
              <YoutubeBadge />
            ) : (
              <ChaptersBadge chaptersLength={course.chapters.length} />
            )}
          </div>

          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <p className="text-muted-foreground text-sm mb-5">
            {course.description}
          </p>

          <ul className="flex gap-2 mb-4">
            {course.categories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <li
                  className="rounded bg-white border font-semibold px-2 py-1 text-xs"
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
          </ul>

          {!course.youtube && (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          )}
        </div>
      </div>

      <div className="lg:w-[700px]">
        {course.youtube ? (
          <YoutubeBanner youtubeLink={course.youtubeLink!} />
        ) : progress == 0 ? (
          <StartWatchingBanner courseId={course.id} />
        ) : (
          <ContinueWatchingBanner courseId={course.id} />
        )}
      </div>
    </div>
  );
};

export default CourseSlugPage;
