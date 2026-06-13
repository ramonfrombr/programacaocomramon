"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { SimpleModal } from "@/components/modals/simple-modal";
import thumbnail from "@/public/thumbnail.png";
import { toYoutubeEmbedUrl } from "../_lib/to-youtube-embed-url";

type HeroVideoProps = {
    videoUrl: string;
};

export function HeroVideo({ videoUrl }: HeroVideoProps) {
    const embedUrl = toYoutubeEmbedUrl(videoUrl);

    return (
        <SimpleModal
            trigger={
                <div className="rounded-xl overflow-hidden relative cursor-pointer border shadow-lg hover:shadow-2xl transition">
                    <Image
                        src={thumbnail}
                        height={1080}
                        width={1920}
                        alt="Video thumbnail"
                    />

                    <span className="bg-blue-400 absolute top-[50%] left-[50%] w-[50px] h-[50px] -translate-y-2/4 -translate-x-2/4 rounded-full flex items-center justify-center transition">
                        <Play fill="white" color="white" />
                    </span>
                </div>
            }
        >
            <iframe
                width="100%"
                height="315"
                src={embedUrl}
                title="Sales funnel hero video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </SimpleModal>
    );
}
