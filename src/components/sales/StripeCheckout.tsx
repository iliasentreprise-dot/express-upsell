import { useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createMainIntent, createUpsellIntent, getPublishableKey } from "@/lib/stripe.functions";
import { Lock } from "lucide-react";

type Mode = "main" | "upsell";

interface Props {
  mode: Mode;
  redirectTo: string;
  buttonLabel: string;
  buttonColor?: "electric" | "gold";
}

function InnerForm({ redirectTo, buttonLabel, buttonColor = "electric" }: Omit<Props, "mode">) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setErr(null);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setErr(error.message ?? "Paiement refusé. Vérifiez vos infos.");
      setLoading(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      navigate({ to: redirectTo });
      return;
    }
    setLoading(false);
  };

  const colorClasses =
    buttonColor === "gold"
      ? "bg-gold text-navy hover:brightness-110 pulse-gold"
      : "bg-electric text-white hover:brightness-110 pulse-cta";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {err && (
        <div className="rounded-md bg-red-500/10 border border-red-500/40 text-red-200 text-sm px-3 py-2">
          {err}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base sm:text-lg font-extrabold uppercase tracking-wide transition disabled:opacity-60 disabled:cursor-not-allowed ${colorClasses}`}
      >
        <Lock className="h-5 w-5" />
        {loading ? "Traitement…" : buttonLabel}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Paiement 100% sécurisé par Stripe — SSL
      </p>
    </form>
  );
}

export function StripeCheckout({
  mode,
  redirectTo,
  buttonLabel,
  buttonColor,
  email,
  name,
  orderBump,
}: Props & { email?: string; name?: string; orderBump?: boolean }) {
  const [pk, setPk] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fetchPk = useServerFn(getPublishableKey);
  const fetchMain = useServerFn(createMainIntent);
  const fetchUpsell = useServerFn(createUpsellIntent);

  useEffect(() => {
    fetchPk().then((r) => setPk(r.key)).catch(() => setError("Configuration Stripe manquante"));
  }, [fetchPk]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const r =
          mode === "main"
            ? await fetchMain({ data: { orderBump: !!orderBump, email, name } })
            : await fetchUpsell({ data: { email, name } });
        if (!cancelled) setClientSecret(r.clientSecret ?? "");
      } catch {
        if (!cancelled) setError("Impossible de préparer le paiement.");
      }
    };
    load();
    return () => { cancelled = true; };
  }, [mode, orderBump, email, name, fetchMain, fetchUpsell]);

  const stripePromise = useMemo<Promise<Stripe | null> | null>(
    () => (pk ? loadStripe(pk) : null),
    [pk]
  );

  if (error) {
    return <div className="text-red-300 text-sm">{error}</div>;
  }
  if (!stripePromise || !clientSecret) {
    return (
      <div className="rounded-md bg-navy border border-border px-4 py-6 text-center text-muted-foreground text-sm">
        Chargement du paiement sécurisé…
      </div>
    );
  }

  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#2b6bff",
            colorBackground: "#0a0e2a",
            colorText: "#ffffff",
            colorTextSecondary: "#9aa3c7",
            borderRadius: "8px",
          },
        },
      }}
    >
      <InnerForm redirectTo={redirectTo} buttonLabel={buttonLabel} buttonColor={buttonColor} />
    </Elements>
  );
}


