import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  BrainCircuit,
  Check,
  Cpu,
  Database,
  Globe,
  KeyRound,
  Palette,
  ShieldCheck,
  Sparkles,
  Store,
  Terminal,
  Zap,
} from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatusPill } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Générateur IA — NETERO",
};

const steps = [
  { step: "01", title: "Spécification & prompt", state: "done" },
  { step: "02", title: "Architecture & paramètres", state: "active" },
  { step: "03", title: "Génération & déploiement", state: "todo" },
];

const architectures = [
  {
    title: "SaaS B2B Multi-Tenant",
    description: "Organisations isolées, facturation récurrente et rôles avancés.",
    icon: Boxes,
    active: true,
  },
  {
    title: "E-commerce Headless",
    description: "Catalogue, panier persistant et paiements Stripe Connect.",
    icon: Store,
    active: false,
  },
  {
    title: "IA & Copilote Agentic",
    description: "Streaming LLM, RAG vectoriel et orchestration d'agents.",
    icon: BrainCircuit,
    active: false,
  },
  {
    title: "API & Micro-services",
    description: "Passerelle Edge, rate limiting et documentation OpenAPI.",
    icon: Globe,
    active: false,
  },
];

const stackRows = [
  { label: "Framework Core", value: "Next.js 15.2 App Router", icon: Cpu },
  { label: "Base de données & ORM", value: "PostgreSQL 16 + Prisma ORM", icon: Database },
  { label: "Passerelle de paiement", value: "Stripe Billing (abonnements)", icon: KeyRound },
  { label: "Authentification", value: "Auth.js v5 (OAuth + magic link)", icon: ShieldCheck },
  { label: "Styling & UI", value: "Tailwind v4 + shadcn/ui", icon: Palette },
  { label: "Emails transactionnels", value: "Resend + React Email", icon: Terminal },
];

const modules = [
  { label: "RBAC & permissions granulaires", enabled: true },
  { label: "Mode sombre / clair persistant", enabled: true },
  { label: "RAG vectoriel (pgvector)", enabled: true },
  { label: "Webhooks Stripe signés", enabled: true },
  { label: "Analytics temps réel (Posthog)", enabled: false },
  { label: "Support multi-langue (i18n)", enabled: false },
];

const config = [
  { key: "APP_NAME", value: "TaskPulse-SaaS" },
  { key: "RUNTIME", value: "nodejs-lts" },
  { key: "DATABASE", value: "postgres-prisma" },
  { key: "AUTH_ENGINE", value: "authjs-v5" },
  { key: "STYLING", value: "tailwind-v4" },
  { key: "MODULES", value: "rbac,rag,stripe" },
];

