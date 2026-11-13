"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  Download,
  KeyRound,
  Pause,
  Play,
  Receipt,
  RefreshCw,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import {
  healthCards,
  liveEvents,
  mrrSeries,
  overviewKpis,
  recentSubscriptions,
  signupSeries,
} from "@/lib/data/admin";
import type { LiveEvent } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import {
  MrrChart,
  SignupsChart,
  LegendDot,
} from "@/components/admin/charts";
import {
  AdminBadge,
  AdminButton,
  AdminKpiCard,
  AdminPageHeader,
  AdminPanel,
  AdminPanelHeader,
  AdminTabs,
  AdminTableShell,
  AdminTd,
  AdminTh,
} from "@/components/admin/ui";
import { downloadCsv } from "@/lib/export";

type SignupRange = keyof typeof signupSeries;
type MrrRange = keyof typeof mrrSeries;

const signupRanges: { value: SignupRange; label: string }[] = [
  { value: "30j", label: "30 j" },
  { value: "90j", label: "90 j" },
  { value: "12m", label: "12 m" },
];

const mrrRanges: { value: MrrRange; label: string }[] = [
  { value: "6m", label: "6 m" },
  { value: "12m", label: "12 m" },
  { value: "24m", label: "24 m" },
];

const eventStyles: Record<
  LiveEvent["kind"],
  { icon: typeof UserPlus; className: string }
