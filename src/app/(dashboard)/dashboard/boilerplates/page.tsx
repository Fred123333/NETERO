import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Download,
  Heart,
  Layers,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { PageHeader, Panel, StatTile, StatusPill } from "@/components/dashboard/ui";
import { dashboardBoilerplates } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Catalogue des Boilerplates — NETERO",
};

const categories = [
  "Tous (24)",
  "Next.js 15",
  "IA & Copilotes",
  "SaaS B2B",
  "E-commerce",
  "Micro-services",
];

export default function BoilerplatesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Archives Stack Next.js 15"
        title="Catalogue des Boilerplates"
        description="Accédez à l'ensemble des templates Next.js 15 prêts pour la production inclus dans votre compte. Architecture vérifiée, typage strict, zéro dépendance obsolète."
        actions={
          <Link
            href="/dashboard/generateur"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} />
            Générer sur mesure
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Templates inclus" value="24" hint="Licence Pro All-Access" icon={<Layers size={16} />} />
        <StatTile label="Téléchargés" value="12" hint="sur 24 disponibles" icon={<Download size={16} />} />
        <StatTile label="Mise à jour" value="Hebdo" hint="Dernière il y a 2 jours" icon={<RefreshCw size={16} />} />
        <StatTile label="Sécurité" value="0" hint="Vulnérabilité critique" icon={<ShieldCheck size={16} />} accent />
      </div>

      <Panel className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              placeholder="Rechercher un boilerplate, une techno..."
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest py-2.5 pl-9 pr-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-[#FFD700]/50 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 font-body-sm text-[12px] text-on-surface-variant">
              <SlidersHorizontal size={14} />
              Framework : Next.js 15.2 App Router
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 font-body-sm text-[12px] text-on-surface-variant">
              Runtime : Node.js LTS
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <span
              key={c}
              className={
                i === 0
                  ? "cursor-pointer rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-[#FFD700]"
                  : "cursor-pointer rounded-full border border-outline-variant/30 bg-surface-container-lowest px-3 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              }
            >
              {c}
            </span>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardBoilerplates.map((b) => (
          <div
            key={b.id}
            className="group flex flex-col rounded-2xl border border-outline-variant/20 bg-surface-container p-5 transition-colors hover:border-[#FFD700]/30 hover:bg-surface-container-high"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-label-sm text-[10px] font-semibold uppercase tracking-wide text-[#FFD700]">
                  {b.category}
                </p>
                <h2 className="mt-1 font-headline-sm text-lg font-bold text-on-surface">{b.title}</h2>
              </div>
              <button
                type="button"
                aria-label="Ajouter aux favoris"
                className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-2 text-on-surface-variant transition-colors hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer"
              >
                <Heart size={15} />
              </button>
            </div>

            <p className="mt-2 flex-1 font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
              {b.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {b.tags.map((t) => (
                <span
                  key={t}
                  className="rounded border border-outline-variant/30 bg-surface-container-lowest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-outline-variant/15 pt-3">
              <span className="inline-flex items-center gap-1 font-label-sm text-[11px] font-semibold text-[#FFD700]">
                <Star size={12} className="fill-[#FFD700]" />
                {b.rating}
                <span className="font-normal text-on-surface-variant">({b.reviews})</span>
              </span>
              <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-code text-[10px] text-on-surface-variant">
                {b.version}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href={`/dashboard/boilerplates/${b.id}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
              >
                Consulter les détails
                <ArrowRight size={14} />
              </Link>
              <StatusPill tone="success">{b.price}</StatusPill>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-surface-container px-5 py-4 sm:flex-row">
        <p className="font-body-sm text-[12px] text-on-surface-variant">
          Affichage de 1 à {dashboardBoilerplates.length} sur 24 templates
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[12px] text-on-surface-variant opacity-50"
          >
            Précédent
          </button>
          <span className="rounded-lg bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[12px] font-semibold text-[#FFD700]">
            1
          </span>
          <span className="rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[12px] text-on-surface-variant cursor-pointer hover:bg-surface-container-high">
            2
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[12px] font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            Suivant
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
