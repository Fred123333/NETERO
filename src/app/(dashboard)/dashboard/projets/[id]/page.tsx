import Link from "next/link";
import type { Metadata } from "next";
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileCode2,
  Folder,
  Gauge,
  GitBranch,
  GitCommit,
  Globe,
  RefreshCw,
  Rocket,
  Server,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatTile, StatusPill } from "@/components/dashboard/ui";
import { dashboardProjects } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Détail du projet — NETERO",
};

export function generateStaticParams() {
  return dashboardProjects.map((p) => ({ id: p.id }));
}

const commits = [
  {
    title: "Scaffolding initial généré par Netero Core",
    hash: "a3f9c21",
    author: "AI Engine v2.4",
    time: "il y a 2 jours",
    tone: "success" as const,
  },
  {
    title: "Ajout du module RBAC et guards serveur",
    hash: "b7d1e04",
    author: "Alexandre Dupont",
    time: "hier",
    tone: "info" as const,
  },
  {
    title: "Migration Prisma : organisations & abonnements",
    hash: "c92ab77",
    author: "AI Engine v2.4",
    time: "il y a 8 h",
    tone: "success" as const,
  },
  {
    title: "Correction du webhook Stripe et tests e2e",
    hash: "d41ff09",
    author: "Alexandre Dupont",
    time: "il y a 2 h",
    tone: "warning" as const,
  },
];

const files = [
  { name: "app", type: "folder" as const, depth: 0 },
  { name: "(dashboard)", type: "folder" as const, depth: 1 },
  { name: "layout.tsx", type: "file" as const, depth: 2 },
  { name: "page.tsx", type: "file" as const, depth: 2 },
  { name: "api", type: "folder" as const, depth: 0 },
  { name: "stripe/webhook/route.ts", type: "file" as const, depth: 1 },
  { name: "lib", type: "folder" as const, depth: 0 },
  { name: "auth.ts", type: "file" as const, depth: 1 },
  { name: "db.ts", type: "file" as const, depth: 1 },
  { name: "prisma/schema.prisma", type: "file" as const, depth: 0 },
];

const stackList = [
  { label: "Next.js 15", icon: Code2 },
  { label: "TypeScript", icon: FileCode2 },
  { label: "Prisma", icon: Database },
  { label: "PostgreSQL", icon: Database },
  { label: "Tailwind v4", icon: Code2 },
  { label: "Stripe", icon: ShieldCheck },
  { label: "Supabase", icon: Server },
  { label: "Vercel", icon: Rocket },
];

