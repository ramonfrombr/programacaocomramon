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
import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import { useLanguageStore } from "@/hooks/use-language-store";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface CareerFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

export const CareersForm = ({
  initialData,
  courseId,
  options,
}: CareerFormProps) => {
  const language = useLanguageStore().teacherCourseSetup;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const formSchema = z.object({
    careerIDs: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: language.courseCareersField.youHaveToSelectAtLeastOneItem,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerIDs: initialData?.careerIDs || [],
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

  const selectedOptions = options.filter((option) =>
    initialData.careerIDs.includes(option.value)
  );

  return (
    <div className="mt-6 border bg-slate-100 roudned-md p-4">
      <div className="font-medium flex items-center justify-between">
        {language.courseCareersField.courseCareers}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{language.cancel}</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {language.courseCareersField.editCareers}
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
          <p className="text-sm mt-2 text-slate-500 italic">{language.courseCareersField.noCareer}</p>
        )
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="careerIDs"
              render={() => (
                <FormItem>
                  {options.map((option) => (
                    <FormField
                      key={option.value}
                      control={form.control}
                      name="careerIDs"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
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
