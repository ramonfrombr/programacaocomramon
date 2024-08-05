"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { ChaptersBadge } from "./chapters-badge";
import { YoutubeBadge } from "./youtube-badge";

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
}

export const CourseCard = ({
  title,
  slug,
  imageUrl,
  chaptersLength,
  price,
  progress,
  youtube,
}: CourseCardProps) => {
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

          {youtube ? (
            <YoutubeBadge />
          ) : (
            <ChaptersBadge chaptersLength={chaptersLength} />
          )}

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
