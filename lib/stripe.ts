import Stripe from "stripe";

const _STRIPE_API_KEY =
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_API_KEY_DEV
    : process.env.STRIPE_API_KEY_PROD;

export const stripe = new Stripe(_STRIPE_API_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});
