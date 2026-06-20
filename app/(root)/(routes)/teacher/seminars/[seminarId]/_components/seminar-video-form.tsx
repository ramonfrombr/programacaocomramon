"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Seminar, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";
import { useLanguageStore } from "@/hooks/use-language-store";

interface SeminarVideoFormProps {
    initialData: Seminar & { muxData?: MuxData | null };
    seminarId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const SeminarVideoForm = ({
    initialData,
    seminarId,
}: SeminarVideoFormProps) => {
    const language = useLanguageStore().teacherSeminarSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/seminars/${seminarId}`, values);
            toast.success(language.seminarUpdated);
            toggleEdit();
            router.refresh();
        } catch {
            toast.error(language.somethingWentWrong);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 roudned-md p-4">
            <div className="font-medium flex items-center justify-between">
                {language.seminarVideoField.seminarVideo}
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
                            {language.seminarVideoField.editVideo}
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
                        endpoint="seminarVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        {language.seminarVideoField.uploadThisSeminarsVideo}
                    </div>
                </div>
            )}

            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    {language.seminarVideoField.videosCanTakeAFewMinutesToProcess}
                </div>
            )}
        </div>
    );
};
