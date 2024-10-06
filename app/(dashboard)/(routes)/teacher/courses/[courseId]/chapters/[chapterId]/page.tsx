import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ChapterSetupHeader } from "./_components/chapter-setup-header";
import { ChapterSetupLeftColumn } from "./_components/chapter-setup-left-column";
import { ChapterSetupRightColumn } from "./_components/chapter-setup-right-column";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: { id: params.chapterId, courseId: params.courseId },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <ChapterSetupHeader
        chapter={chapter}
        chapterId={params.chapterId}
        courseId={params.courseId}
        completionText={completionText}
        isComplete={isComplete}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ChapterSetupLeftColumn
          chapter={chapter}
          chapterId={params.chapterId}
          courseId={params.courseId}
        />
        <ChapterSetupRightColumn
          chapter={chapter}
          chapterId={params.chapterId}
          courseId={params.courseId}
        />
      </div>
    </>
  );
};

export default ChapterIdPage;
