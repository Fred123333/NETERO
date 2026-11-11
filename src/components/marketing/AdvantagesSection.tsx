import { Zap, Database, Sparkles, Unlock } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";

const advantages = [
  {
    icon: Zap,
    title: "Vitesse x10",
    desc: "Basculez d'une idée à un produit commercialisable avec checkout Stripe fonctionnel le jour même.",
  },
  {
    icon: Database,
    title: "Architecture Modulaire",
    desc: "Composants découplés : activez ou retirez Supabase, Prisma, Resend ou PostHog en 1 variable d'environnement.",
  },
  {
    icon: Sparkles,
    title: "IA Native & SDKs",
    desc: "Gestion fine du streaming, rate-limiting de tokens et fallbacks de modèles Claude 3.5 Sonnet & GPT-4o intégrés.",
  },
  {
    icon: Unlock,
    title: "100% Votre Propriété",
    desc: "Zéro abonnement déguisé pour votre code. Hébergez sur Vercel, AWS, Fly.io ou votre propre VPS sans contrainte.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="w-full px-gutter py-space-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-space-xl">
            <h2 className="text-primary-text text-lg">PERFORMANCE MEDICALE</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Pourquoi les top builders choisissent NETERO
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="p-space-lg bg-surface-container rounded-xl shadow-md hover:bg-surface-container-high transition-transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-text mb-space-md">
                <a.icon size={22} />
              </div>
              <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                {a.title}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}