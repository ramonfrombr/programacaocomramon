"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryKind, Challenge } from "@prisma/client";
import toast from "react-hot-toast";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle } from "lucide-react";

interface ChallengeCategoriesFormProps {
    initialData: Challenge;
    challengeId: string;
    options: { label: string; value: string }[];
}

export const ChallengeCategoriesForm = ({
    initialData,
    challengeId,
    options,
}: ChallengeCategoriesFormProps) => {
    const language = useLanguageStore().teacherChallengeSetup;
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const formSchema = z.object({
        categoryIDs: z.array(z.string()),
    });

    const addCategorySchema = z.object({
        name: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryIDs: initialData?.categoryIDs || [],
        },
    });

    const addCategoryForm = useForm<z.infer<typeof addCategorySchema>>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
            name: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;
    const {
        isSubmitting: isAddingCategorySubmitting,
        isValid: isAddCategoryValid,
    } = addCategoryForm.formState;

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

    const onAddCategory = async (
        values: z.infer<typeof addCategorySchema>
    ) => {
        try {
            setIsCreatingCategory(true);
            await axios.post("/api/categories", {
                name: values.name,
                kind: CategoryKind.CHALLENGE,
            });
            toast.success(language.challengeCategoryField.categoryCreated);
            addCategoryForm.reset();
            setIsAddingCategory(false);
            router.refresh();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                toast.error(
                    language.challengeCategoryField.categoryAlreadyExists
                );
            } else {
                toast.error(language.somethingWentWrong);
            }
        } finally {
            setIsCreatingCategory(false);
        }
    };

    const selectedOptions = options.filter((option) =>
        initialData.categoryIDs.includes(option.value)
    );

    return (
        <div className="mt-6 border bg-slate-100 roudned-md p-4">
            <div className="font-medium flex items-center justify-between">
                {language.challengeCategoryField.challengeCategory}
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>{language.cancel}</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            {language.challengeCategoryField.editCategory}
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && selectedOptions.length !== 0 ? (
                <ul className="text-sm mt-2">
                    {selectedOptions.map((option) => (
                        <li key={option.value}>{option.label}</li>
                    ))}
                </ul>
            ) : (
                !isEditing && (
                    <p className="text-sm mt-2 text-slate-500 italic">
                        {language.challengeCategoryField.noCategory}
                    </p>
                )
            )}

            {isEditing && (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="categoryIDs"
                                render={() => (
                                    <FormItem>
                                        {options.length === 0 ? (
                                            <p className="text-sm text-slate-500 italic">
                                                {
                                                    language
                                                        .challengeCategoryField
                                                        .noCategory
                                                }
                                            </p>
                                        ) : (
                                            options.map((option) => (
                                                <FormField
                                                    key={option.value}
                                                    control={form.control}
                                                    name="categoryIDs"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            key={option.value}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        option.value
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...field.value,
                                                                                      option.value,
                                                                                  ]
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value
                                                                                      ) =>
                                                                                          value !==
                                                                                          option.value
                                                                                  )
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {option.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))
                                        )}
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

                    <div className="mt-4 pt-4 border-t">
                        {!isAddingCategory ? (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsAddingCategory(true)}
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                {language.challengeCategoryField.addCategory}
                            </Button>
                        ) : (
                            <Form {...addCategoryForm}>
                                <form
                                    onSubmit={addCategoryForm.handleSubmit(
                                        onAddCategory
                                    )}
                                    className="space-y-3"
                                >
                                    <FormField
                                        control={addCategoryForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    {
                                                        language
                                                            .challengeCategoryField
                                                            .categoryName
                                                    }
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={
                                                            isCreatingCategory
                                                        }
                                                        placeholder={
                                                            language
                                                                .challengeCategoryField
                                                                .categoryNamePlaceholder
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
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setIsAddingCategory(false);
                                                addCategoryForm.reset();
                                            }}
                                        >
                                            {language.cancel}
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={
                                                !isAddCategoryValid ||
                                                isAddingCategorySubmitting ||
                                                isCreatingCategory
                                            }
                                        >
                                            {
                                                language.challengeCategoryField
                                                    .addCategory
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
