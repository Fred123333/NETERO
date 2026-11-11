"use client";

import { useState } from "react";
import { Sparkles, Download, CheckCircle2, BadgeCheck, Server } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

interface Props {
  priceSolo: number;
  priceAgency: number;
  cliCommand: string;
}

export function BoilerplateSidebar({ priceSolo, priceAgency, cliCommand }: Props) {
  const [license, setLicense] = useState<"solo" | "agency">("solo");
  const price = license === "solo" ? priceSolo : priceAgency;

  return (
    <aside className="lg:col-span-4 self-start sticky top-20 flex flex-col gap-space-md">
      <div className="p-space-lg rounded-xl bg-surface-container-low shadow-2xl flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/20">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-headline-lg font-bold text-on-surface">
                {price}€
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                paiement unique
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-label-sm text-label-sm font-semibold">
              Accès Immédiat
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-[#FFD700] flex items-center gap-1 font-medium">
            <Sparkles size={15} />
            Ou inclus dans le Pass All-Access NETERO
          </p>
        </div>

        <div className="flex flex-col gap-space-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Choisir une licence :
          </label>
          <div className="grid grid-cols-2 gap-space-xs bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/20">
            <button
              onClick={() => setLicense("solo")}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded transition-all ${
                license === "solo"
                  ? "bg-surface-container-high text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="font-label-md text-label-md font-bold">Licence Solo</span>
              <span className="font-label-sm text-[11px]">{priceSolo}€ • 1 Projet</span>
            </button>
            <button
              onClick={() => setLicense("agency")}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded transition-all ${
                license === "agency"
                  ? "bg-surface-container-high text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="font-label-md text-label-md font-bold">Agence & Équipe</span>
              <span className="font-label-sm text-[11px]">{priceAgency}€ • Illimité</span>
            </button>
          </div>
        </div>

        <button className="w-full py-space-sm px-space-md rounded-lg bg-[#FFD700] hover:bg-[#e9c400] text-[#171717] font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]">
          <Download size={20} />
          <span>Débloquer le Boilerplate</span>
        </button>

        <CopyButton text={cliCommand} />

        <div className="flex flex-col gap-2.5 pt-space-xs">
          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
            Ce qui est inclus :
          </span>
          {[
            "Code source complet GitHub (accès direct au repo privé)",
            "Support Discord prioritaire 24/7 avec les créateurs",
            "Mises à jour à vie gratuites (incluant Next.js major)",
            "Documentation pas à pas de 45 pages & vidéos d'onboarding",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-2.5 font-body-sm text-body-sm text-on-surface-variant"
            >
              <CheckCircle2 size={17} className="text-[#FFD700] shrink-0 mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container flex items-center gap-space-sm mt-space-xs border border-outline-variant/20">
          <BadgeCheck size={24} className="text-[#FFD700] shrink-0" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
              Garantie 14 jours
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              Satisfait ou intégralement remboursé sans justification.
            </span>
          </div>
        </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-outline-variant/20">
        <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md font-semibold">
          <Server size={18} className="text-[#FFD700]" />
          Déploiement en 1 Clic
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Compatible sans configuration supplémentaire avec Vercel, Coolify, Docker et Supabase Cloud.
        </p>
      </div>
    </aside>
  );
}