> = {
  user: { icon: UserPlus, className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  payment: { icon: Receipt, className: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
  generation: { icon: Sparkles, className: "bg-white/[0.06] text-white border-white/10" },
  key: { icon: KeyRound, className: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  subscription: { icon: BellRing, className: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
};

const healthStyles: Record<string, string> = {
  cpu: "bg-emerald-500/10 text-emerald-300",
  github: "bg-white/[0.06] text-white",
  shield: "bg-sky-500/10 text-sky-300",
};

export function AdminOverviewScreen() {
  const [signupRange, setSignupRange] = useState<SignupRange>("30j");
  const [mrrRange, setMrrRange] = useState<MrrRange>("12m");
  const [refreshing, setRefreshing] = useState(false);
  const [syncedAt, setSyncedAt] = useState("Il y a 2 min");
  const [live, setLive] = useState(true);

  const mrrData = mrrSeries[mrrRange];
  const average = useMemo(
    () => mrrData.reduce((sum, item) => sum + item.mrr, 0) / mrrData.length,
    [mrrData]
  );

  function refresh() {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setSyncedAt(`Aujourd'hui à ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`);
      toast.success("Console synchronisée", {
        description: "KPIs, transactions et signaux cluster actualisés.",
      });
    }, 750);
  }

  function exportReport() {
    downloadCsv("netero-vue-ensemble.csv", [
      ["Indicateur", "Valeur", "Tendance"],
      ...overviewKpis.map((kpi) => [kpi.label, kpi.value, kpi.hint ?? ""]),
      [],
      ["Abonnement récent", "Email", "Formule", "Montant", "Date", "Statut"],
      ...recentSubscriptions.map((row) => [row.client, row.email, row.plan, row.amount, row.date, row.status]),
    ]);
    toast.success("Rapport exporté", { description: "Le fichier CSV a été téléchargé." });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Netero Infrastructure OS • Cluster operational"
        title="Vue d'ensemble"
        description="Santé temps réel de la plateforme, acquisition, revenus et activité du moteur de génération."
        badge={<AdminBadge tone="success" dot>Live</AdminBadge>}
        actions={
          <>
            <AdminButton onClick={refresh} disabled={refreshing}>
              <RefreshCw size={13} className={refreshing ? "animate-spin" : undefined} />
              {refreshing ? "Synchronisation…" : "Rafraîchir"}
            </AdminButton>
            <AdminButton variant="primary" onClick={exportReport}>
              <Download size={13} />
              Exporter le rapport
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
        {overviewKpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            icon={<AdminKpiIcon name={kpi.icon} />}
            accent={kpi.icon === "euro"}
          />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <AdminPanel>
          <AdminPanelHeader
            title="Inscriptions & utilisateurs actifs"
            description={`Acquisition brute et engagement quotidien • maj ${syncedAt}`}
            action={
              <AdminTabs
                tabs={signupRanges}
                value={signupRange}
                onChange={setSignupRange}
              />
            }
          />
          <div className="flex flex-wrap items-center gap-4 px-4 pb-1 sm:px-5">
            <LegendDot color="#FFFFFF" label="Total inscriptions" />
            <LegendDot color="#10B981" label="Actifs (DAU)" />
          </div>
          <div className="px-2 pb-3 sm:px-3">
            <SignupsChart data={signupSeries[signupRange]} />
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader
            title="Revenus mensuels & MRR"
            description={`Moyenne ${(average / 1000).toFixed(1)}k €/mois sur la période`}
            action={<AdminTabs tabs={mrrRanges} value={mrrRange} onChange={setMrrRange} />}
          />
          <div className="flex flex-wrap items-center gap-4 px-4 pb-1 sm:px-5">
            <LegendDot color="#FFFFFF" label="MRR net" value={`${(mrrData[mrrData.length - 1].mrr / 1000).toFixed(1)}k €`} />
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
              <ArrowUpRight size={11} /> +14.2 % MoM
            </span>
          </div>
          <div className="px-2 pb-3 sm:px-3">
            <MrrChart data={mrrData} />
          </div>
        </AdminPanel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <AdminPanel>
          <AdminPanelHeader
            title="Activités en direct"
            description="Flux d'événements orchestrés depuis le cluster"
            action={
              <div className="flex items-center gap-2">
                <AdminBadge tone={live ? "success" : "warning"} dot>
                  {live ? "Stream live" : "En pause"}
                </AdminBadge>
                <button
                  type="button"
                  onClick={() => {
                    setLive((value) => !value);
                    toast.message(live ? "Flux mis en pause" : "Flux repris", {
                      description: live ? "Les événements seront mis en file." : "Synchronisation temps réel rétablie.",
                    });
                  }}
                  aria-label={live ? "Mettre en pause" : "Reprendre"}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                >
                  {live ? <Pause size={12} /> : <Play size={12} />}
                </button>
              </div>
            }
          />
          <div className="px-4 pb-4 sm:px-5">
            <ol className="relative space-y-3 border-l border-white/[0.08] pl-4">
              {liveEvents.slice(0, 5).map((event) => {
                const style = eventStyles[event.kind];
                const Icon = style.icon;
                return (
                  <li key={event.id} className="relative">
                    <span className="absolute -left-[25px] flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-[#171717]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <div className="flex items-start gap-2.5">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${style.className}`}>
                        <Icon size={13} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium leading-snug text-on-surface">{event.title}</p>
                        <p className="mt-0.5 truncate text-[10px] text-on-surface-variant">{event.detail}</p>
                      </div>
                      <span className="shrink-0 text-[9px] text-on-surface-variant/80">{event.time}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader
            title="Aperçu des abonnements récents"
            description="Dernières activations de licences et renouvellements"
            action={
              <Link href="/admin/abonnements" className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300">
                Voir tout
              </Link>
            }
          />
          <AdminTableShell>
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <AdminTh>Client</AdminTh>
                  <AdminTh>Formule</AdminTh>
                  <AdminTh>Montant</AdminTh>
                  <AdminTh>Date</AdminTh>
                  <AdminTh>Statut</AdminTh>
                </tr>
              </thead>
              <tbody>
                {recentSubscriptions.map((row) => (
                  <tr key={row.email} className="border-t border-white/[0.05]">
                    <AdminTd>
                      <span className="block font-medium text-on-surface">{row.client}</span>
                      <span className="block text-[10px] text-on-surface-variant">{row.email}</span>
                    </AdminTd>
                    <AdminTd className="text-on-surface-variant">{row.plan}</AdminTd>
                    <AdminTd className="font-semibold">{row.amount}</AdminTd>
                    <AdminTd className="whitespace-nowrap text-on-surface-variant">{row.date}</AdminTd>
                    <AdminTd>
                      <AdminBadge tone="success" dot>{row.status}</AdminBadge>
                    </AdminTd>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        </AdminPanel>
      </div>

      <div className="grid gap-2.5 md:grid-cols-3">
        {healthCards.map((card) => (
          <AdminPanel key={card.title} className="flex items-start gap-3 p-4">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${healthStyles[card.icon] ?? "bg-white/[0.06] text-white"}`}>
              <AdminKpiIcon name={card.icon} size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[12px] font-semibold text-on-surface">{card.title}</p>
                <AdminBadge tone="success">{card.stat}</AdminBadge>
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-on-surface-variant">{card.detail}</p>
            </div>
          </AdminPanel>
        ))}
      </div>
    </div>
  );
}
