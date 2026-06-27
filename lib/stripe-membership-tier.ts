import { MembershipTierSlug } from "@prisma/client";

import { stripe } from "@/lib/stripe";

type SyncStripeMembershipTierInput = {
  id: string;
  slug: MembershipTierSlug;
  monthlyPriceBrl: number;
  stripeProductId: string | null;
  stripePriceId: string | null;
  productName: string;
  previousMonthlyPriceBrl: number;
};

export async function syncStripeMembershipTier(
  tier: SyncStripeMembershipTierInput
) {
  let stripeProductId = tier.stripeProductId;

  if (!stripeProductId) {
    const product = await stripe.products.create({
      name: tier.productName,
      metadata: {
        tierId: tier.id,
        tierSlug: tier.slug,
      },
    });
    stripeProductId = product.id;
  } else {
    await stripe.products.update(stripeProductId, {
      name: tier.productName,
    });
  }

  const priceChanged = tier.monthlyPriceBrl !== tier.previousMonthlyPriceBrl;
  let stripePriceId = tier.stripePriceId;

  if (!stripePriceId || priceChanged) {
    const price = await stripe.prices.create({
      product: stripeProductId,
      currency: "brl",
      unit_amount: Math.round(tier.monthlyPriceBrl * 100),
      recurring: {
        interval: "month",
      },
      metadata: {
        tierId: tier.id,
        tierSlug: tier.slug,
      },
    });

    if (tier.stripePriceId && priceChanged) {
      await stripe.prices.update(tier.stripePriceId, {
        active: false,
      });
    }

    stripePriceId = price.id;
  }

  return {
    stripeProductId,
    stripePriceId,
  };
}
