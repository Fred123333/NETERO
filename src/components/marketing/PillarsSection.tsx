import { Network, Brain, BadgeCheck, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";

const pillars = [
  {
    icon: Network,
    tag: "PILIER 01",
    tagHighlight: false,
    title: "Boilerplates FullStack Next.js 15",
    description:
      "Des templates ultra-robustes conçus avec le standard de l'industrie : gestion d'authentification sans faille, facturation Stripe avec portail client, modèle multi-tenancy étanche et typage TypeScript absolu.",
    features: [
      "Next.js 15 App Router avec Server Actions et Partial Prerendering",
      "Multi-tenancy prêt à l'échelle (slugs personnalisés, rôles RBAC)",
      "Optimisation SEO technique, metadata dynamiques et OpenGraph automatiques",
      "Postgres & Prisma ORM configurés avec migrations reproductibles",
    ],
    footer: "Code auditable • 0 dépendance superflue",
  },
  {
    icon: Brain,
    tag: "PILIER 02",
    tagHighlight: true,
    title: "Générateur Assisté par IA",
    description:
      "Un agent intelligent branché directement sur votre repo : il comprend votre schéma de données, génère des routes d'API, compose les interfaces d'administration et écrit vos tests unitaires en temps réel.",
    features: [
      "Scaffolding instantané via CLI & interface web assistée",
      "Génération de CRUD bout-en-bout : UI, Validation Zod & requêtes DB",
      "Connecteurs natifs OpenAI, Anthropic Claude & Mistral SDK",
      "Architecte virtuel corrigeant les vulnérabilités avant commit",
    ],
    footer: "Compatible Cursor, VS Code & Zed",
  },
];

export function PillarsSection() {
  return (
    <section className="w-full px-gutter py-space-xl bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="mb-space-xl max-w-2xl">
          <h2 className="text-primary-text text-xl">Deux Pilers Fondateurs</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            L&apos;architecture ultime au service de l&apos;autonomie totale.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Fini les compromis entre code fait-main fastidieux et solutions no-code fermées. NETERO
            réunit la rigueur d&apos;un code source haut de gamme et l&apos;accélération d&apos;un
            copilote dédié.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {pillars.map((p) => (
            <div
              key={p.tag}
              className="p-space-xl bg-surface-container rounded-2xl shadow-xl hover:bg-surface-container-high transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-text mb-space-lg shadow-sm">
                  <p.icon size={28} />
                </div>
                <div
                  className={`inline-flex px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm mb-space-sm ${
                    p.tagHighlight ? "text-primary-text" : "text-on-surface-variant"
                  }`}
                >
                  {p.tag}
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  {p.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                  {p.description}
                </p>
                <ul className="mt-space-lg space-y-space-sm">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface"
                    >
                      <BadgeCheck size={18} className="text-primary-text shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-space-xl pt-space-md flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {p.footer}
                </span>
                <ArrowRight className="text-primary-text" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}