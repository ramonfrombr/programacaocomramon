import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const existing = await db.stripeCustomer.findUnique({
    where: { userId },
    select: { stripeCustomerId: true },
  });

  if (existing) {
    return existing.stripeCustomerId;
  }

  const customer = await stripe.customers.create({ email });

  const created = await db.stripeCustomer.create({
    data: {
      userId,
      stripeCustomerId: customer.id,
    },
  });

  return created.stripeCustomerId;
}
