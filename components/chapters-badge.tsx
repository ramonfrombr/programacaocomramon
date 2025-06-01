"use client";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { useLanguageStore } from "@/hooks/use-language-store";

export const ChaptersBadge = ({
  chaptersLength,
}: {
  chaptersLength: number;
}) => {
  const language = useLanguageStore().dashboard;

  return (
    <div className="flex items-center gap-x-1 text-slate-500 text-sm md:text-xs mb-2">
      <span className="text-sky-600 font-semibold bg-sky-100 flex items-center rounded-md px-1">
        <IconBadge size="sm" icon={BookOpen} />
        {chaptersLength}{" "}
        {chaptersLength === 1 ? language.chapter : language.chapters}
      </span>
    </div>
  );
};
