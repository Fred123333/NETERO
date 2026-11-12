import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  Download,
  ExternalLink,
  FileEdit,
  FlaskConical,
  FolderKanban,
  Plus,
  Rocket,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { PageHeader, Panel, StatTile, StatusPill } from "@/components/dashboard/ui";
import { dashboardProjects } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Mes projets — NETERO",
};

const filters = [
  { label: "Tous (7)", active: true },
  { label: "En production (3)", active: false },
  { label: "En staging (2)", active: false },
  { label: "Brouillons (2)", active: false },
];

export default function ProjetsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Workspace / Production & Sandboxes"
        title="Mes projets"
        description="Gérez, téléchargez et déployez vos applications générées par IA et issues de vos boilerplates. 7 projets actifs sur votre workspace."
        actions={
          <Link
            href="/dashboard/generateur"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Nouveau projet IA
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Projets actifs" value="07" hint="+2 ce mois-ci" icon={<FolderKanban size={16} />} />
        <StatTile label="Déployés" value="03" hint="Vercel Production" icon={<Rocket size={16} />} accent />
        <StatTile label="En staging" value="02" hint="Prêts à valider" icon={<FlaskConical size={16} />} />
        <StatTile label="Brouillons" value="02" hint="Local uniquement" icon={<FileEdit size={16} />} />
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
            <div className="relative w-full sm:w-56">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest py-2 pl-9 pr-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-[#FFD700]/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 font-body-sm text-[12px] text-on-surface-variant transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              Trier : Récents
            </button>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {dashboardProjects.map((p) => (
          <div
            key={p.id}
            className="flex flex-col rounded-2xl border border-outline-variant/20 bg-surface-container p-5 transition-colors hover:border-[#FFD700]/30 hover:bg-surface-container-high"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-highest text-[#FFD700]">
                  <Boxes size={18} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate font-label-md text-[14px] font-bold text-on-surface">{p.name}</h2>
                    <span className="rounded bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant">
                      {p.version}
                    </span>
                  </div>
                  <p className="mt-0.5 font-body-sm text-[11px] text-on-surface-variant">{p.category}</p>
                </div>
              </div>
              <StatusPill tone={p.tone}>{p.status}</StatusPill>
            </div>

            <p className="mt-3 flex-1 font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
              {p.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-outline-variant/30 bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-outline-variant/15 pt-3">
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                Mis à jour {p.date.toLowerCase()}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Télécharger le projet"
                  className="rounded-lg border border-outline-variant/30 p-1.5 text-on-surface-variant transition-colors hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer"
                >
                  <Download size={13} />
                </button>
                <Link
                  href={`/dashboard/projets/${p.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/40 px-2.5 py-1.5 font-label-sm text-[11px] font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  <ExternalLink size={12} />
                  Détails &amp; Logs
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-surface-container px-5 py-4 sm:flex-row">
        <p className="font-body-sm text-[12px] text-on-surface-variant">
          Affichage de 1 à {dashboardProjects.length} sur {dashboardProjects.length} applications
        </p>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[12px] font-semibold text-[#FFD700]">
            1
          </span>
          <button
            type="button"
            className="rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[12px] text-on-surface-variant opacity-50"
            disabled
          >
            Suivant
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/10 to-surface-container p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] opacity-[0.06] [background-size:22px_22px]" />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD700]/15 text-[#FFD700]">
              <Sparkles size={20} />
            </span>
            <div>
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                Besoin d&apos;un nouveau MVP en 30 secondes ?
              </h2>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                Décrivez votre idée, le moteur génère l&apos;architecture et le code prêt à déployer.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/generateur"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 sm:w-auto cursor-pointer"
          >
            Lancer le générateur
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
