import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { StripeCheckout } from "@/components/sales/StripeCheckout";
import { confirmUpsellIntent } from "@/lib/stripe.functions";

export const Route = createFileRoute("/upsell")({
  validateSearch: (search: Record<string, unknown>) => ({
    customerId: (search.customerId as string) ?? "",
    paymentMethodId: (search.paymentMethodId as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Offre exclusive — Accompagnement Premium" },
      { name: "description", content: "Une seule offre à ne pas manquer." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UpsellPage,
});

const upsellFaq = [
  { q: "Est-ce que les séances sont vraiment personnalisées ?", a: "100%. Avant la première séance vous remplissez un questionnaire détaillé sur votre historique de poids, vos hormones, votre mode de vie. Chaque séance part de là." },
  { q: "Que se passe-t-il si je ne perds pas 8kg ?", a: "Je continue à vous accompagner gratuitement jusqu'à ce que vous atteigniez votre objectif. C'est ma garantie résultats — sans conditions." },
  { q: "Quand commencent les séances ?", a: "Vous recevez un lien de prise de rendez-vous immédiatement après votre paiement. Première séance possible dès cette semaine." },
];

function format(n: number) {
  return n.toString().padStart(2, "0");
}

function UpsellPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const confirmFn = useServerFn(confirmUpsellIntent);

  const [customerId, setCustomerId] = useState(search.customerId);
  const [paymentMethodId, setPaymentMethodId] = useState(search.paymentMethodId);
  const [seconds, setSeconds] = useState(600);
  const [oneClickLoading, setOneClickLoading] = useState(false);
  const [oneClickError, setOneClickError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!customerId) {
      const c = sessionStorage.getItem("upsell_customer_id");
      if (c) setCustomerId(c);
    }
    if (!paymentMethodId) {
      const p = sessionStorage.getItem("upsell_payment_method_id");
      if (p) setPaymentMethodId(p);
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      navigate({ to: "/thank-you" });
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, navigate]);

  const mm = format(Math.floor(seconds / 60));
  const ss = format(seconds % 60);
  const hasOneClick = !!customerId && !!paymentMethodId;

  const handleOneClick = async () => {
    setOneClickLoading(true);
    setOneClickError(null);
    try {
      const r = await confirmFn({ data: { customerId, paymentMethodId } });
      if (r.success) {
        navigate({ to: "/thank-you" });
      } else {
        setOneClickError(r.error ?? "Paiement refusé");
        setOneClickLoading(false);
      }
    } catch (e: any) {
      setOneClickError(e?.message ?? "Erreur lors du paiement");
      setOneClickLoading(false);
    }
  };

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111" }}>
      <style>{`
        @keyframes blink-bar { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes pulse-cta-red {
          0% { box-shadow: 0 0 0 0 rgba(224,0,0,0.7); }
          100% { box-shadow: 0 0 0 16px rgba(224,0,0,0); }
        }
        .urgency-bar { animation: blink-bar 1s infinite; }
        .pulse-red { animation: pulse-cta-red 1.8s infinite; }
      `}</style>

      {/* Top urgency bar */}
      <div
        className="urgency-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#e00000",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          textTransform: "uppercase",
          textAlign: "center",
          padding: "10px 12px",
          zIndex: 50,
          letterSpacing: 0.5,
        }}
      >
        ⚠️ ATTENTION — CETTE OFFRE EXPIRE DANS {mm}:{ss}
      </div>

      <div style={{ height: 44 }} />

      {/* Confirmation banner */}
      <div
        style={{
          background: "#16a34a",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          textAlign: "center",
          padding: "12px 16px",
        }}
      >
        ✓ Votre commande est confirmée — accès envoyé par email
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Headline */}
        <section style={{ padding: "32px 24px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Attendez ! Votre commande est validée —{" "}
            <span style={{ color: "#e00000" }}>
              mais vous êtes sur le point de passer à côté
            </span>{" "}
            du seul élément qui fait la différence entre perdre 3 kg et en
            perdre 12.
          </h1>

          <div
            style={{
              marginTop: 24,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.7,
              color: "#111",
            }}
          >
            <p style={{ margin: "0 0 14px" }}>
              Cette offre vous est proposée{" "}
              <span style={{ color: "#e00000", fontWeight: 900 }}>
                une seule fois
              </span>{" "}
              et ne sera{" "}
              <span style={{ color: "#e00000", fontWeight: 900 }}>
                jamais reproposée
              </span>{" "}
              à ce prix.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Si vous fermez cette page,{" "}
              <span style={{ color: "#e00000", fontWeight: 900 }}>
                vous allez rater
              </span>{" "}
              le seul élément qui transforme un programme en résultats. C'est
              votre{" "}
              <span style={{ color: "#e00000", fontWeight: 900 }}>
                dernière chance
              </span>
              .
            </p>
          </div>
        </section>

        {/* Feature list */}
        <section style={{ padding: "0 16px 8px" }}>
          {[
            "8 séances individuelles en visio (1h chacune) — protocole adapté à votre morphologie, vos hormones et vos habitudes",
            "Suivi quotidien par WhatsApp pendant 8 semaines — réponse en moins de 24h",
            "Plan thermogénique 100% personnalisé créé pour vous",
            "Analyse de vos blocages hormonaux — on identifie ce qui freine votre perte de poids",
            "Accès au groupe VIP privé — communauté de femmes qui se soutiennent",
            "Garantie résultats : -8 kg en 8 semaines ou je continue gratuitement",
          ].map((it) => (
            <div
              key={it}
              style={{
                background: "#fff",
                borderLeft: "3px solid #e00000",
                padding: 16,
                marginBottom: 8,
                color: "#111",
                fontWeight: 700,
                fontSize: 15,
                lineHeight: 1.5,
                display: "flex",
                gap: 10,
              }}
            >
              <span style={{ color: "#e00000", fontWeight: 900 }}>✓</span>
              <span>{it}</span>
            </div>
          ))}
        </section>

        {/* Price block */}
        <section style={{ padding: "32px 16px 16px", textAlign: "center" }}>
          <div
            style={{
              color: "#999",
              fontSize: 18,
              textDecoration: "line-through",
            }}
          >
            197€
          </div>
          <div
            style={{
              color: "#e00000",
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            47€
          </div>
          <div style={{ color: "#111", fontSize: 14, marginTop: 8 }}>
            soit moins de 6€ par semaine
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "8px 16px 16px" }}>
          {oneClickError && (
            <div
              style={{
                background: "#fee",
                color: "#e00000",
                fontWeight: 700,
                padding: 12,
                marginBottom: 10,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {oneClickError}
            </div>
          )}

          {hasOneClick ? (
            <>
              <button
                onClick={handleOneClick}
                disabled={oneClickLoading}
                className="pulse-red"
                style={{
                  width: "100%",
                  background: "#e00000",
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: 20,
                  border: "none",
                  borderRadius: 0,
                  cursor: oneClickLoading ? "wait" : "pointer",
                  opacity: oneClickLoading ? 0.7 : 1,
                  letterSpacing: 0.5,
                }}
              >
                {oneClickLoading
                  ? "Traitement…"
                  : "⚡ OUI — JE VEUX L'ACCOMPAGNEMENT MAINTENANT"}
              </button>
              <p
                style={{
                  textAlign: "center",
                  color: "#e00000",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                🔒 Paiement en 1 clic — carte déjà enregistrée
              </p>
            </>
          ) : (
            <StripeCheckout
              mode="upsell"
              redirectTo="/thank-you"
              buttonLabel="Oui, je veux l'accompagnement — 47€"
              buttonColor="electric"
            />
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => navigate({ to: "/thank-you" })}
              style={{
                background: "none",
                border: "none",
                color: "#999",
                fontSize: 12,
                textDecoration: "underline",
                cursor: "pointer",
                padding: 4,
              }}
            >
              Non merci, je renonce à cette opportunité et je passe à la page
              suivante
            </button>
          </div>
        </section>

        {/* Social proof */}
        <section style={{ padding: "32px 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              textAlign: "center",
            }}
          >
            {[
              { n: "+ de 300 femmes", l: "accompagnées" },
              { n: "-8 kg", l: "en 8 semaines en moyenne" },
              { n: "Garanti", l: "ou remboursé" },
            ].map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding: "8px 6px",
                  borderLeft: i === 0 ? "none" : "1px solid #e5e5e5",
                }}
              >
                <div
                  style={{
                    color: "#e00000",
                    fontWeight: 900,
                    fontSize: 20,
                    lineHeight: 1.1,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ color: "#111", fontSize: 12, marginTop: 6 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "16px 16px 48px" }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#111",
              textAlign: "center",
              margin: "0 0 16px",
            }}
          >
            Questions fréquentes
          </h2>
          <div>
            {upsellFaq.map((it, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={it.q}
                  style={{
                    background: "#fff",
                    marginBottom: 8,
                    border: "1px solid #eee",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      padding: 14,
                      fontWeight: 900,
                      color: "#111",
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    {it.q}
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: 14,
                        borderLeft: "2px solid #e00000",
                        color: "#111",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {it.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
