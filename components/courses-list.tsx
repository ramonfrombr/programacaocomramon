"use client";
import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card";
import { useLanguageStore } from "@/hooks/use-language-store";

type CourseWithProgressWithCategory = Course & {
  categories: Category[] | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CorusesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CorusesListProps) => {
  const language = useLanguageStore().dashboard;

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            slug={item.slug!}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            categories={[
              ...item?.categories?.map((category) => category.name)!,
            ]}
            youtube={item.youtube}
            level={item.level}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          {language.noCoursesFound}
        </div>
      )}
    </div>
  );
};
