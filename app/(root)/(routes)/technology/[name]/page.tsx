import { db } from '@/lib/db';
import { Level } from '@prisma/client';
import React from 'react'
import HTML from "@/public/programming_languages/html-logo.png";
import CSS from "@/public/programming_languages/css-logo.png";
import JavaScript from "@/public/programming_languages/javascript-logo.png";
import Python from "@/public/programming_languages/python-logo.webp";
import Ruby from "@/public/programming_languages/ruby-logo.png";
import PHP from "@/public/programming_languages/php-logo.png";
import C from "@/public/programming_languages/c-logo.png";
import PostgreSQL from "@/public/programming_languages/postgresql-logo.png";
import MySQL from "@/public/programming_languages/mysql-logo.png";
import MongoDB from "@/public/programming_languages/mongodb-logo.webp";
import Redis from "@/public/programming_languages/redis-logo.webp";
import Header from '../../career/_components/header';
import CoursesSection from '../../career/_components/courses-section';
import LEVELS from '@/constants/levels';

const TechnologyPage = async ({
  params,
}: {
  params: { name: string };
}) => {
  console.log(params.name)
    const technology = await db.category.findFirst({
      where: {
        name: params.name,
      },
    });
  
    const beginnerCourses = await db.course.findMany({
    where: {
      level: Level.BEGINNER,
      isPublished: true,
      categoryIDs: {
          has: technology!.id,
        },
    },
  });

  const intermediateCourses = await db.course.findMany({
    where: {
      level: Level.INTERMEDIATE,
      isPublished: true,
      categoryIDs: {
          has: technology!.id,
        },
    },
  });

  const advancedCourses = await db.course.findMany({
    where: {
      level: Level.ADVANCED,
      isPublished: true,
      categoryIDs: {
          has: technology!.id,
        },
    },
  });

  const specialistCourses = await db.course.findMany({
    where: {
      level: Level.SPECIALIST,
      isPublished: true,
      categoryIDs: {
          has: technology!.id,
        },
    },
  });

  const courses = {
    beginner: beginnerCourses,
    intermediate: intermediateCourses,
    advanced: advancedCourses,
    specialist: specialistCourses,
  };

  const programmingLanguagesImages = {
    "HTML": HTML,
    "CSS": CSS,
    "JavaScript": JavaScript,
    "Python": Python,
    "PHP": PHP,
    "Ruby": Ruby,
    "C": C,
    "PostgreSQL": PostgreSQL,
    "MySQL": MySQL,
    "MongoDB": MongoDB,
    "Redis": Redis,
  }

  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Header heading={params.name} image={programmingLanguagesImages[params.name as keyof typeof programmingLanguagesImages]} description={params.name} />

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
  )
}

export default TechnologyPage