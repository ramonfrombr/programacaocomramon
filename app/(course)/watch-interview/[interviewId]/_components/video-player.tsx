"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewVideoPlayerProps {
  playbackId: string;
  title: string;
}

export const InterviewVideoPlayer = ({
  playbackId,
  title,
}: InterviewVideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn("overflow-x-hidden", !isReady && "hidden")}
        onCanPlay={() => setIsReady(true)}
        autoPlay
        playbackId={playbackId}
        streamType="on-demand"
        playsInline
        preferPlayback="mse"
      />
    </div>
  );
};
