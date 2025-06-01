import { StaticImageData } from "next/image";
import Header from "./header";
import CoursesSection from "./courses-section";
import { db } from "@/lib/db";
import { Level } from "@prisma/client";
import LEVELS from "@/constants/levels";

interface CareerPageProps {
  heading: string;
  image: StaticImageData;
  description: string;
  slug: string;
}

const CareerPage = async ({
  heading,
  image,
  description,
  slug,
}: CareerPageProps) => {
  const career = await db.career.findFirst({
    where: {
      slug: slug,
    },
  });

  const beginnerCourses = await db.course.findMany({
    where: {
      level: Level.BEGINNER,
      isPublished: true,
      careerIDs: {
        has: career!.id,
      },
    },
  });

  const intermediateCourses = await db.course.findMany({
    where: {
      level: Level.INTERMEDIATE,
      isPublished: true,
      careerIDs: {
        has: career!.id,
      },
    },
  });

  const advancedCourses = await db.course.findMany({
    where: {
      level: Level.ADVANCED,
      isPublished: true,
      careerIDs: {
        has: career!.id,
      },
    },
  });

  const specialistCourses = await db.course.findMany({
    where: {
      level: Level.SPECIALIST,
      isPublished: true,
      careerIDs: {
        has: career!.id,
      },
    },
  });

  const courses = {
    beginner: beginnerCourses,
    intermediate: intermediateCourses,
    advanced: advancedCourses,
    specialist: specialistCourses,
  };

  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Header heading={heading} image={image} description={description} />

      {!!courses.beginner.length && (
        <CoursesSection
          courses={courses.beginner}
          level={LEVELS.BEGINNER}
        />
      )}

      {!!courses.intermediate.length && (
        <CoursesSection
          courses={courses.intermediate}
          level={LEVELS.INTERMEDIATE}
        />
      )}

      {!!courses.advanced.length && (
        <CoursesSection
          courses={courses.advanced}
          level={LEVELS.ADVANCED}
        />
      )}

      {!!courses.specialist.length && (
        <CoursesSection
          courses={courses.specialist}
          level={LEVELS.SPECIALIST}
        />
      )}
    </div>
  );
};

export default CareerPage;
