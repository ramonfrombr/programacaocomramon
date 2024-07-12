"use client";
import { IconBadge } from "@/components/icon-badge";
import { Attachment, Category, Chapter, Course } from "@prisma/client";
import { LayoutDashboard } from "lucide-react";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { ImageForm } from "./image-form";
import { CategoryForm } from "./category-form";
import { useLanguageStore } from "@/hooks/use-language-store";

interface LeftColumnProps {
  course: Course & {
    chapters: Chapter[];
    attachments: Attachment[];
  };
  categories: Category[];
}

export const LeftColumn = ({ course, categories }: LeftColumnProps) => {
  const language = useLanguageStore().teacherCourseSetup;

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <IconBadge icon={LayoutDashboard} />
        <h2 className="text-xl">{language.customizeYourCourse}</h2>
      </div>
      <TitleForm initialData={course} courseId={course.id} />
      <DescriptionForm initialData={course} courseId={course.id} />
      <ImageForm initialData={course} courseId={course.id} />
      <CategoryForm
        initialData={course}
        courseId={course.id}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </div>
  );
};
