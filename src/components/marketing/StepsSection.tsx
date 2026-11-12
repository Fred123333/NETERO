import { SectionBadge } from "@/components/shared/SectionBadge";

const steps = [
  {
    n: "01",
    title: "Choisissez votre stack",
    desc: "Sélectionnez l'un de nos templates de départ selon vos besoins métier : B2B SaaS, outil IA ou marketplace créateurs.",
    code: "netero select --template=saas-ai",
  },
  {
    n: "02",
    title: "Générez avec l'agent IA",
    desc: "Décrivez vos spécificités métier en langage naturel. Le CLI NETERO configure les modèles de données et la logique applicative.",
    code: 'netero generate crud "TeamWorkspace"',
  },
  {
    n: "03",
    title: "Déployez en 1 clic",
    desc: "Connectez votre repository à Vercel, Supabase et Stripe. Toutes les variables d'environnement sont synchronisées automatiquement.",
    code: "git push origin main && deployed!",
  },
];

export function StepsSection() {
  return (
    <section className="w-full px-gutter py-space-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-space-xl">
          <h2 className="text-primary-text text-lg">FLUX DE TRAVAIL</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            De zéro au premier client en 3 étapes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
          {steps.map((s) => (
            <div key={s.n} className="p-space-lg bg-surface-container rounded-2xl shadow-md relative">
              <div
                className={
                  s.n === "02"
                    ? "font-display-hero text-display-hero text-[#FFD700] select-none"
                    : "font-display-hero text-display-hero text-on-surface-variant/30 select-none"
                }
              >
                {s.n}
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-space-xs">
                {s.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                {s.desc}
              </p>
              <div className="mt-space-md p-space-sm bg-surface-container-high rounded-lg font-code text-code-snippet text-on-surface-variant">
                {s.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}