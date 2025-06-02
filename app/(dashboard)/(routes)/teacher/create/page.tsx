"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLanguageStore } from "@/hooks/use-language-store";
import { Checkbox } from "@/components/ui/checkbox";

const CreatePage = () => {
  const language = useLanguageStore().teacherCreate;

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, {
      message: language.titleIsRequired,
    }),
    youtube: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      youtube: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const valuesWithSlug = {
        slug: values.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-")
          .toLowerCase(),
        ...values,
      };
      const response = await axios.post("/api/courses", valuesWithSlug);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success(language.courseCreated);
    } catch {
      toast.error(language.somethingWentWrong);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">{language.nameYourCourse}</h1>

        <p className="text-sm text-slate-600">
          {language.nameYourCourseDescription}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language.courseTitle}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={language.courseTitleInputPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {language.courseTitleInputDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language.availableOnYouTube}</FormLabel>
                  <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      {language.thisCourseIsAvailableOnlyOnYouTube}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  {language.cancel}
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                {language.continue}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
