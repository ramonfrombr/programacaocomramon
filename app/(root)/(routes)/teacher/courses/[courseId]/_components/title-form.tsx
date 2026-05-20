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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/hooks/use-language-store";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}


export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formSchema = z.object({
    title: z.string().min(1, {
      message: language.courseTitleField.titleIsNecessary,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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
        {language.courseTitleField.courseTitle}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{language.cancel}</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {language.courseTitleField.editTitle}
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={
                        language.courseTitleField.courseTitleInputPlaceholder
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
