"use client";
import { IconBadge } from "@/components/icon-badge";
import { Attachment, Career, Category, Chapter, Course } from "@prisma/client";
import { LayoutDashboard } from "lucide-react";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { ImageForm } from "./image-form";
import { useLanguageStore } from "@/hooks/use-language-store";
import { CategoriesForm } from "./categories-form";
import { Level } from "@prisma/client";
import { LevelForm } from "./level-form";
import { CareersForm } from "./careers-form";

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
          label: level,
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
