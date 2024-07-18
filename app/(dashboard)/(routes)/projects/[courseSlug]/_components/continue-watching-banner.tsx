"use client";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import Link from "next/link";

interface ContinueWatchingBannerProps {
  courseId: string;
}

export const ContinueWatchingBanner = ({
  courseId,
}: ContinueWatchingBannerProps) => {
  const language = useLanguageStore().course;

  return (
    <div className="border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
      <p className="font-bold text-2xl mb-4">
        {language.continueWhereYouLeftOff}
      </p>

      <p className="text-sm mb-4">
        {language.watchFromTheLastCompletedChapter}
      </p>

      <Link href={`/courses/${courseId}`}>
        <Button className="w-full bg-white text-black rounded font-semibold text-sm hover:bg-gray-200">
          {language.continueWatching}
        </Button>
      </Link>
    </div>
  );
};
