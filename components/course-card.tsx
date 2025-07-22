"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { ChaptersBadge } from "@/components/chapters-badge";
import { YoutubeBadge } from "@/components/youtube-badge";
import { useLanguageStore } from "@/hooks/use-language-store";
import { typeLEVELS } from "@/constants/levels";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  categories: string[];
  youtube: boolean | null;
  level: typeLEVELS;
}

export const CourseCard = ({
  title,
  slug,
  imageUrl,
  chaptersLength,
  price,
  progress,
  youtube,
  level
}: CourseCardProps) => {
  const language = useLanguageStore().careersPage;

  const backgroundColors = {
    BEGINNER: 'bg-slate-800',
    INTERMEDIATE: 'bg-blue-700',
    ADVANCED: 'bg-emerald-600',
    SPECIALIST: 'bg-violet-700'
  }
  const bgColor = backgroundColors[level];
  
  const levelHeadings = {
    BEGINNER: language.levels.beginner,
    INTERMEDIATE: language.levels.intermediate,
    ADVANCED: language.levels.advanced,
    SPECIALIST: language.levels.specialist
  }
  const levelHeading = levelHeadings[level];

  return (
    <Link href={`/projects/${slug}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full flex flex-col">
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col flex-1 justify-between p-3 bg-white">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 mb-2">
            {title}
          </div>

          <div className="flex items-center gap-1">

            <div className="flex items-center gap-x-1 text-slate-500 text-sm md:text-xs mb-2">
              <span className={`text-white font-semibold ${bgColor} flex items-center rounded-md px-1`}>{levelHeading}</span>
            </div>

            {youtube ? (
              <YoutubeBadge />
            ) : (
              <ChaptersBadge chaptersLength={chaptersLength} />
            )}

          </div>


          {youtube ? (
            <></>
          ) : progress !== null ? (
            <CourseProgress
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          ) : (
            <span className="text-md md:text-lg font-medium text-black self-start rounded px-1">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
