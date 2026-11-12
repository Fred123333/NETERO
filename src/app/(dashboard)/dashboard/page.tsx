import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FolderKanban,
  Layers,
  Star,
  Zap,
  Sparkles,
  CheckCircle2,
  Activity,
  Database,
  ShieldCheck,
  Code2,
  Plus,
  Boxes,
  Clock,
  GitBranch,
  Cpu,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

const stats = [
  {
    label: "Projets créés",
    value: "07",
    hint: "+2 ce mois-ci",
    icon: FolderKanban,
    accent: false,
  },
  {
    label: "Boilerplates acquis",
    value: "12",
    hint: "Dernier téléchargé v2_14",
    icon: Layers,
    accent: false,
  },
  {
    label: "Favoris épinglés",
    value: "05",
    hint: "Prêts au déploiement",
    icon: Star,
    accent: false,
  },
  {
    label: "Crédits IA",
    value: "85",
    hint: "sur 100 restants",
    icon: Zap,
    accent: true,
  },
];

const projects = [
  {
    name: "pulse-ai-copilot",
    version: "v1.4",
    stack: "Next.js 15 • Supabase • OpenAI • Tailwind",
    status: "Déployé Vercel",
    tone: "success" as const,
    commit: "il y a 8 min",
    icon: Sparkles,
  },
  {
    name: "nexus-commerce",
    version: "v2.0",
    stack: "Next.js 14 • Stripe • Prisma • PostgreSQL",
    status: "En cours d'IA",
    tone: "warning" as const,
    commit: "il y a 2 h",
    icon: Boxes,
  },
  {
    name: "argos-b2b-portal",
    version: "v0.9",
    stack: "Next.js App Router • Clerk Auth • tRPC",
    status: "Local CLI Staging",
    tone: "info" as const,
    commit: "hier",
    icon: ShieldCheck,
  },
];

const quota = [
  { label: "Génération de composants", credits: 9, color: "bg-[#FFD700]" },
  { label: "Architectures backend Prisma", credits: 5, color: "bg-[#E9C400]" },
  { label: "Audit sécurité & TypeScript", credits: 2, color: "bg-[#B89800]" },
];

const pipeline = [
  {
    step: "01",
    title: "Analyse sémantique & modélisation",
    description:
      "Le moteur découpe votre prompt, isole les entités relationnelles, normalise les tables BDD et choisit les patterns d'état (Client vs Server Components).",
    output: "AST schema & API Map",
    icon: Cpu,
  },
  {
    step: "02",
    title: "Scaffolding Next.js 15 App Router",
    description:
      "Génération complète de l'architecture : Server Actions, middlewares auth, routes protégées, composants UI Tailwind et connecteurs backend.",
    output: "48+ fichiers sources clean",
    icon: Code2,
  },
  {
    step: "03",
    title: "Validation typage & linting strict",
    description:
      "Exécution d'un sandbox de compilation : `tsc --noEmit` et ESLint sont vérifiés avec zéro warning avant livraison de l'archive ou du push CI.",
    output: "100% Type-Safe garanti",
    icon: ShieldCheck,
  },
];

const suggestions = [
  {
    title: "SaaS B2B Multi-Tenant",
    description: "Organisations isolées, facturation et routing subdomain dynamique.",
    tags: ["Next 15", "Prisma", "RBAC"],
    rating: "4.96",
    icon: Layers,
  },
  {
    title: "Copilote Conversationnel",
    description: "Streaming LLM en temps réel, contexte mémoire, RAG vector et Tool Calling.",
    tags: ["AI SDK", "Edge", "pgvector"],
    rating: "4.91",
    icon: Sparkles,
  },
  {
    title: "Marketplace Numérique",
    description: "Catalogue digital, panier persistant, Stripe Connect et actifs chiffrés.",
    tags: ["Stripe", "SSR", "ISR"],
    rating: "4.90",
    icon: Boxes,
  },
];

