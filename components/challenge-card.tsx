"use client";

import Image from "next/image";
import Link from "next/link";
import { ChallengeDifficulty } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguageStore } from "@/hooks/use-language-store";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  difficulty: ChallengeDifficulty | null;
}

export const ChallengeCard = ({
  id,
  title,
  description,
  imageUrl,
  difficulty,
}: ChallengeCardProps) => {
  const language = useLanguageStore();
  const challengesLanguage = language.challenges;
  const difficultyLabel = difficulty
    ? language.teacherChallengeSetup.difficultyLabels[difficulty]
    : null;

  const plainDescription = description?.replace(/<[^>]+>/g, "").trim();

  return (
    <Link href={`/${challengesLanguage.watchChallengeURL}/${id}`}>
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
            {difficultyLabel ? (
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {difficultyLabel}
                </Badge>
              </div>
            ) : null}
            {plainDescription ? (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {plainDescription}
              </p>
            ) : null}
          </div>
          <span className="text-sm font-medium text-sky-700">
            {challengesLanguage.watch}
          </span>
        </div>
      </div>
    </Link>
  );
};
