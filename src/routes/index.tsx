import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ShieldCheck, Lock, Zap, ArrowRight, Star } from "lucide-react";
import { Countdown } from "@/components/sales/Countdown";
import { BeforeAfter } from "@/components/sales/BeforeAfter";
import { FAQ } from "@/components/sales/FAQ";
import { StripeCheckout } from "@/components/sales/StripeCheckout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perdre du poids en dormant — La Fenêtre Thermogénique Féminine" },
      {
        name: "description",
        content:
          "Activez la Fenêtre Thermogénique chaque nuit et brûlez la graisse pendant votre sommeil. Programme complet à 17,80€.",
      },
      { property: "og:title", content: "Perdre du poids en DORMANT" },
      { property: "og:description", content: "Le mécanisme nocturne que votre corps utilise chaque nuit." },
    ],
  }),
  component: SalesPage,
});

const scrollToOrder = () => {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
};

function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={scrollToOrder}
      className="pulse-cta inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-extrabold uppercase tracking-wide text-white hover:brightness-110 transition"
    >
      {children}
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}

const modules = [
  { n: "01", title: "La Science de la Fenêtre Thermogénique", items: ["Comment fonctionne le mécanisme nocturne","Les 3 hormones clés (leptine, cortisol, insuline)","Pourquoi les régimes bloquent ce processus"] },
  { n: "02", title: "Le Protocole du Dernier Repas", items: ["Quoi manger le soir pour activer la fenêtre","Les aliments qui ferment la fenêtre","Le timing idéal pour maximiser la combustion"] },
  { n: "03", title: "Le Rituel de Descente (21h)", items: ["Faire chuter le cortisol en 30 minutes","La tisane thermogénique","Le protocole de promenade nocturne"] },
  { n: "04", title: "L'Extinction des Écrans & Mélatonine", items: ["Pourquoi la lumière bleue sabote votre perte de poids","Le protocole 45 minutes avant le coucher","Les alternatives aux écrans le soir"] },
  { n: "05", title: "La Chambre Thermogénique", items: ["La température idéale de la chambre","La douche chaude 30 minutes avant","L'environnement thermique optimal"] },
  { n: "06", title: "L'Endormissement Actif", items: ["La respiration 4-7-8 anti-cortisol","Le scan corporel anti-stress","Sommeil profond en moins de 20 minutes"] },
];

const faq = [
  { q: "Est-ce que ça marche vraiment sans régime ?", a: "Oui. Le protocole agit sur votre température corporelle et vos hormones nocturnes — pas sur ce que vous mangez le jour. Des centaines de femmes ont obtenu des résultats sans changer un seul repas du matin ou du midi." },
  { q: "En combien de temps je vois des résultats ?", a: "La plupart des femmes remarquent une différence sur leur énergie dès la première semaine. La perte de poids visible commence généralement entre J+10 et J+21." },
  { q: "Est-ce que c'est compatible avec mon mode de vie ?", a: "Absolument. Le protocole prend 15 minutes le soir. Il s'adapte à votre heure de coucher, votre alimentation et vos contraintes. Aucun équipement nécessaire." },
  { q: "Et si ça ne fonctionne pas pour moi ?", a: "Vous êtes couverte par la garantie 30 jours. Si vous n'êtes pas satisfaite pour quelque raison que ce soit, envoyez un email et vous êtes remboursée intégralement." },
  { q: "Comment j'accède au programme après l'achat ?", a: "Immédiatement après le paiement, vous recevez un email avec vos accès. Vous pouvez commencer dans les 2 minutes qui suivent votre achat." },
];

