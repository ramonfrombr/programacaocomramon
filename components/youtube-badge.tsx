"use client";
import { Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

export const YoutubeBadge = () => {
  return (
    <div className="flex items-center gap-x-1 text-slate-500 text-sm md:text-xs mb-2">
      <span className="text-sky-600 font-semibold bg-sky-100 flex items-center rounded-md px-1">
        <IconBadge size="sm" icon={Video} />
        YouTube
      </span>
    </div>
  );
};
