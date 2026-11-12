import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Heart,
  Layers,
  Star,
  BookmarkCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { PageHeader, Panel, StatTile, StatusPill } from "@/components/dashboard/ui";
import { favoriteBoilerplates } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Mes favoris — NETERO",
};

export default function FavorisPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Bibliothèque favoris"
        title="Mes favoris"
        description="Retrouvez les boilerplates épinglés pour vos prochains projets. 5 templates enregistrés, prêts à être clonés et déployés."
        actions={
          <Link
            href="/dashboard/boilerplates"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
          >
            <Compass size={16} />
            Explorer le catalogue
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Favoris épinglés" value="05" hint="sur 24 templates" icon={<Heart size={16} />} accent />
        <StatTile label="Téléchargés" value="03" hint="prêts au déploiement" icon={<Download size={16} />} />
        <StatTile label="Non consultés" value="02" hint="depuis 7 jours" icon={<BookmarkCheck size={16} />} />
        <StatTile label="Note moyenne" value="4.9" hint="qualité vérifiée" icon={<Star size={16} />} />
      </div>

      <div className="flex flex-wrap gap-2">
        {["Tous (5)", "IA & Copilotes (2)", "SaaS B2B (2)", "Micro-services (1)"].map((f, i) => (
          <span
            key={f}
            className={
              i === 0
                ? "cursor-pointer rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-[#FFD700]"
                : "cursor-pointer rounded-full border border-outline-variant/30 bg-surface-container-lowest px-3 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            }
          >
            {f}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {favoriteBoilerplates.map((b, i) => (
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
              <span className="rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/10 p-2 text-[#FFD700]">
                <Heart size={15} className="fill-[#FFD700]" />
              </span>
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
              {i < 3 ? (
                <StatusPill tone="success">
                  <CheckCircle2 size={10} />
                  Téléchargé
                </StatusPill>
              ) : (
                <StatusPill tone="warning">À explorer</StatusPill>
              )}
            </div>

            <Link
              href={`/dashboard/boilerplates/${b.id}`}
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              Consulter les détails
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container/50 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFD700]/10 text-[#FFD700]">
            <Sparkles size={22} />
          </span>
          <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">
            Envie d&apos;explorer davantage ?
          </h3>
          <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
            19 autres templates vous attendent dans le catalogue complet.
          </p>
          <Link
            href="/dashboard/boilerplates"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            <Layers size={14} />
            Voir tout le catalogue
          </Link>
        </div>
      </div>

      <Panel className="p-5">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-label-md text-[13px] font-bold text-on-surface">Synchronisation cloud</h3>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Vos favoris sont synchronisés sur tous vos appareils via le compte Pro.
            </p>
          </div>
          <StatusPill tone="success">Synchronisé</StatusPill>
        </div>
      </Panel>
    </div>
  );
}
