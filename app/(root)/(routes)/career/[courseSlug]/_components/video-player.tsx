"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/hooks/use-language-store";

interface VideoPlayerProps {
  playbackId: string;
  isLocked: boolean;
}

export const VideoPlayer = ({
  playbackId,
  isLocked,
}: VideoPlayerProps) => {
  const language = useLanguageStore().videoPlayer;
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="w-8 h-8" />
          <p className="text-sm">{language.thisChapterIsLocked}</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          className={cn("w-full", !isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
