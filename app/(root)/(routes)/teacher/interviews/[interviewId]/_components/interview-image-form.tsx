"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Interview } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { useLanguageStore } from "@/hooks/use-language-store";

interface InterviewImageFormProps {
    initialData: Interview;
    interviewId: string;
}

export const InterviewImageForm = ({
    initialData,
    interviewId,
}: InterviewImageFormProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const formSchema = z.object({
        imageUrl: z.string().min(1, {
            message: language.interviewImageField.imageIsNecessary,
        }),
    });

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
                {language.interviewImageField.interviewImage}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>{language.cancel}</>}

                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {language.interviewImageField.addAnImage}
                        </>
                    )}

                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            {language.interviewImageField.editImage}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                ))}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        {language.interviewImageField.aspectRatioRecommended}
                    </div>
                </div>
            )}
        </div>
    );
};
