"use client";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/use-language-store";
import Link from "next/link";

interface YoutubeBannerProps {
  youtubeLink: string;
}

export const YoutubeBanner = ({ youtubeLink }: YoutubeBannerProps) => {
  const language = useLanguageStore().course;

  return (
    <div className="border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
      <p className="font-bold text-2xl mb-4">{language.onlyOnYoutube}</p>

      <p className="text-sm mb-4">
        {language.thisCourseIsOnlyAvailableOnYoutube}
      </p>

      <Link href={youtubeLink} target="_blank">
        <Button className="w-full bg-white text-black rounded font-semibold text-sm hover:bg-gray-200">
          {language.watchOnYoutube}
        </Button>
      </Link>
    </div>
  );
};
