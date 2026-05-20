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
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { useLanguageStore } from "@/hooks/use-language-store";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formSchema = z.object({
    description: z.string().min(1, {
      message: language.courseDescriptionField.descriptionIsRequired,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success(language.courseUpdated);
      toggleEdit();
      router.refresh();
    } catch {
      toast.error(language.somethingWentWrong);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 roudned-md p-4">
      <div className="font-medium flex items-center justify-between">
        {language.courseDescriptionField.courseDescription}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{language.cancel}</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {language.courseDescriptionField.editDescription}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description ||
            language.courseDescriptionField.noDescription}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder={
                        language.courseDescriptionField
                          .courseDescriptionInputPlaceholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {language.save}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
