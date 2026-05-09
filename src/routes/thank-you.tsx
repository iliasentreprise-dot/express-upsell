import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Bienvenue dans le programme !" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <main className="min-h-screen bg-navy text-white flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <CheckCircle2 className="h-20 w-20 text-success mx-auto" />
        <h1 className="mt-6 text-4xl sm:text-5xl font-black">🎉 Bienvenue dans le programme !</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Vérifiez votre boîte email dans les <span className="text-white font-semibold">2 prochaines minutes</span>.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Des questions ?{" "}
          <a href="mailto:contact@fenetre-thermogenique.com" className="text-electric underline">
            contact@fenetre-thermogenique.com
          </a>
        </p>
        <Link to="/" className="mt-10 inline-block text-sm text-electric hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}


