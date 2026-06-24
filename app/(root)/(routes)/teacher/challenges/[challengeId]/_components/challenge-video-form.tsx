"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Challenge, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";
import { useLanguageStore } from "@/hooks/use-language-store";

interface ChallengeVideoFormProps {
    initialData: Challenge & { muxData?: MuxData | null };
    challengeId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChallengeVideoForm = ({
    initialData,
    challengeId,
}: ChallengeVideoFormProps) => {
    const language = useLanguageStore().teacherChallengeSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/challenges/${challengeId}`, values);
            toast.success(language.challengeUpdated);
            toggleEdit();
            router.refresh();
        } catch {
            toast.error(language.somethingWentWrong);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 roudned-md p-4">
            <div className="font-medium flex items-center justify-between">
                {language.challengeVideoField.challengeVideo}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>{language.cancel}</>}

                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {language.addAVideo}
                        </>
                    )}

                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            {language.challengeVideoField.editVideo}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                ))}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="challengeVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        {language.challengeVideoField.uploadThisChallengesVideo}
                    </div>
                </div>
            )}

            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    {
                        language.challengeVideoField
                            .videosCanTakeAFewMinutesToProcess
                    }
                </div>
            )}
        </div>
    );
};
