import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Crown, Sparkles } from "lucide-react";
import { Countdown } from "@/components/sales/Countdown";
import { FAQ } from "@/components/sales/FAQ";
import { StripeCheckout } from "@/components/sales/StripeCheckout";

export const Route = createFileRoute("/upsell")({
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

function UpsellPage() {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <main className="bg-navy text-white min-h-screen">
      <div className="bg-success/15 border-b border-success/40 px-4 py-3 text-center">
        <p className="text-success font-semibold text-sm sm:text-base">
          ✓ Votre commande est confirmée ! Votre accès arrive par email.
        </p>
      </div>

      <section className="px-4 pt-12 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-xs sm:text-sm text-gold font-bold mb-6 uppercase">
          <Sparkles className="h-4 w-4" /> Offre unique — disparaît dans
        </div>
        <div className="mb-6">
          <Countdown durationSeconds={600} onExpire={() => navigate({ to: "/thank-you" })} />
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black max-w-4xl mx-auto leading-tight">
          Attendez ! Votre commande est validée —{" "}
          <span className="text-gold">mais vous êtes sur le point de passer à côté</span>{" "}
          du seul élément qui fait la différence entre perdre 3 kg et en perdre 12.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Cette offre disparaît dans 10 minutes et ne sera{" "}
          <span className="text-white font-semibold">JAMAIS proposée à ce prix ailleurs</span>.
        </p>
      </section>

      <section className="px-4 py-16 bg-navy-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-center leading-tight">
            Voici ce que les femmes qui perdent le plus de poids font différemment…
          </h2>
          <div className="mt-8 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>Le programme que vous venez d'acheter va transformer vos nuits. Vous allez activer la Fenêtre Thermogénique et commencer à brûler de la graisse pendant votre sommeil.</p>
            <p>Mais voici ce que j'ai découvert après avoir accompagné <span className="text-white font-semibold">plus de 300 femmes</span> :</p>
            <p>Celles qui obtiennent les résultats les plus spectaculaires — 12, 15, même 20 kg perdus — ne font pas que suivre le programme. Elles ont quelqu'un à leurs côtés.</p>
            <p className="text-white">Quelqu'un qui répond à leurs questions. Qui ajuste le protocole à leur cas particulier. Qui les relance quand la motivation flanche. Qui célèbre chaque kilo perdu avec elles.</p>
            <p className="text-gold font-semibold">C'est exactement ce que je vous propose aujourd'hui.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-navy-card to-navy-light border-2 border-gold p-6 sm:p-10 shadow-[0_0_60px_-15px_rgba(245,197,66,0.45)]">
          <div className="text-center">
            <Crown className="h-10 w-10 text-gold mx-auto" />
            <h2 className="mt-3 text-2xl sm:text-4xl font-black">
              <span className="text-gold">L'ACCOMPAGNEMENT PREMIUM</span> — 8 semaines
            </h2>
            <p className="mt-2 text-muted-foreground italic">Votre transformation guidée, pas à pas</p>
          </div>

          <ul className="mt-8 space-y-4">
            {[
              "8 séances individuelles en visio (1h chacune) — on adapte le protocole à votre morphologie, vos hormones et vos habitudes exactes",
              "Suivi quotidien par WhatsApp pendant 8 semaines — je réponds à chaque question en moins de 24h",
              "Plan thermogénique personnalisé créé pour vous — pas un plan générique, le vôtre, selon votre vie",
              "Analyse de vos blocages hormonaux — on identifie exactement ce qui freine votre perte de poids",
              "Accès au groupe VIP privé — communauté de femmes qui se soutiennent",
              "Garantie résultats : -8 kg en 8 semaines ou je continue à vous accompagner gratuitement",
            ].map((it) => (
              <li key={it} className="flex items-start gap-3">
                <Check className="h-6 w-6 text-gold shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">{it}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground line-through">Valeur réelle : 1 200€</p>
            <p className="mt-2 text-4xl sm:text-5xl font-black text-gold">Aujourd'hui : 197€</p>
            <p className="mt-2 text-sm text-muted-foreground">soit moins de 25€ par semaine d'accompagnement</p>
          </div>

          <div className="mt-8 space-y-3">
            {showCheckout ? (
              <StripeCheckout mode="upsell" redirectTo="/thank-you" buttonLabel="Confirmer 197€" buttonColor="gold" />
            ) : (
              <button
                onClick={() => setShowCheckout(true)}
                className="pulse-gold w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-5 text-base sm:text-lg font-extrabold uppercase tracking-wide text-navy hover:brightness-110 transition"
              >
                Oui, je veux l'accompagnement premium — 197€ →
              </button>
            )}

            <button
              onClick={() => navigate({ to: "/thank-you" })}
              className="w-full text-center text-sm text-muted-foreground hover:text-white underline underline-offset-2 py-2"
            >
              Non merci, je préfère avancer seule sans accompagnement
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-navy-light">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { n: "Marie L.", r: "-11 kg en 8 semaines avec l'accompagnement" },
              { n: "Chloé R.", r: "-9 kg et plus jamais de fringales nocturnes" },
              { n: "Nathalie B.", r: "-14 kg, l'accompagnement a tout changé" },
            ].map((t) => (
              <div key={t.n} className="rounded-xl bg-navy-card border border-gold/30 p-6 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gold/20 border border-gold/40" />
                <p className="mt-4 font-bold text-white">{t.n}</p>
                <p className="mt-2 text-sm text-gold">{t.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">Questions fréquentes</h2>
          <FAQ items={upsellFaq} />
        </div>
      </section>
    </main>
  );
}