const recommendations = [
  { title: "SaaS AI Copilot Starter", rating: "4.9", href: "/dashboard/boilerplates/saas-ai-copilot" },
  { title: "B2B Multi-Tenant Platform", rating: "4.8", href: "/dashboard/boilerplates/b2b-multi-tenant" },
  { title: "Nexus Enterprise Engine", rating: "4.9", href: "/dashboard/boilerplates/nexus-enterprise" },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        enabled ? "justify-end bg-[#FFD700]" : "justify-start bg-surface-container-highest"
      }`}
    >
      <span className={`h-4 w-4 rounded-full ${enabled ? "bg-[#171717]" : "bg-on-surface-variant"}`} />
    </span>
  );
}

export default function GenerateurPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Pipeline de création • Stage 02 / 03"
        title="Configuration du projet IA"
        description="Affinez l'architecture, la stack et les modules. Le moteur Netero Core compile ensuite une application Next.js 15 complète et typée."
        actions={
          <StatusPill tone="success">
            <Sparkles size={11} />
            Netero Core v2.4
          </StatusPill>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className={`flex items-center gap-3 rounded-xl border p-3 ${
              s.state === "active"
                ? "border-[#FFD700]/35 bg-[#FFD700]/5"
                : "border-outline-variant/20 bg-surface-container"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-headline-sm text-sm font-bold ${
                s.state === "done"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : s.state === "active"
                    ? "bg-[#FFD700]/15 text-[#FFD700]"
                    : "bg-surface-container-highest text-on-surface-variant"
              }`}
            >
              {s.state === "done" ? <Check size={16} /> : s.step}
            </span>
            <div className="min-w-0">
              <p className="font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
                Étape {s.step}
              </p>
              <p
                className={`truncate font-label-md text-[13px] font-semibold ${
                  s.state === "todo" ? "text-on-surface-variant" : "text-on-surface"
                }`}
              >
                {s.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="01 — Identité du projet"
              description="Ces informations seront utilisées pour le package npm et le dépôt Git."
              icon={<Sparkles size={18} />}
            />
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                  Nom de l&apos;application
                </span>
                <input
                  type="text"
                  defaultValue="TaskPulse-SaaS"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:border-[#FFD700]/50 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                  Slug URL
                </span>
                <input
                  type="text"
                  defaultValue="taskpulse-saas"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-code text-[12px] text-on-surface focus:border-[#FFD700]/50 focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                  Description courte
                </span>
                <textarea
                  rows={2}
                  defaultValue="SaaS de gestion de tâches d'équipe avec abonnements Stripe, rôles RBAC et assistant IA contextuel."
                  className="w-full resize-none rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:border-[#FFD700]/50 focus:outline-none"
                />
              </label>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="02 — Type d'architecture"
              description="Le choix détermine les patterns de données et les modules pré-installés."
              icon={<Boxes size={18} />}
            />
            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
              {architectures.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                      a.active
                        ? "border-[#FFD700]/40 bg-[#FFD700]/5"
                        : "border-outline-variant/25 bg-surface-container-lowest hover:bg-surface-container-high"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          a.active
                            ? "bg-[#FFD700]/15 text-[#FFD700]"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      {a.active && <Check size={16} className="text-[#FFD700]" />}
                    </div>
                    <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">{a.title}</h3>
                    <p className="mt-1 font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
                      {a.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="03 — Stack & technologies"
              description="Modifiez chaque brique de l'architecture générée."
              icon={<Cpu size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {stackRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-2 font-body-sm text-[12px] text-on-surface-variant">
                      <Icon size={14} className="text-[#FFD700]" />
                      {row.label}
                    </span>
                    <span className="font-code text-[11px] text-on-surface sm:text-right">{row.value}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="04 — Modules additionnels"
              description="Activez les fonctionnalités qui seront scaffoldées."
              icon={<Zap size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {modules.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="font-body-sm text-[12px] text-on-surface">{m.label}</span>
                  <Toggle enabled={m.enabled} />
                </div>
              ))}
            </div>
          </Panel>

          <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-surface-container px-5 py-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:text-on-surface cursor-pointer"
            >
              <ArrowLeft size={14} />
              Retour au prompt
            </Link>
            <Link
              href="/dashboard/projets"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-5 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 sm:w-auto cursor-pointer"
            >
              <Sparkles size={16} />
              Lancer la génération IA — 3 crédits
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <Panel className="border-[#FFD700]/25">
            <PanelHeader
              title="Configuration granulaire"
              description="Aperçu temps réel des variables générées."
              icon={<Terminal size={18} />}
              action={<StatusPill tone="warning">Live</StatusPill>}
            />
            <div className="space-y-2 p-5">
              {config.map((c) => (
                <div
                  key={c.key}
                  className="flex items-center justify-between gap-2 rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-2.5 py-1.5"
                >
                  <span className="font-code text-[10px] text-[#FFD700]">{c.key}</span>
                  <span className="truncate font-code text-[10px] text-on-surface-variant">{c.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Estimation de génération" icon={<Zap size={18} />} />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Coût de génération</span>
                <span className="font-semibold text-[#FFD700]">3 crédits</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Solde disponible</span>
                <span className="font-semibold text-on-surface">85 / 100</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Temps estimé</span>
                <span className="font-semibold text-on-surface">~ 45 s</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Recharge auto</span>
                <StatusPill tone="success">Active</StatusPill>
              </div>
              <div className="rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 font-body-sm text-[11px] text-on-surface-variant">
                Moteur : Netero-Engine v2.4 — Next.js 15 Deep Architect
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Gabarits recommandés" icon={<Sparkles size={18} />} />
            <div className="divide-y divide-outline-variant/15">
              {recommendations.map((r) => (
                <Link
                  key={r.title}
                  href={r.href}
                  className="flex items-center justify-between gap-2 px-5 py-3 transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  <span className="font-body-sm text-[12px] font-medium text-on-surface">{r.title}</span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-[11px] font-semibold text-[#FFD700]">
                    {r.rating}
                    <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
