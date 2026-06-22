"use client";

import { useLanguageStore } from "@/hooks/use-language-store";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface MentorshipSidebarItemProps {
  label: string;
  id: string;
}

export const MentorshipSidebarItem = ({
  label,
  id,
}: MentorshipSidebarItemProps) => {
  const language = useLanguageStore().mentorships;
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/${language.watchMentorshipURL}/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <PlayCircle
          size={22}
          className={cn("text-slate-500", isActive && "text-slate-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};
