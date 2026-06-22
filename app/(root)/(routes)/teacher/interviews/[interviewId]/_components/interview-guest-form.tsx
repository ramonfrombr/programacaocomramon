"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Interview } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";

interface InterviewGuestFormProps {
    initialData: Interview;
    interviewId: string;
}

const formSchema = z.object({
    guestName: z.string().min(1),
    guestCompany: z.string().min(1),
    guestRole: z.string().min(1),
});

export const InterviewGuestForm = ({
    initialData,
    interviewId,
}: InterviewGuestFormProps) => {
    const language = useLanguageStore().teacherInterviewSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guestName: initialData.guestName || "",
            guestCompany: initialData.guestCompany || "",
            guestRole: initialData.guestRole || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

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

    const hasGuestInfo =
        initialData.guestName &&
        initialData.guestCompany &&
        initialData.guestRole;

    return (
        <div className="mt-6 border bg-slate-100 roudned-md p-4">
            <div className="font-medium flex items-center justify-between">
                {language.interviewGuestField.interviewGuest}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>{language.cancel}</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            {language.interviewGuestField.editGuest}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div
                    className={cn(
                        "text-sm mt-2 space-y-1",
                        !hasGuestInfo && "text-slate-500 italic"
                    )}
                >
                    {!hasGuestInfo && language.interviewGuestField.noGuest}
                    {hasGuestInfo && (
                        <>
                            <p>
                                <span className="font-medium">
                                    {language.interviewGuestField.guestName}:
                                </span>{" "}
                                {initialData.guestName}
                            </p>
                            <p>
                                <span className="font-medium">
                                    {language.interviewGuestField.guestCompany}:
                                </span>{" "}
                                {initialData.guestCompany}
                            </p>
                            <p>
                                <span className="font-medium">
                                    {language.interviewGuestField.guestRole}:
                                </span>{" "}
                                {initialData.guestRole}
                            </p>
                        </>
                    )}
                </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="guestName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {language.interviewGuestField.guestName}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder={
                                                language.interviewGuestField
                                                    .guestNamePlaceholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestCompany"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {
                                            language.interviewGuestField
                                                .guestCompany
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder={
                                                language.interviewGuestField
                                                    .guestCompanyPlaceholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestRole"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {language.interviewGuestField.guestRole}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder={
                                                language.interviewGuestField
                                                    .guestRolePlaceholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                {language.save}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