const toneClasses: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  warning: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/25",
  info: "bg-sky-500/10 text-sky-400 border-sky-500/25",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* En-tête */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-label-sm text-label-sm font-semibold uppercase tracking-wide text-[#FFD700]">
            Workspace / Accueil
          </p>
          <h1 className="mt-1 font-headline-lg text-[28px] font-bold tracking-tight text-on-surface sm:text-headline-lg">
            Bon retour, Alexandre
          </h1>
          <p className="mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
            Votre environnement de développement Next.js est synchronisé.{" "}
            <span className="font-semibold text-on-surface">85 crédits</span> d&apos;orchestration
            IA disponibles jusqu&apos;au 31 mai.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/boilerplates"
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            Explorer le catalogue
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/dashboard/generateur"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] shadow-lg transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Nouveau projet IA
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 ${
                s.accent
                  ? "border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-surface-container"
                  : "border-outline-variant/20 bg-surface-container"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  {s.label}
                </span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    s.accent
                      ? "bg-[#FFD700]/15 text-[#FFD700]"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  <Icon size={16} />
                </span>
              </div>
              <div className="mt-2 font-headline-lg text-3xl font-bold text-on-surface">
                {s.value}
                {s.accent && <span className="text-lg text-on-surface-variant">/100</span>}
              </div>
              <div className="mt-1 font-body-sm text-[11px] text-on-surface-variant">{s.hint}</div>
              {s.accent && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
                  <div className="h-full w-[85%] rounded-full bg-[#FFD700]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Générateur IA */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-gradient-to-br from-surface-container-high to-surface-container p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] opacity-[0.06] [background-size:22px_22px]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/25 bg-[#FFD700]/10 px-2.5 py-1 font-label-sm text-[10px] font-semibold uppercase tracking-wide text-[#FFD700]">
              <Sparkles size={12} />
              NetZero Core v2.4 Engine
            </span>
            <span className="font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
              Prompt-to-production
            </span>
          </div>
          <h2 className="mt-3 font-headline-md text-headline-md font-bold text-on-surface">
            Générateur d&apos;applications assisté par IA
          </h2>
          <p className="mt-1 max-w-2xl font-body-sm text-body-sm text-on-surface-variant">
            Décrivez vos besoins fonctionnels et obtenez une application Next.js 15 FullStack
            complète en quelques instants.
          </p>

          <div className="mt-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-code text-[10px] uppercase tracking-wide text-on-surface-variant">
                Prompt spec v2.4.md
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">IA</span>
            </div>
            <textarea
              rows={3}
              placeholder="Ex : Je veux un SaaS de gestion d'équipe pour freelances avec facturation Stripe, authentification Supabase et tableau de bord de métriques..."
              className="w-full resize-none bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                {["Schéma Prisma / SQL", "Wireframe / Maquette", "Configurer le projet"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1 rounded-full border border-outline-variant/40 bg-surface-container px-2.5 py-1 font-body-sm text-[11px] text-on-surface-variant"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
              <Link
                href="/dashboard/generateur"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
              >
                Lancer la génération
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Projets + quota */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container lg:col-span-2">
          <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 px-5 py-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Derniers projets &amp; activités
              </h2>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                3 projets actifs sur votre workspace
              </p>
            </div>
            <Link
              href="/dashboard/projets"
              className="inline-flex items-center gap-1 font-label-sm text-[12px] font-semibold text-[#FFD700] hover:underline"
            >
              Voir tous les projets
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-outline-variant/15">
            {projects.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-surface-container-high sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-highest text-[#FFD700]">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-label-md text-label-md font-semibold text-on-surface">
                          {p.name}
                        </span>
                        <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant">
                          {p.version}
                        </span>
                      </div>
                      <div className="mt-0.5 truncate font-body-sm text-[11px] text-on-surface-variant">
                        {p.stack}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-label-sm text-[10px] font-semibold ${toneClasses[p.tone]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                    <span className="hidden items-center gap-1 font-body-sm text-[11px] text-on-surface-variant md:inline-flex">
                      <Clock size={12} />
                      {p.commit}
                    </span>
                    <Link
                      href="/dashboard/projets"
                      className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/40 px-2.5 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
                    >
                      <GitBranch size={12} />
                      Détails
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 px-5 py-4">
            <Activity size={16} className="text-[#FFD700]" />
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Utilisation du quota
            </h2>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-between">
              <div className="font-headline-lg text-3xl font-bold text-on-surface">
                85<span className="text-base text-on-surface-variant">/100</span>
              </div>
              <span className="font-body-sm text-[11px] text-on-surface-variant">restants</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#E9C400] to-[#FFD700]" />
            </div>

            <ul className="mt-5 space-y-3">
              {quota.map((q) => (
                <li key={q.label}>
                  <div className="flex items-center justify-between font-body-sm text-[12px]">
                    <span className="text-on-surface-variant">{q.label}</span>
                    <span className="font-semibold text-on-surface">{q.credits} crédits</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
                    <div
                      className={`h-full rounded-full ${q.color}`}
                      style={{ width: `${(q.credits / 16) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-2.5">
              <div>
                <div className="font-label-sm text-[11px] font-semibold text-on-surface">
                  Recharge automatique
                </div>
                <div className="font-body-sm text-[10px] text-on-surface-variant">
                  Activée à &lt; 10 crédits
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-label-sm text-[10px] font-semibold text-emerald-400">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="font-label-sm text-[11px] uppercase tracking-wide text-[#FFD700]">
              Pipeline de compilation
            </p>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Comment fonctionne le moteur de génération NETERO
            </h2>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-label-sm text-[10px] font-semibold text-emerald-400 sm:inline-flex">
            <CheckCircle2 size={12} />
            Système optimal
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pipeline.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                className="group relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container p-5 transition-colors hover:border-[#FFD700]/30 hover:bg-surface-container-high"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline-lg text-2xl font-bold text-on-surface-variant/25">
                    {p.step}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-highest text-[#FFD700]">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="mt-3 font-label-md text-label-md font-bold text-on-surface">
                  {p.title}
                </h3>
                <p className="mt-1.5 font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                  {p.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-surface-container-lowest px-2 py-1 font-code text-[10px] text-[#FFD700]">
                  <Database size={11} />
                  {p.output}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="font-label-sm text-[11px] uppercase tracking-wide text-[#FFD700]">
              Sélection rapide par gabarit technique
            </p>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Suggestions de boilerplates recommandés
            </h2>
          </div>
          <Link
            href="/dashboard/boilerplates"
            className="inline-flex items-center gap-1 font-label-sm text-[12px] font-semibold text-[#FFD700] hover:underline"
          >
            Voir la bibliothèque (48 modèles)
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {suggestions.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl border border-outline-variant/20 bg-surface-container p-5 transition-colors hover:border-[#FFD700]/30 hover:bg-surface-container-high"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-highest text-[#FFD700]">
                    <Icon size={18} />
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-[11px] font-semibold text-[#FFD700]">
                    <Star size={12} className="fill-[#FFD700]" />
                    {s.rating}
                  </span>
                </div>
                <h3 className="mt-3 font-label-md text-label-md font-bold text-on-surface">
                  {s.title}
                </h3>
                <p className="mt-1 flex-1 font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                  {s.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-outline-variant/30 bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/dashboard/boilerplates"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  Consulter les détails
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLI */}
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-label-md text-label-md font-bold text-on-surface">
              Dernière synchronisation CLI
            </h3>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              il y a 14 minutes via macbook-pro-alexandre.local
            </p>
          </div>
          <div className="w-full sm:max-w-md">
            <CopyButton text="npx netero-cli clone saas-ai-copilot" />
          </div>
        </div>
      </div>
    </div>
  );
}