const health = [
  "Build CI vert — pnpm build validé",
  "0 vulnérabilité critique détectée",
  "Lighthouse Performance 98/100",
  "Couverture de tests 84%",
];

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = dashboardProjects.find((p) => p.id === id) ?? dashboardProjects[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link
        href="/dashboard/projets"
        className="inline-flex items-center gap-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:text-[#FFD700] cursor-pointer"
      >
        <ArrowLeft size={14} />
        Retour aux projets
      </Link>

      <PageHeader
        eyebrow="Mes projets / Détail"
        title={project.name}
        description={project.description}
        actions={
          <>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <Download size={16} />
              Télécharger ZIP
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
            >
              <ExternalLink size={16} />
              Ouvrir l&apos;aperçu
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusPill tone={project.tone}>{project.status}</StatusPill>
        <StatusPill tone="warning">{project.version}</StatusPill>
        <StatusPill tone="neutral">{project.category}</StatusPill>
        <span className="inline-flex items-center gap-1.5 font-body-sm text-[11px] text-on-surface-variant">
          <GitBranch size={12} />
          main · {project.id}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Santé du projet" value="98%" hint="Tous les checks passent" icon={<Activity size={16} />} accent />
        <StatTile label="Latence moyenne" value="142 ms" hint="p95 sur 24 h" icon={<Gauge size={16} />} />
        <StatTile label="Bundle JS" value="184 kb" hint="gzip, first load" icon={<Code2 size={16} />} />
        <StatTile label="Uptime" value="99.98%" hint="30 derniers jours" icon={<Server size={16} />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Aperçu visuel en production"
              description="Rendu réel de l'application déployée sur Vercel."
              icon={<Globe size={18} />}
              action={<StatusPill tone="success">Live</StatusPill>}
            />
            <div className="p-5">
              <div className="overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
                <div className="flex items-center gap-2 border-b border-outline-variant/20 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFD700]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 flex-1 truncate rounded-md bg-surface-container px-2 py-1 font-code text-[10px] text-on-surface-variant">
                    https://{project.id}.netero.app/dashboard
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-3">
                    <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">Revenus</p>
                    <p className="mt-1 font-headline-sm text-lg font-bold text-on-surface">12 480 €</p>
                    <div className="mt-2 flex h-8 items-end gap-1">
                      {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
                        <span key={i} className="flex-1 rounded-sm bg-[#FFD700]/70" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-3">
                    <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">Utilisateurs</p>
                    <p className="mt-1 font-headline-sm text-lg font-bold text-on-surface">2 841</p>
                    <p className="mt-2 font-body-sm text-[10px] text-emerald-400">+18,4% ce mois</p>
                  </div>
                  <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-3">
                    <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">Crédits IA</p>
                    <p className="mt-1 font-headline-sm text-lg font-bold text-on-surface">85/100</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-[85%] rounded-full bg-[#FFD700]" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/30 px-3 py-2 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
              >
                <RefreshCw size={13} />
                Re-build sur Vercel
              </button>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Journal des générations IA & commits"
              description="Historique des modifications apportées par le moteur et l'équipe."
              icon={<GitCommit size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {commits.map((c) => (
                <div key={c.hash} className="flex items-start gap-3 px-5 py-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-[#FFD700]">
                    <GitCommit size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-label-md text-[12px] font-semibold text-on-surface">{c.title}</span>
                      <StatusPill tone={c.tone}>{c.author}</StatusPill>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 font-body-sm text-[10px] text-on-surface-variant">
                      <span className="font-code">{c.hash}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} />
                        {c.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Explorateur de dépôt"
              description="Arborescence des fichiers principaux générés."
              icon={<Folder size={18} />}
            />
            <div className="p-5">
              <div className="rounded-lg border border-outline-variant/25 bg-surface-container-lowest p-3 font-code text-[11px]">
                {files.map((f, i) => (
                  <div
                    key={`${f.name}-${i}`}
                    className="flex items-center gap-1.5 py-0.5 text-on-surface-variant"
                    style={{ paddingLeft: `${f.depth * 14}px` }}
                  >
                    {f.type === "folder" ? (
                      <Folder size={12} className="text-[#FFD700]" />
                    ) : (
                      <FileCode2 size={12} className="text-on-surface-variant/70" />
                    )}
                    <span className={f.type === "folder" ? "text-on-surface" : ""}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Informations projet" icon={<Server size={18} />} />
            <div className="divide-y divide-outline-variant/15">
              {[
                { label: "Propriétaire", value: "Alexandre Dupont" },
                { label: "Plan", value: "Pro All-Access" },
                { label: "Région", value: "cdg1 · Paris" },
                { label: "Dernier build", value: "il y a 2 h" },
                { label: "Domaine", value: `${project.id}.netero.app` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 px-5 py-2.5">
                  <span className="font-body-sm text-[11px] text-on-surface-variant">{row.label}</span>
                  <span className="truncate font-code text-[10px] text-on-surface">{row.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Santé & vérifications" icon={<ShieldCheck size={18} />} />
            <ul className="space-y-2.5 p-5">
              {health.map((h) => (
                <li key={h} className="flex items-start gap-2 font-body-sm text-[12px] text-on-surface-variant">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                  {h}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Stack & dépendances" icon={<Database size={18} />} />
            <div className="grid grid-cols-2 gap-1.5 p-5">
              {stackList.map((s) => {
                const Icon = s.icon;
                return (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest px-2 py-1.5 font-code text-[10px] text-on-surface-variant"
                  >
                    <Icon size={11} className="text-[#FFD700]" />
                    {s.label}
                  </span>
                );
              })}
            </div>
          </Panel>

          <Panel className="border-red-500/25 bg-red-500/5">
            <div className="flex items-center gap-2 px-5 pt-4">
              <AlertTriangle size={16} className="text-red-400" />
              <h3 className="font-label-md text-[13px] font-bold text-on-surface">Zone sensible</h3>
            </div>
            <div className="p-5 pt-2">
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Archiver ce projet le retirera du workspace. Les données restent récupérables 30 jours.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 font-label-sm text-[11px] font-semibold text-red-400 transition-colors hover:bg-red-500/10 cursor-pointer"
              >
                <Archive size={13} />
                Archiver le projet
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