function SalesPage() {
  const [bump, setBump] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("FR");
  const [showStripe, setShowStripe] = useState(false);

  const total = bump ? 25.6 : 17.8;
  const [deadline, setDeadline] = useState<Date | null>(null);
  useEffect(() => {
    setDeadline(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  }, []);

  return (
    <main className="bg-navy text-white">
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-electric/10 border border-electric/30 px-3 py-1 text-xs sm:text-sm text-electric font-semibold mb-6">
            <Star className="h-3.5 w-3.5" /> Programme #1 — Femmes 35 ans et +
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
            Perdre du poids en{" "}
            <span className="block text-electric text-6xl sm:text-8xl lg:text-9xl mt-2 drop-shadow-[0_0_30px_rgba(43,107,255,0.5)]">
              DORMANT
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La <span className="text-white font-semibold">Fenêtre Thermogénique Féminine</span> —
            le mécanisme nocturne que votre corps utilise chaque nuit pour brûler la graisse.
          </p>
          <div className="mt-10">
            <CTAButton>Oui, je veux perdre du poids en dormant</CTAButton>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-electric" /> Accès immédiat</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-electric" /> Paiement sécurisé</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-electric" /> Satisfait ou remboursé 30 jours</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-navy-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center leading-tight">
            Vous faites tout bien…<br />
            <span className="text-electric">et pourtant rien ne change.</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["Vous mangez moins mais votre corps stocke quand même","Vous vous couchez épuisée et vous vous réveillez sans énergie","Les régimes marchent 3 semaines puis tout revient"].map((p, i) => (
              <div key={i} className="rounded-xl bg-navy-card border border-electric/30 p-6">
                <div className="text-electric font-black text-2xl">0{i + 1}</div>
                <p className="mt-3 text-base sm:text-lg text-white/90 font-medium">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ce n'est pas votre faute. C'est votre <span className="text-white font-semibold">biologie</span> qu'on ne vous a jamais expliquée.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center leading-tight">
            La vérité sur votre <span className="text-electric">métabolisme nocturne</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["Chaque nuit, votre corps a une fenêtre de 90 minutes où il brûle naturellement la graisse","5 habitudes simples suffisent à l'activer ce soir","Sans régime, sans sport, sans sacrifice"].map((s, i) => (
              <div key={i} className="rounded-xl bg-navy-card border border-border p-6">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-electric text-white font-black">{i + 1}</div>
                <p className="mt-4 text-base sm:text-lg leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-electric/15 border border-electric/50 p-6 sm:p-8 text-center">
            <p className="text-lg sm:text-2xl font-bold leading-relaxed">
              Les femmes qui appliquent ce protocole perdent en moyenne{" "}
              <span className="text-electric">3 à 5 kg le premier mois</span> — sans changer leur alimentation.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-navy-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center">
            Elles l'ont testé. <span className="text-electric">Voici leurs résultats.</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <BeforeAfter name="Sophie M." quote="J'ai perdu 4 kg en 3 semaines sans rien changer à mon alimentation. Je dors mieux et je me réveille en forme." />
            <BeforeAfter name="Laura K." quote="Après 3 enfants, je pensais que c'était impossible. -6 kg en 6 semaines, et surtout : plus de fatigue le matin." />
            <BeforeAfter name="Isabelle T." quote="J'ai 52 ans. -8 kg en 2 mois. La ménopause n'est plus une fatalité." />
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center leading-tight">
            Ce que vous allez apprendre dans le programme
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {modules.map((m) => (
              <div key={m.n} className="relative rounded-xl bg-navy-card border-l-4 border-electric border-y border-r border-y-border border-r-border p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-electric font-black text-2xl">{m.n}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{m.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                      <Check className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-navy-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center">
            Ce que vous recevez <span className="text-electric">aujourd'hui</span>
          </h2>
          <div className="mt-10 mb-8 flex justify-center">
            <img
              src="/cover.png"
              alt="La Fenêtre Thermogénique Féminine — couverture"
              className="w-64 sm:w-80 rounded-2xl shadow-[0_0_40px_-10px_rgba(43,107,255,0.6)] border border-electric/30"
            />
          </div>
          <ul className="mt-10 space-y-4">
            {["Programme complet La Fenêtre Thermogénique (6 modules)","Guide PDF téléchargeable (60 pages)","Checklist soir imprimable (routine en 5 étapes)","Liste des aliments thermogéniques","Accès à vie aux mises à jour","Groupe privé de soutien"].map((it) => (
              <li key={it} className="flex items-start gap-3 rounded-lg bg-navy-card border border-border p-4">
                <Check className="h-6 w-6 text-electric shrink-0" />
                <span className="text-base sm:text-lg">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 p-6 sm:p-8 text-center">
          <p className="text-lg sm:text-2xl font-extrabold uppercase tracking-wide">
            ⚠ Attention : Prix de lancement à 17,80€
          </p>
          <p className="mt-2 text-sm sm:text-base opacity-90">
            Offre valable jusqu'au {deadline ? deadline.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "…"}
          </p>
          <div className="mt-6">
            {deadline && <Countdown targetDate={deadline} />}
          </div>
        </div>
      </section>

      <section id="order" className="px-4 py-20">
        <div className="max-w-2xl mx-auto rounded-2xl bg-navy-card border-2 border-electric p-6 sm:p-10 shadow-[0_0_60px_-15px_rgba(43,107,255,0.5)]">
          <h2 className="text-2xl sm:text-3xl font-black text-center">Votre commande</h2>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground line-through">Prix normal : 47€</p>
            <p className="mt-2 text-4xl sm:text-5xl font-black">
              Prix de lancement : <span className="text-electric">17,80€</span>
            </p>
            <p className="mt-2 text-success text-sm font-semibold">✓ Accès immédiat dès le paiement</p>
          </div>

          <div className="mt-8 space-y-3">
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setShowStripe(false); }}
              placeholder="Nom complet"
              className="w-full rounded-lg bg-navy border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-electric"
            />
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value); setShowStripe(false); }}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-navy border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-electric"
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg bg-navy border border-border px-4 py-3 text-white focus:outline-none focus:border-electric"
            >
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="LU">Luxembourg</option>
              <option value="CA">Canada</option>
              <option value="OTHER">Autre</option>
            </select>
          </div>

          <label className="mt-6 block cursor-pointer rounded-xl border-2 border-dashed border-electric bg-electric/10 p-5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={bump}
                onChange={(e) => { setBump(e.target.checked); setShowStripe(false); }}
                className="mt-1 h-5 w-5 accent-[#2b6bff]"
              />
              <div>
                <p className="font-bold text-electric uppercase tracking-wide text-sm">
                  Oui, j'ajoute le Pack Accélérateur à 7,80€
                </p>
                <p className="mt-2 font-extrabold text-white text-base">
                  <Zap className="inline h-4 w-4 text-gold" /> PACK ACCÉLÉRATEUR — Résultats x2 en 14 jours
                </p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>• Séance audio guidée d'endormissement thermogénique (20 min)</li>
                  <li>• Plan repas 7 jours spécial Fenêtre Thermogénique</li>
                  <li>• Tracker de sommeil et perte de poids (Excel + PDF)</li>
                </ul>
                <p className="mt-3 text-sm">
                  <span className="font-bold text-white">+7,80€ seulement</span>{" "}
                  <span className="text-muted-foreground">(valeur réelle : 37€)</span>
                </p>
              </div>
            </div>
          </label>

          <div className="mt-6 rounded-lg bg-navy border border-border p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-black text-xl text-electric">{total.toFixed(2).replace(".", ",")}€</span>
            </div>
          </div>

          <div className="mt-6">
            {!showStripe ? (
              <button
                onClick={() => setShowStripe(true)}
                className="pulse-cta w-full inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-6 py-4 text-base sm:text-lg font-extrabold uppercase tracking-wide text-white hover:brightness-110 transition"
              >
                <Lock className="h-5 w-5" />
                Procéder au paiement sécurisé
              </button>
            ) : (
              <StripeCheckout
                mode="main"
                redirectTo="/upsell"
                buttonLabel="Oui, j'accède au programme"
                email={email}
                name={name}
                orderBump={bump}
              />
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-navy-light">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-success/40 bg-success/5 p-8">
          <ShieldCheck className="h-14 w-14 text-success mx-auto" />
          <h3 className="mt-4 text-2xl sm:text-3xl font-black">Satisfaite ou Remboursée — 30 jours</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Si vous ne voyez aucun résultat en 30 jours, je vous rembourse intégralement. Point final.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-10">Questions fréquentes</h2>
          <FAQ items={faq} />
        </div>
      </section>

      <section className="px-4 py-20 bg-navy-light text-center">
        <p className="text-electric font-bold uppercase tracking-widest text-sm">Dernière chance</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black max-w-2xl mx-auto">
          Rejoignez le programme au prix de lancement
        </h2>
        <div className="mt-8">
          <CTAButton>Je veux mon accès maintenant</CTAButton>
        </div>
      </section>

      <footer className="px-4 py-10 text-center text-xs text-muted-foreground border-t border-border">
        <p className="flex items-center justify-center gap-2">
          <Lock className="h-3 w-3" /> Paiement 100% sécurisé — © {new Date().getFullYear()} La Fenêtre Thermogénique
        </p>
      </footer>
    </main>
  );
}



