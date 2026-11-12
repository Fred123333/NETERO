import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Download,
  ExternalLink,
  FileCode2,
  Gauge,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Users,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { PageHeader, Panel, PanelHeader, StatTile, StatusPill } from "@/components/dashboard/ui";
import { dashboardBoilerplates } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Détail du Boilerplate — NETERO",
};

export function generateStaticParams() {
  return dashboardBoilerplates.map((b) => ({ id: b.id }));
}

const features = [
  "Authentification complète (OAuth Google/GitHub, magic link, sessions JWT)",
  "Chat IA en streaming avec historique persistant et contexte long",
  "Facturation Stripe : abonnements, portail client, webhooks signés",
  "Base de données Prisma + PostgreSQL avec seed de démonstration",
  "Recherche vectorielle pgvector pour le RAG et la mémoire d'agent",
  "Rôles et permissions granulaires (RBAC) avec guards serveur",
  "Emails transactionnels Resend avec templates React Email",
  "Dashboard analytique avec graphiques temps réel",
];

const modules = [
  { name: "auth-core", files: 14, description: "Auth.js v5 + adapters Prisma" },
  { name: "ai-copilot", files: 22, description: "Streaming, tools et mémoire" },
  { name: "billing", files: 11, description: "Stripe subscriptions & webhooks" },
  { name: "dashboard", files: 18, description: "Layout app, charts et tables" },
  { name: "database", files: 9, description: "Schéma Prisma, migrations, seed" },
];

const stack = [
  "Next.js 15.2 App Router",
  "React 19 Server Components",
  "Auth.js v5",
  "Tailwind CSS v4 + shadcn/ui",
  "Prisma ORM + PostgreSQL",
  "Stripe Billing",
  "Vercel AI SDK",
  "pgvector",
];

const guarantees = [
  "Support technique prioritaire",
  "SLA de réponse < 4 h",
  "Audit dépendances automatique",
  "Licence commerciale illimitée",
  "Documentation interactive",
  "Accès Discord VIP",
];

export default async function BoilerplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boilerplate = dashboardBoilerplates.find((b) => b.id === id) ?? dashboardBoilerplates[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link
        href="/dashboard/boilerplates"
        className="inline-flex items-center gap-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:text-[#FFD700] cursor-pointer"
      >
        <ArrowLeft size={14} />
        Retour au catalogue
      </Link>

      <PageHeader
        eyebrow={`Template officiel • ${boilerplate.category}`}
        title={boilerplate.title}
        description={boilerplate.description}
        actions={
          <>
            <Link
              href={`/dashboard/projets/${boilerplate.id}`}
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <ExternalLink size={16} />
              Ouvrir l&apos;aperçu
            </Link>
            <Link
              href="/dashboard/generateur"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
            >
              <Download size={16} />
              Télécharger le ZIP
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusPill tone="success">Production Ready</StatusPill>
        <StatusPill tone="warning">{boilerplate.version}</StatusPill>
        <StatusPill tone="neutral">Licence Pro Active</StatusPill>
        <span className="inline-flex items-center gap-1 font-label-sm text-[12px] font-semibold text-[#FFD700]">
          <Star size={13} className="fill-[#FFD700]" />
          {boilerplate.rating}
          <span className="font-normal text-on-surface-variant">({boilerplate.reviews} avis)</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Temps d'installation" value="< 60s" hint="CLI + dépendances" icon={<Clock size={16} />} />
        <StatTile label="Score Lighthouse" value="100/100" hint="Performance & SEO" icon={<Gauge size={16} />} />
        <StatTile label="Mise à jour" value="Hebdo" hint="Dernier patch il y a 2 j" icon={<Sparkles size={16} />} />
        <StatTile label="Téléchargements" value="14.2k" hint="Communauté Netero" icon={<Download size={16} />} accent />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
        {["Fonctionnalités", "Modules", "Architecture", "Aperçu du code", "Notes de version"].map(
          (tab, i) => (
            <span
              key={tab}
              className={
                i === 0
                  ? "rounded-lg bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[12px] font-semibold text-[#FFD700]"
                  : "cursor-pointer rounded-lg px-3 py-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              }
            >
              {tab}
            </span>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Fonctionnalités incluses"
              description="Tout est pré-câblé, typé et testé dans un environnement de staging."
              icon={<CheckCircle2 size={18} />}
            />
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 p-5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body-sm text-[12px] text-on-surface-variant">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader
              title="Modules & architecture"
              description="Chaque module est découplé et documenté dans le README."
              icon={<Layers size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {modules.map((m) => (
                <div key={m.name} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-[#FFD700]">
                      <FileCode2 size={15} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-code text-[12px] font-semibold text-on-surface">
                        /{m.name}
                      </div>
                      <div className="truncate font-body-sm text-[11px] text-on-surface-variant">
                        {m.description}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded bg-surface-container-lowest px-2 py-0.5 font-code text-[10px] text-on-surface-variant">
                    {m.files} fichiers
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Démarrage rapide"
              description="Clonez et lancez le projet en moins d'une minute."
              icon={<Terminal size={18} />}
            />
            <div className="space-y-3 p-5">
              <div>
                <p className="mb-1.5 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Via la CLI Netero
                </p>
                <CopyButton text={`npx netero-cli clone ${boilerplate.id}`} label="Commande CLI :" />
              </div>
              <div>
                <p className="mb-1.5 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Via GitHub
                </p>
                <CopyButton
                  text={`git clone https://github.com/netero-labs/${boilerplate.id}.git`}
                  label="Dépôt Git :"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-2.5 py-1.5 font-body-sm text-[11px] text-on-surface-variant">
                  <Terminal size={12} /> pnpm install
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-2.5 py-1.5 font-body-sm text-[11px] text-on-surface-variant">
                  <Terminal size={12} /> pnpm dev
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-2.5 py-1.5 font-body-sm text-[11px] text-on-surface-variant">
                  <Terminal size={12} /> pnpm db:push
                </span>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Stack technique" icon={<Code2 size={18} />} />
            <div className="flex flex-wrap gap-1.5 p-5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-outline-variant/30 bg-surface-container-lowest px-2 py-1 font-code text-[10px] text-on-surface-variant"
                >
                  {s}
                </span>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Garanties & support" icon={<ShieldCheck size={18} />} />
            <ul className="space-y-2.5 p-5">
              {guarantees.map((g) => (
                <li key={g} className="flex items-start gap-2 font-body-sm text-[12px] text-on-surface-variant">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#FFD700]" />
                  {g}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/10 to-surface-container p-5">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-[#FFD700]" />
              <h3 className="font-label-md text-label-md font-bold text-on-surface">Code source</h3>
            </div>
            <p className="mt-1.5 font-body-sm text-[12px] text-on-surface-variant">
              Dépôt privé synchronisé avec votre compte. Dernier commit il y a 6 jours.
            </p>
            <div className="mt-3 flex items-center justify-between font-body-sm text-[11px] text-on-surface-variant">
              <span className="inline-flex items-center gap-1">
                <Users size={12} /> Accès collaborateur
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Synchronisé
              </span>
            </div>
            <Link
              href="/dashboard/projets"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              Voir mes projets
              <ArrowRight size={14} />
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}
