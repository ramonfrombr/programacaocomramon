"use client";

import Image from "next/image";
import Link from "next/link";
import { InterviewDifficulty } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguageStore } from "@/hooks/use-language-store";

interface InterviewCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  guestName: string;
  difficulty: InterviewDifficulty;
}

export const InterviewCard = ({
  id,
  title,
  description,
  imageUrl,
  guestName,
  difficulty,
}: InterviewCardProps) => {
  const language = useLanguageStore();
  const interviewsLanguage = language.interviews;
  const difficultyLabel =
    language.teacherInterviewSetup.difficultyLabels[difficulty];

  const plainDescription = description?.replace(/<[^>]+>/g, "").trim();

  return (
    <Link href={`/${interviewsLanguage.watchInterviewURL}/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full flex flex-col">
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          {imageUrl ? (
            <Image
              fill
              className="object-cover"
              alt={title}
              src={imageUrl}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-between p-5 bg-white">
          <div>
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 mb-2">
              {title}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{guestName}</span>
              <Badge variant="secondary" className="text-xs">
                {difficultyLabel}
              </Badge>
            </div>
            {plainDescription ? (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {plainDescription}
              </p>
            ) : null}
          </div>
          <span className="text-sm font-medium text-sky-700">
            {interviewsLanguage.watch}
          </span>
        </div>
      </div>
    </Link>
  );
};
