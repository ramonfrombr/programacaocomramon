"use client";
import { LayoutDashboard } from "lucide-react";
import { Level } from "@prisma/client";
import { Attachment, Career, Category, Chapter, Course } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import { ImageForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";
import { LevelForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/level-form";
import { CareersForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/careers-form";
import { CategoriesForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/categories-form";
import { DescriptionForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/description-form";

interface LeftColumnProps {
  course: Course & {
    chapters: Chapter[];
    attachments: Attachment[];
  };
  categories: Category[];
  careers: Career[];
}

export const LeftColumn = ({
  course,
  categories,
  careers,
}: LeftColumnProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  const languageRoot = useLanguageStore();

  const levels = [
    Level.BEGINNER,
    Level.INTERMEDIATE,
    Level.ADVANCED,
    Level.SPECIALIST,
  ];

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <IconBadge icon={LayoutDashboard} />
        <h2 className="text-xl">{language.customizeYourCourse}</h2>
      </div>
      <TitleForm initialData={course} courseId={course.id} />
      <DescriptionForm initialData={course} courseId={course.id} />
      <ImageForm initialData={course} courseId={course.id} />
      <CategoriesForm
        initialData={course}
        courseId={course.id}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
      <LevelForm
        initialData={course}
        courseId={course.id}
        options={levels.map((level) => ({
          label: languageRoot.careersPage.levels[level.toLowerCase() as keyof typeof languageRoot.careersPage.levels],
          value: level,
        }))}
      />
      <CareersForm
        initialData={course}
        courseId={course.id}
        options={careers.map((career) => ({
          label: career.name,
          value: career.id,
        }))}
      />
    </div>
  );
};
