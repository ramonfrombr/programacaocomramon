import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { WatchBanner } from "@/app/(dashboard)/(routes)/projects/[courseSlug]/_components/watch-banner";
import { ChaptersBadge } from "@/components/chapters-badge";
const CourseSlugPage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
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
            <ChaptersBadge chaptersLength={course.chapters.length} />
          </div>

          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <p className="text-muted-foreground text-sm mb-5">
            {course.description}
          </p>

          <ul className="flex gap-2">
            {course.categories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <li
                  className="rounded bg-white border font-semibold px-2 text-xs"
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="lg:w-[700px]">
        <WatchBanner courseId={course.id} />
      </div>
    </div>
  );
};

export default CourseSlugPage;
