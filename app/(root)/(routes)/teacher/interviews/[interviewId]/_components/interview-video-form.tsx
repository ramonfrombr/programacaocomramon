"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Interview, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";
import { useLanguageStore } from "@/hooks/use-language-store";

interface InterviewVideoFormProps {
    initialData: Interview & { muxData?: MuxData | null };
    interviewId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const InterviewVideoForm = ({
    initialData,
    interviewId,
}: InterviewVideoFormProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/interviews/${interviewId}`, values);
            toast.success(language.interviewUpdated);
            toggleEdit();
            router.refresh();
        } catch {
            toast.error(language.somethingWentWrong);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 roudned-md p-4">
            <div className="font-medium flex items-center justify-between">
                {language.interviewVideoField.interviewVideo}
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
                            {language.interviewVideoField.editVideo}
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
                        endpoint="interviewVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        {language.interviewVideoField.uploadThisInterviewsVideo}
                    </div>
                </div>
            )}

            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    {
                        language.interviewVideoField
                            .videosCanTakeAFewMinutesToProcess
                    }
                </div>
            )}
        </div>
    );
};
