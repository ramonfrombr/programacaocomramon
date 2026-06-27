import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import {
  MEMBERSHIP_LOCALES,
  MembershipLocale,
} from "@/lib/membership-locales";
import { syncStripeMembershipTier } from "@/lib/stripe-membership-tier";
import { isTeacher } from "@/lib/teacher";

const translationSchema = z.object({
  locale: z.enum(MEMBERSHIP_LOCALES),
  name: z.string().min(1),
  tagline: z.string().nullable().optional(),
  features: z.array(z.string()),
  newFeaturesHeading: z.string().nullable().optional(),
  newFeatures: z.array(z.string()).optional(),
  exclusiveAccessHeading: z.string().nullable().optional(),
  exclusiveAccess: z.array(z.string()).optional(),
});

const patchSchema = z.object({
  monthlyPriceBrl: z.coerce.number().positive(),
  isActive: z.boolean(),
  translations: z.array(translationSchema).length(MEMBERSHIP_LOCALES.length),
});

function getProductName(
  translations: z.infer<typeof patchSchema>["translations"]
) {
  const english = translations.find(
    (translation) => translation.locale === "english"
  );

  return english?.name ?? translations[0]?.name ?? "Membership";
}

export async function PATCH(
  req: Request,
  { params }: { params: { tierId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingTier = await db.membershipTier.findUnique({
      where: { id: params.tierId },
    });

    if (!existingTier) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await req.json();
    const values = patchSchema.parse(body);
    const locales = new Set(values.translations.map((t) => t.locale));

    if (locales.size !== MEMBERSHIP_LOCALES.length) {
      return new NextResponse("Missing locale translations", { status: 400 });
    }

    for (const locale of MEMBERSHIP_LOCALES) {
      if (!locales.has(locale)) {
        return new NextResponse("Missing locale translations", { status: 400 });
      }
    }

    const productName = getProductName(values.translations);

    const stripeIds = await syncStripeMembershipTier({
      id: existingTier.id,
      slug: existingTier.slug,
      monthlyPriceBrl: values.monthlyPriceBrl,
      stripeProductId: existingTier.stripeProductId,
      stripePriceId: existingTier.stripePriceId,
      productName,
      previousMonthlyPriceBrl: existingTier.monthlyPriceBrl,
    });

    const tier = await db.$transaction(async (tx) => {
      const updatedTier = await tx.membershipTier.update({
        where: { id: params.tierId },
        data: {
          monthlyPriceBrl: values.monthlyPriceBrl,
          isActive: values.isActive,
          stripeProductId: stripeIds.stripeProductId,
          stripePriceId: stripeIds.stripePriceId,
        },
      });

      for (const translation of values.translations) {
        await tx.membershipTierTranslation.upsert({
          where: {
            tierId_locale: {
              tierId: params.tierId,
              locale: translation.locale as MembershipLocale,
            },
          },
          create: {
            tierId: params.tierId,
            locale: translation.locale,
            name: translation.name,
            tagline: translation.tagline ?? null,
            features: translation.features,
            newFeaturesHeading: translation.newFeaturesHeading ?? null,
            newFeatures: translation.newFeatures ?? [],
            exclusiveAccessHeading: translation.exclusiveAccessHeading ?? null,
            exclusiveAccess: translation.exclusiveAccess ?? [],
          },
          update: {
            name: translation.name,
            tagline: translation.tagline ?? null,
            features: translation.features,
            newFeaturesHeading: translation.newFeaturesHeading ?? null,
            newFeatures: translation.newFeatures ?? [],
            exclusiveAccessHeading: translation.exclusiveAccessHeading ?? null,
            exclusiveAccess: translation.exclusiveAccess ?? [],
          },
        });
      }

      return updatedTier;
    });

    return NextResponse.json(tier);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    console.log("[TEACHER_MEMBERSHIP_TIER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
