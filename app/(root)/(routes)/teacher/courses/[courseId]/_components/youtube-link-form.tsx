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
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";

interface YoutubeLinkFormProps {
  initialData: Course;
  courseId: string;
}

export const YoutubeLinkForm = ({
  initialData,
  courseId,
}: YoutubeLinkFormProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formSchema = z.object({
    youtubeLink: z.string().min(1, {
      message: language.courseYoutubeLink.youtubeLinkIsRequired,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeLink: initialData?.youtubeLink || "",
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
        {language.courseYoutubeLink.courseYoutubeLink}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{language.cancel}</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {language.courseYoutubeLink.editYoutubeLink}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.youtubeLink && "text-slate-500 italic"
          )}
        >
          {initialData.youtubeLink || language.courseYoutubeLink.noYoutubeLink}
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
              name="youtubeLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={"https://www.youtube.com/..."}
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
