import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

const BASE_AMOUNT = 1780; // 17.80 EUR
const BUMP_AMOUNT = 780;  // 7.80 EUR
const UPSELL_AMOUNT = 19700; // 197 EUR

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(key);
}

export const getPublishableKey = createServerFn({ method: "GET" }).handler(async () => {
  return { key: process.env.STRIPE_PUBLISHABLE_KEY ?? "" };
});

export const createMainIntent = createServerFn({ method: "POST" })
  .inputValidator((d: { orderBump: boolean; email?: string; name?: string }) => d)
  .handler(async ({ data }) => {
    const stripe = getStripe();
    const amount = BASE_AMOUNT + (data.orderBump ? BUMP_AMOUNT : 0);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: data.email,
      metadata: {
        product: "fenetre-thermogenique",
        order_bump: data.orderBump ? "1" : "0",
        customer_name: data.name ?? "",
      },
    });
    return { clientSecret: intent.client_secret, amount };
  });

export const createUpsellIntent = createServerFn({ method: "POST" })
  .inputValidator((d: { email?: string; name?: string }) => d)
  .handler(async ({ data }) => {
    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: UPSELL_AMOUNT,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: data.email,
      metadata: {
        product: "accompagnement-premium",
        customer_name: data.name ?? "",
      },
    });
    return { clientSecret: intent.client_secret, amount: UPSELL_AMOUNT };
  });


