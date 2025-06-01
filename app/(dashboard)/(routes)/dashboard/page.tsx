import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCards } from "@/app/(dashboard)/(routes)/dashboard/_components/info-cards";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCards
          numberOfCoursesInProgress={coursesInProgress.length}
          numberOfCompletedCourses={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
