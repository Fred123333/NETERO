import type { Metadata } from "next";
import {
  Activity,
  CheckCircle2,
  Clock,
  Cpu,
  Download,
  History,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatTile, StatusPill } from "@/components/dashboard/ui";
import { historyRuns } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Historique des générations — NETERO",
};

const filters = [
  { label: "Tous (34)", active: true },
  { label: "Succès (33)", active: false },
  { label: "En cours (1)", active: false },
  { label: "Échoué (0)", active: false },
];

const logLines = [
  { time: "14:38:02", text: "Netero Core v2.4 — initialisation du pipeline", tone: "muted" as const },
  { time: "14:38:04", text: "Analyse sémantique du prompt terminée (1 420 AST)", tone: "muted" as const },
  { time: "14:38:07", text: "Scaffolding Next.js 15 App Router — 48 fichiers", tone: "gold" as const },
  { time: "14:38:11", text: "Génération du schéma Prisma & migrations", tone: "muted" as const },
  { time: "14:38:15", text: "Injection des modules RBAC, RAG et Stripe", tone: "muted" as const },
  { time: "14:38:19", text: "Exécution sandbox : tsc --noEmit", tone: "ok" as const },
  { time: "14:38:21", text: "Validation ESLint stricte — 0 warning", tone: "ok" as const },
  { time: "14:38:22", text: "Build de production en cours…", tone: "gold" as const },
];

function logTone(tone: "muted" | "gold" | "ok") {
  if (tone === "gold") return "text-[#FFD700]";
  if (tone === "ok") return "text-emerald-400";
  return "text-on-surface-variant";
}

export default function HistoriquePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Logs / V2.4 • Historique des générations IA"
        title="Historique des générations"
        description="Consultez chaque exécution du moteur : prompts, architecture générée, temps de build, consommation de crédits et statut de compilation."
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            <Download size={16} />
            Exporter le journal
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Générations totales" value="34" hint="depuis l'activation" icon={<History size={16} />} />
        <StatTile label="Taux de réussite" value="100%" hint="build validé" icon={<CheckCircle2 size={16} />} accent />
        <StatTile label="Lignes générées" value="48.5k" hint="code typé & linté" icon={<Terminal size={16} />} />
        <StatTile label="Exécutions en cours" value="01" hint="Argos-Portal v1.2" icon={<Loader2 size={16} />} />
      </div>

      <Panel className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <span
                key={f.label}
                className={
                  f.active
                    ? "cursor-pointer rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-[#FFD700]"
                    : "cursor-pointer rounded-full border border-outline-variant/30 bg-surface-container-lowest px-3 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                }
              >
                {f.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 font-body-sm text-[12px] text-on-surface-variant">
              <Clock size={14} />
              30 derniers jours
            </div>
            <div className="relative w-full sm:w-52">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest py-2 pl-9 pr-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-[#FFD700]/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 font-body-sm text-[12px] text-on-surface-variant transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              Filtres
            </button>
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader
          title="Exécutions récentes"
          description="Chaque ligne correspond à une génération complète du moteur."
          icon={<Activity size={18} />}
          action={<StatusPill tone="success">Moteur opérationnel</StatusPill>}
        />
        <div className="divide-y divide-outline-variant/15">
          {historyRuns.map((run) => (
            <div key={`${run.project}-${run.date}`} className="px-5 py-4 transition-colors hover:bg-surface-container-high">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label-md text-[13px] font-bold text-on-surface">{run.project}</span>
                    <span className="rounded bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant">
                      {run.category}
                    </span>
                    <StatusPill tone={run.tone}>
                      {run.tone === "warning" && <Loader2 size={10} />}
                      {run.status}
                    </StatusPill>
                  </div>
                  <p className="mt-1 max-w-2xl font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                    {run.prompt}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {run.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-outline-variant/30 bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-body-sm text-[11px] text-on-surface-variant lg:w-64 lg:grid-cols-2">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} />
                    {run.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Cpu size={11} />
                    {run.cluster}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Zap size={11} className="text-[#FFD700]" />
                    {run.credits} crédits
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Terminal size={11} />
                    {run.nodes}
                  </span>
                </div>

                <div className="flex items-center gap-3 lg:w-40 lg:justify-end">
                  <div className="text-right">
                    <div className="font-code text-[12px] font-semibold text-on-surface">{run.build}</div>
                    <div className="font-body-sm text-[10px] text-on-surface-variant">temps de build</div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg border border-outline-variant/40 px-2.5 py-1.5 font-label-sm text-[11px] font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                  >
                    Logs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-outline-variant/15 px-5 py-3 sm:flex-row">
          <p className="font-body-sm text-[11px] text-on-surface-variant">
            Affichage de 1 à {historyRuns.length} sur 34 exécutions
          </p>
          <button
            type="button"
            className="rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            Charger plus
          </button>
        </div>
      </Panel>

      <Panel className="border-outline-variant/25 bg-surface-container-lowest">
        <PanelHeader
          title="Journal en direct"
          description="argos-portal v1.2 — Cluster GPU-A100-FR"
          icon={<Sparkles size={18} />}
          action={
            <StatusPill tone="warning">
              <Loader2 size={10} />
              Streaming
            </StatusPill>
          }
        />
        <div className="space-y-1 p-5 font-code text-[11px]">
          {logLines.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 text-on-surface-variant/50">{l.time}</span>
              <span className={logTone(l.tone)}>{l.text}</span>
            </div>
          ))}
          <div className="flex gap-3">
            <span className="shrink-0 text-on-surface-variant/50">14:38:22</span>
            <span className="text-[#FFD700]">
              <span className="mr-1 inline-block h-3 w-1.5 animate-pulse bg-[#FFD700] align-middle" />
              en attente du build de production…
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
