import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

const BASE_AMOUNT = 1780; // 17.80 EUR
const BUMP_AMOUNT = 780;  // 7.80 EUR
const UPSELL_AMOUNT = 4700; // 47 EUR

// On Cloudflare Workers (TanStack Start), env vars / secrets are exposed via
// the `cloudflare:workers` runtime binding. `process.env` is empty there.
// We try the Cloudflare binding first, then fall back to `process.env` for
// local Node-based dev.
async function getEnv(): Promise<Record<string, string | undefined>> {
  try {
    // Dynamic import so non-Workers runtimes (Node dev) don't crash.
    const mod = await import("cloudflare:workers" as string).catch(() => null as any);
    if (mod && mod.env) return mod.env as Record<string, string | undefined>;
  } catch {
    // ignore
  }
  return process.env as Record<string, string | undefined>;
}

async function getStripe() {
  const env = await getEnv();
  const key = env.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(key);
}

export const getPublishableKey = createServerFn({ method: "GET" }).handler(async () => {
  const env = await getEnv();
  return { key: env.STRIPE_PUBLISHABLE_KEY ?? process.env.STRIPE_PUBLISHABLE_KEY ?? "" };
});

async function findOrCreateCustomer(stripe: Stripe, email?: string, name?: string) {
  if (!email) return null;
  const list = await stripe.customers.list({ email, limit: 1 });
  if (list.data[0]) return list.data[0];
  return stripe.customers.create({ email, name: name || undefined });
}

export const createMainIntent = createServerFn({ method: "POST" })
  .inputValidator((d: { orderBump: boolean; email?: string; name?: string }) => d)
  .handler(async ({ data }) => {
    const stripe = await getStripe();
    const amount = BASE_AMOUNT + (data.orderBump ? BUMP_AMOUNT : 0);
    const customer = await findOrCreateCustomer(stripe, data.email, data.name);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: data.email,
      customer: customer?.id,
      setup_future_usage: "off_session",
      metadata: {
        product: "fenetre-thermogenique",
        order_bump: data.orderBump ? "1" : "0",
        customer_name: data.name ?? "",
      },
    });
    return {
      clientSecret: intent.client_secret,
      amount,
      customerId: customer?.id ?? "",
    };
  });

export const createUpsellIntent = createServerFn({ method: "POST" })
  .inputValidator((d: { email?: string; name?: string }) => d)
  .handler(async ({ data }) => {
    const stripe = await getStripe();
    const customer = await findOrCreateCustomer(stripe, data.email, data.name);
    const intent = await stripe.paymentIntents.create({
      amount: UPSELL_AMOUNT,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: data.email,
      customer: customer?.id,
      metadata: {
        product: "accompagnement-premium",
        customer_name: data.name ?? "",
      },
    });
    return {
      clientSecret: intent.client_secret,
      amount: UPSELL_AMOUNT,
      customerId: customer?.id ?? "",
    };
  });

export const confirmUpsellIntent = createServerFn({ method: "POST" })
  .inputValidator((d: { customerId: string; paymentMethodId: string }) => d)
  .handler(async ({ data }) => {
    const stripe = await getStripe();
    try {
      const intent = await stripe.paymentIntents.create({
        amount: UPSELL_AMOUNT,
        currency: "eur",
        customer: data.customerId,
        payment_method: data.paymentMethodId,
        confirm: true,
        off_session: true,
        automatic_payment_methods: { enabled: true, allow_redirects: "never" },
        metadata: { product: "accompagnement-premium" },
      });
      if (intent.status === "succeeded") {
        return { success: true as const };
      }
      return { success: false as const, error: "Paiement refusé" };
    } catch (e: any) {
      return { success: false as const, error: e?.message ?? "Paiement refusé" };
    }
  });
