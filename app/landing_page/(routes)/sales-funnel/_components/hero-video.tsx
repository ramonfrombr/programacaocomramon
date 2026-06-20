"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import thumbnail from "@/public/thumbnail.png";
import { toYoutubeEmbedUrl } from "../_lib/to-youtube-embed-url";

type HeroVideoProps = {
    videoUrl: string;
};

export function HeroVideo({ videoUrl }: HeroVideoProps) {
    const embedUrl = toYoutubeEmbedUrl(videoUrl);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label="Play promotional video"
                    className="w-full rounded-xl overflow-hidden relative cursor-pointer border shadow-lg hover:shadow-2xl transition text-left"
                >
                    <Image
                        src={thumbnail}
                        height={1080}
                        width={1920}
                        alt=""
                        aria-hidden
                    />

                    <span
                        aria-hidden
                        className="bg-blue-400 absolute top-[50%] left-[50%] w-[50px] h-[50px] -translate-y-2/4 -translate-x-2/4 rounded-full flex items-center justify-center transition pointer-events-none"
                    >
                        <Play fill="white" color="white" />
                    </span>
                </button>
            </DialogTrigger>

            <DialogContent className="p-1">
                <iframe
                    width="100%"
                    height="315"
                    src={embedUrl}
                    title="Sales funnel hero video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </DialogContent>
        </Dialog>
    );
}
