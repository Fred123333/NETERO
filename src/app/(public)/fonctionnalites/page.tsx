import Link from "next/link";
import {
  Zap,
  Brain,
  Shield,
  Layers,
  Code2,
  Rocket,
  Database,
  Palette,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";

const mainFeatures = [
  {
    icon: Brain,
    title: "Générateur IA natif",
    description:
      "Un agent intelligent qui comprend votre schéma Prisma et génère du code TypeScript typé, testé et prêt pour la production.",
    bullets: [
      "Génération de CRUD complets (UI + Zod + DB)",
      "Compréhension de votre AST et de vos modèles",
      "Connecteurs OpenAI, Anthropic, Mistral",
    ],
  },
  {
    icon: Layers,
    title: "Boilerplates modulaires",
    description:
      "Des architectures découplées où chaque module (Supabase, Stripe, Resend, PostHog) s'active ou se retire via une variable d'environnement.",
    bullets: [
      "Activation par module en 1 variable",
      "Zéro dépendance superflue",
      "Code source 100% auditable",
    ],
  },
  {
    icon: Shield,
    title: "Sécurité entreprise",
    description:
      "Authentification robuste (Auth.js v5, SAML SSO, magic links), RBAC granulaire et audit logs complets.",
    bullets: [
      "Auth.js v5 + providers OAuth",
      "SAML SSO pour les grands comptes",
      "Sessions JWT chiffrées, headers sécurisés",
    ],
  },
  {
    icon: Database,
    title: "Données & Prisma",
    description:
      "Schémas multitenant optimisés pour PostgreSQL (Supabase, Neon), indexation vectorielle `pgvector` prête pour le RAG.",
    bullets: [
      "Migrations reproductibles",
      "Multi-tenancy prêt à l'échelle",
      "pgvector pour la recherche sémantique",
    ],
  },
  {
    icon: Palette,
    title: "Design System complet",
    description:
      "Composants Shadcn/UI personnalisés, thème Obsidian avec dorures, toggle dark/light sans flash de contenu.",
    bullets: [
      "Composants Shadcn pré-intégrés",
      "Tokens CSS centralisés",
      "Responsive mobile / tablette / desktop",
    ],
  },
  {
    icon: Rocket,
    title: "Déploiement 1-clic",
    description:
      "Compatible Vercel, Railway, Coolify, Docker Compose, AWS. Toutes les variables d'environnement synchronisées automatiquement.",
    bullets: [
      "Compatible Vercel / AWS / Fly.io",
      "Docker Compose inclus",
      "CI/CD préconfiguré",
    ],
  },
];

const comparison = [
  { feature: "Code source complet", starter: true, ai: true, enterprise: true },
  { feature: "Générateur IA", starter: false, ai: true, enterprise: true },
  { feature: "Multi-tenancy", starter: false, ai: true, enterprise: true },
  { feature: "SAML SSO", starter: false, ai: false, enterprise: true },
  { feature: "Audit logs", starter: false, ai: false, enterprise: true },
  { feature: "Support prioritaire", starter: false, ai: true, enterprise: true },
];

export default function FonctionnalitesPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative w-full overflow-hidden px-gutter pt-space-xl pb-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-surface-container-highest/60 blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionBadge label="Fonctionnalités" variant="primary" />
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero mt-space-md text-on-surface font-bold tracking-tight text-balance">
            Tout ce dont vous avez besoin pour{" "}
            <span className="text-[#FFD700]">expédier vite.</span>
          </h1>
          <p className="mt-space-lg font-body-lg text-body-lg text-secondary-fixed-dim max-w-2xl mx-auto text-balance">
            Une plateforme complète qui réunit l'architecture Next.js 15, la
            sécurité entreprise et un agent IA spécialisé dans la génération de
            code production-ready.
          </p>
          <div className="mt-space-xl flex flex-col sm:flex-row items-center justify-center gap-space-md">
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center gap-space-xs px-6 py-3.5 bg-[#FFD700] text-[#171717] font-label-md text-label-md font-semibold rounded-lg shadow-xl hover:bg-[#e9c400] transition-transform active:scale-95"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/boilerplates"
              className="inline-flex items-center justify-center gap-space-xs px-6 py-3.5 bg-surface-container text-on-surface font-label-md text-label-md font-medium rounded-lg shadow-md hover:bg-surface-container-high transition-colors"
            >
              <span>Explorer les boilerplates</span>
              <Code2 size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* GRILLE 6 FONCTIONNALITÉS */}
      <section className="w-full px-gutter py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-space-xl">
            <SectionBadge label="Sous le capot" variant="primary" />
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
              Six piliers techniques, une seule plateforme
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {mainFeatures.map((f) => (
              <div
                key={f.title}
                className="p-space-lg bg-surface-container rounded-2xl border border-outline-variant/20 shadow-md hover:bg-surface-container-high transition-colors flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-[#FFD700] mb-space-md">
                  <f.icon size={24} />
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {f.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  {f.description}
                </p>
                <ul className="mt-space-md space-y-space-xs">
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface"
                    >
                      <Check
                        size={14}
                        className="text-[#FFD700] shrink-0 mt-1"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIF */}
      <section className="w-full px-gutter py-space-xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-space-xl">
            <SectionBadge label="Comparatif" variant="primary" />
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
              Ce que vous obtenez dans chaque offre
            </h2>
          </div>
          <div className="rounded-2xl bg-surface-container border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="text-left px-space-md py-space-sm font-label-md text-label-md text-on-surface">
                    Fonctionnalité
                  </th>
                  <th className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant">
                    Free
                  </th>
                  <th className="px-space-md py-space-sm font-label-md text-label-md text-[#FFD700]">
                    Mensuel
                  </th>
                  <th className="px-space-md py-space-sm font-label-md text-label-md text-[#FFD700]">
                    À vie
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr
                    key={c.feature}
                    className="border-t border-outline-variant/20"
                  >
                    <td className="px-space-md py-space-sm text-on-surface">
                      {c.feature}
                    </td>
                    <td className="px-space-md py-space-sm text-center">
                      {c.starter ? (
                        <Check size={18} className="text-[#FFD700] mx-auto" />
                      ) : (
                        <span className="text-on-surface-variant/40">—</span>
                      )}
                    </td>
                    <td className="px-space-md py-space-sm text-center">
                      {c.ai ? (
                        <Check size={18} className="text-[#FFD700] mx-auto" />
                      ) : (
                        <span className="text-on-surface-variant/40">—</span>
                      )}
                    </td>
                    <td className="px-space-md py-space-sm text-center">
                      {c.enterprise ? (
                        <Check size={18} className="text-[#FFD700] mx-auto" />
                      ) : (
                        <span className="text-on-surface-variant/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="w-full px-gutter pb-space-xl">
        <div className="max-w-4xl mx-auto p-space-xl rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container border border-[#FFD700]/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] opacity-10 [background-size:20px_20px] pointer-events-none" />
          <div className="relative z-10">
            <Sparkles
              size={32}
              className="text-[#FFD700] mx-auto mb-space-sm"
            />
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Prêt à expédier votre prochain SaaS ?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm max-w-xl mx-auto">
              Rejoignez 4,800+ développeurs qui construisent plus vite avec
              NETERO. Commencez gratuitement, aucune carte requise.
            </p>
            <div className="mt-space-lg flex flex-col sm:flex-row justify-center gap-space-sm">
              <Link
                href="/inscription"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD700] text-[#171717] font-label-md font-semibold rounded-lg shadow-lg hover:bg-[#e9c400] transition-transform active:scale-95"
              >
                <Zap size={18} />
                Créer un compte gratuit
              </Link>
              <Link
                href="/#tarifs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface font-label-md font-medium rounded-lg hover:bg-surface-bright transition-colors"
              >
                Voir les tarifs
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}