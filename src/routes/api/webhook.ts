import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";

export const Route = createFileRoute("/api/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sig = request.headers.get("stripe-signature");
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        const apiKey = process.env.STRIPE_SECRET_KEY;
        if (!sig || !secret || !apiKey) {
          return new Response("Missing config", { status: 400 });
        }
        const stripe = new Stripe(apiKey);
        const body = await request.text();
        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(body, sig, secret);
        } catch (err) {
          return new Response(`Webhook signature error: ${(err as Error).message}`, { status: 400 });
        }

        switch (event.type) {
          case "payment_intent.succeeded": {
            const pi = event.data.object as Stripe.PaymentIntent;
            console.log("✅ Payment succeeded", pi.id, pi.amount, pi.metadata);
            break;
          }
          case "payment_intent.payment_failed": {
            const pi = event.data.object as Stripe.PaymentIntent;
            console.warn("❌ Payment failed", pi.id, pi.last_payment_error?.message);
            break;
          }
        }
        return Response.json({ received: true });
      },
    },
  },
});


