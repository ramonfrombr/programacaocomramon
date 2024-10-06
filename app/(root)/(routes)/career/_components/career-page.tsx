import { StaticImageData } from "next/image";
import Header from "./header";
import CoursesSection from "./courses-section";
import { db } from "@/lib/db";
import { Level } from "@prisma/client";

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
          bgColor="bg-slate-800"
          color="text-slate-800"
          heading="Iniciante"
          courses={courses.beginner}
        />
      )}

      {!!courses.intermediate.length && (
        <CoursesSection
          bgColor="bg-blue-700"
          color="text-blue-700"
          heading="Intermediário"
          courses={courses.intermediate}
        />
      )}

      {!!courses.advanced.length && (
        <CoursesSection
          bgColor="bg-emerald-600"
          color="text-emerald-600"
          heading="Avançado"
          courses={courses.intermediate}
        />
      )}

      {!!courses.specialist.length && (
        <CoursesSection
          bgColor="bg-violet-700"
          color="text-violet-700"
          heading="Especialista"
          courses={courses.specialist}
        />
      )}
    </div>
  );
};

export default CareerPage;
