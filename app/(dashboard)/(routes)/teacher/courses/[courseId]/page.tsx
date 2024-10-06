import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSetupHeader } from "./_components/course-setup-header";
import { LeftColumn } from "./_components/left-column";
import { RightColumn } from "./_components/right-column";
import { YoutubeRightColumn } from "./_components/youtube-right-column";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const careers = await db.career.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = course.youtube
    ? [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryIDs,
        course.youtubeLink,
      ]
    : [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryIDs,
        course.chapters.some((chapter) => chapter.isPublished),
      ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <CourseSetupHeader
        completionText={completionText}
        isComplete={isComplete}
        courseId={params.courseId}
        isPublished={course.isPublished}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <LeftColumn course={course} categories={categories} careers={careers} />
        {course.youtube ? (
          <YoutubeRightColumn course={course} />
        ) : (
          <RightColumn course={course} />
        )}
      </div>
    </>
  );
};

export default CourseIdPage;
