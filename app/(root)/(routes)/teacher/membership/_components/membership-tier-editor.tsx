"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MembershipTierSlug } from "@prisma/client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Textarea } from "@/components/ui/textarea";
import { useLanguageStore } from "@/hooks/use-language-store";
import {
  MEMBERSHIP_LOCALES,
  MembershipLocale,
} from "@/lib/membership-locales";
import { cn } from "@/lib/utils";

export type TeacherMembershipTierData = {
  id: string;
  slug: MembershipTierSlug;
  position: number;
  monthlyPriceBrl: number;
  isActive: boolean;
  stripeProductId: string | null;
  stripePriceId: string | null;
  translations: Array<{
    locale: MembershipLocale;
    name: string;
    tagline: string | null;
    features: string[];
    newFeaturesHeading: string | null;
    newFeatures: string[];
    exclusiveAccessHeading: string | null;
    exclusiveAccess: string[];
  }>;
};

function arrayToLines(values: string[]) {
  return values.join("\n");
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildDefaultTranslations(tier: TeacherMembershipTierData) {
  return MEMBERSHIP_LOCALES.map((locale) => {
    const translation = tier.translations.find((item) => item.locale === locale);

    return {
      locale,
      name: translation?.name ?? "",
      tagline: translation?.tagline ?? "",
      features: arrayToLines(translation?.features ?? []),
      newFeaturesHeading: translation?.newFeaturesHeading ?? "",
      newFeatures: arrayToLines(translation?.newFeatures ?? []),
      exclusiveAccessHeading: translation?.exclusiveAccessHeading ?? "",
      exclusiveAccess: arrayToLines(translation?.exclusiveAccess ?? []),
    };
  });
}

function getLocaleLabel(
  locale: MembershipLocale,
  labels: Record<MembershipLocale, string>
) {
  return labels[locale];
}

type MembershipTierEditorProps = {
  tier: TeacherMembershipTierData;
};

export function MembershipTierEditor({ tier }: MembershipTierEditorProps) {
  const language = useLanguageStore().teacherMembership;
  const router = useRouter();

  const localeLabels: Record<MembershipLocale, string> = {
    portuguese: language.localePortuguese,
    english: language.localeEnglish,
    french: language.localeFrench,
    spanish: language.localeSpanish,
  };

  const formSchema = z.object({
    monthlyPriceBrl: z.coerce.number().positive(),
    isActive: z.boolean(),
    translations: z.array(
      z.object({
        locale: z.enum(MEMBERSHIP_LOCALES),
        name: z.string().min(1),
        tagline: z.string(),
        features: z.string().min(1),
        newFeaturesHeading: z.string(),
        newFeatures: z.string(),
        exclusiveAccessHeading: z.string(),
        exclusiveAccess: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyPriceBrl: tier.monthlyPriceBrl,
      isActive: tier.isActive,
      translations: buildDefaultTranslations(tier),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/teacher/membership/${tier.id}`, {
        monthlyPriceBrl: values.monthlyPriceBrl,
        isActive: values.isActive,
        translations: values.translations.map((translation) => ({
          locale: translation.locale,
          name: translation.name,
          tagline: translation.tagline || null,
          features: linesToArray(translation.features),
          newFeaturesHeading: translation.newFeaturesHeading || null,
          newFeatures: linesToArray(translation.newFeatures),
          exclusiveAccessHeading: translation.exclusiveAccessHeading || null,
          exclusiveAccess: linesToArray(translation.exclusiveAccess),
        })),
      });

      toast.success(language.tierUpdated);
      router.refresh();
    } catch {
      toast.error(language.somethingWentWrong);
    }
  };

  const stripeConfigured = Boolean(tier.stripeProductId && tier.stripePriceId);

  return (
    <div className="border bg-slate-100 rounded-md p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {language.tierLabel} {tier.slug}
          </h2>
          <p
            className={cn(
              "text-sm",
              stripeConfigured ? "text-green-700" : "text-amber-700"
            )}
          >
            {stripeConfigured
              ? language.stripeConfigured
              : language.stripeNotConfigured}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="monthlyPriceBrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language.monthlyPrice}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      disabled={isSubmitting}
                      placeholder={language.monthlyPricePlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-end gap-3 space-y-0 pb-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {language.activeTier}
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {MEMBERSHIP_LOCALES.map((locale, index) => (
              <AccordionItem key={locale} value={locale}>
                <AccordionTrigger>
                  {getLocaleLabel(locale, localeLabels)}
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`translations.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language.name}</FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.tagline`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language.tagline}{" "}
                          <span className="text-muted-foreground">
                            ({language.optionalField})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.features`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language.features}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            disabled={isSubmitting}
                            placeholder={language.featuresHint}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.newFeaturesHeading`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language.newFeaturesHeading}{" "}
                          <span className="text-muted-foreground">
                            ({language.optionalField})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.newFeatures`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language.newFeatures}{" "}
                          <span className="text-muted-foreground">
                            ({language.optionalField})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            disabled={isSubmitting}
                            placeholder={language.featuresHint}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.exclusiveAccessHeading`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language.exclusiveAccessHeading}{" "}
                          <span className="text-muted-foreground">
                            ({language.optionalField})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`translations.${index}.exclusiveAccess`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language.exclusiveAccess}{" "}
                          <span className="text-muted-foreground">
                            ({language.optionalField})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            disabled={isSubmitting}
                            placeholder={language.featuresHint}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button disabled={!isValid || isSubmitting} type="submit">
            {language.save}
          </Button>
        </form>
      </Form>
    </div>
  );
}
