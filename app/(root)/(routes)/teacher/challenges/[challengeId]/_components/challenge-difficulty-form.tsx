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
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Challenge, ChallengeDifficulty } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";

interface ChallengeDifficultyFormProps {
    initialData: Challenge;
    challengeId: string;
}

const NONE_VALUE = "";

const formSchema = z.object({
    difficulty: z
        .union([z.nativeEnum(ChallengeDifficulty), z.literal(NONE_VALUE)])
        .transform((value) => (value === NONE_VALUE ? null : value)),
});

export const ChallengeDifficultyForm = ({
    initialData,
    challengeId,
}: ChallengeDifficultyFormProps) => {
    const language = useLanguageStore().teacherChallengeSetup;

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.input<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            difficulty: initialData.difficulty ?? NONE_VALUE,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.input<typeof formSchema>) => {
        try {
            const parsed = formSchema.parse(values);
            await axios.patch(`/api/challenges/${challengeId}`, parsed);
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
                {language.challengeDifficultyField.challengeDifficulty}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>{language.cancel}</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            {language.challengeDifficultyField.editDifficulty}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.difficulty
                        ? language.difficultyLabels[initialData.difficulty]
                        : language.challengeDifficultyField.noDifficulty}
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <select
                                            disabled={isSubmitting}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <option value={NONE_VALUE}>
                                                {
                                                    language
                                                        .challengeDifficultyField
                                                        .noDifficulty
                                                }
                                            </option>
                                            {Object.values(
                                                ChallengeDifficulty
                                            ).map((value) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {
                                                        language
                                                            .difficultyLabels[
                                                            value
                                                        ]
                                                    }
                                                </option>
                                            ))}
                                        </select>
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
