"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Cpu,
  Download,
  Gauge,
  HardDrive,
  RefreshCw,
  SearchCode,
  Settings2,
  Sparkles,
  TestTube2,
  Timer,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { aiConsumers, aiKpis, aiModels } from "@/lib/data/admin";
import type { AiConsumer, AiModel } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import {
  AdminBadge,
  AdminButton,
  AdminKpiCard,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminPanelHeader,
  AdminProgress,
  AdminTableShell,
  AdminTd,
  AdminTh,
} from "@/components/admin/ui";
import { downloadCsv } from "@/lib/export";

const secondaryMetrics = [
  { label: "Scaffolding total", value: "94.2 TB", hint: "code généré", icon: HardDrive },
  { label: "Arbre syntaxique", value: "100 %", hint: "AST validé", icon: SearchCode },
  { label: "Facturation amont", value: "$0.0028", hint: "par requête", icon: Zap },
  { label: "Débit tokens/sec", value: "124.8", hint: "t/s agrégé", icon: Gauge },
];

type QuotaKey = "free" | "pro" | "ultra" | "rate" | "timeout" | "concurrent";

const quotaConfig: Record<
  QuotaKey,
  { label: string; min: number; max: number; step: number; unit: string; hint: string }
> = {
  free: { label: "Quota mensuel Free", min: 0, max: 50, step: 5, unit: "crédits", hint: "Restriction stricte du sandbox" },
  pro: { label: "Quota mensuel Pro", min: 0, max: 500, step: 10, unit: "crédits", hint: "Base Pro incluse dans l'abonnement" },
  ultra: { label: "Quota Ultra Dev", min: 100, max: 1000, step: 25, unit: "crédits", hint: "Allocation entreprise étendue" },
  rate: { label: "Débit max CLI", min: 10, max: 300, step: 10, unit: "req/min", hint: "Throttling de la passerelle CLI" },
  timeout: { label: "Timeout génération AST", min: 60, max: 600, step: 30, unit: "s", hint: "Interruption automatique du runner" },
  concurrent: { label: "Builds concurrents", min: 1, max: 24, step: 1, unit: "workers", hint: "Capacité du cluster AI00-FR" },
};

const initialQuotas: Record<QuotaKey, number> = {
  free: 0,
  pro: 100,
  ultra: 500,
  rate: 60,
  timeout: 180,
  concurrent: 6,
};

function QuotaSlider({
  quotaKey,
  value,
  onChange,
}: {
  quotaKey: QuotaKey;
  value: number;
  onChange: (value: number) => void;
}) {
  const config = quotaConfig[quotaKey];
  return (
    <div className="rounded-lg border border-white/[0.06] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant">{config.label}</p>
        <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-semibold text-on-surface">
          {value} {config.unit}
        </span>
      </div>
      <input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={config.label}
        className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-500"
      />
      <div className="mt-1 flex items-center justify-between text-[9px] text-on-surface-variant">
        <span>{config.hint}</span>
        <span>{config.min}–{config.max}</span>
      </div>
    </div>
  );
}

function ModelToggle({ model }: { model: AiModel }) {
  const [enabled, setEnabled] = useState(model.enabled);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={`Activer ${model.name}`}
      onClick={() => {
        setEnabled((value) => !value);
        toast.success(enabled ? "Modèle désactivé" : "Modèle activé", { description: model.name });
      }}
      className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-white/15"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${enabled ? "left-[18px]" : "left-0.5"}`} />
    </button>
  );
}

export function AdminAiScreen() {
  const [quotas, setQuotas] = useState(initialQuotas);
  const [consumers, setConsumers] = useState<AiConsumer[]>(aiConsumers);
  const [inspect, setInspect] = useState<AiConsumer | null>(null);
  const [quotaTarget, setQuotaTarget] = useState<AiConsumer | null>(null);
  const [quotaValue, setQuotaValue] = useState(50);

  function exportLogs() {
    downloadCsv("netero-logs-ia.csv", [
      ["Utilisateur", "Email", "Organisation", "Formule", "Projets", "Crédits", "Crédits/projet", "Taux de build", "Dernier pipeline"],
      ...consumers.map((row) => [row.user, row.email, row.org, row.plan, row.projects, row.credits, row.perProject, row.success, row.pipeline]),
    ]);
    toast.success("Logs exportés", { description: `${consumers.length} consommateurs • CSV.` });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Engine core orchestrateur v2.1"
        title="Gestion du moteur IA & Pipeline"
        badge={<AdminBadge tone="success" dot>Cluster AI00-FR actif</AdminBadge>}
        description="Supervision de l'orchestrateur de scaffolding de code, latence des LLM, consommation de tokens et gestion fine des quotas d'exécution."
        actions={
          <>
            <AdminButton
              onClick={() => {
                toast.message("Purge du cache AST lancée", { description: "Les runners vont libérer les arbres obsolètes." });
                window.setTimeout(() => toast.success("Cache AST purgé", { description: "1.8 GB libérés • 0 runner impacté." }), 1200);
              }}
            >
              <RefreshCw size={13} /> Purger le cache AST
            </AdminButton>
            <AdminButton
              variant="primary"
              onClick={() => {
                document.getElementById("quotas")?.scrollIntoView({ behavior: "smooth", block: "center" });
                toast.message("Quotas d'inférence", { description: "Ajustez les curseurs puis sauvegardez." });
              }}
            >
              <Settings2 size={13} /> Ajuster les quotas d’inférence
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {aiKpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            icon={<AdminKpiIcon name={kpi.icon} />}
            accent={kpi.icon === "sparkles"}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {secondaryMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-on-surface-variant"><Icon size={14} /></span>
              <div className="min-w-0">
                <p className="truncate text-[9px] uppercase tracking-wide text-on-surface-variant">{metric.label}</p>
                <p className="text-[12px] font-semibold text-on-surface">{metric.value} <span className="text-[9px] font-normal text-on-surface-variant">{metric.hint}</span></p>
              </div>
            </div>
          );
        })}
      </div>

      <AdminPanel>
        <AdminPanelHeader
          title="Paramètres de fonctionnement du générateur & moteurs d'inférence"
          description="Configuration active des routeurs LLM, workers de compilation et mécanismes de bascule redondants."
          icon={<BrainCircuit size={15} />}
          action={<AdminBadge tone="success">3 runners en production</AdminBadge>}
        />
        <AdminTableShell>
          <table className="w-full min-w-[960px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Modèle primaire</AdminTh>
                <AdminTh>Runner de scaffolding</AdminTh>
                <AdminTh>Coût / 1k tokens</AdminTh>
                <AdminTh>Statut worker</AdminTh>
                <AdminTh>Fallback de secours</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((model) => (
                <tr key={model.id} className="border-t border-white/[0.05]">
                  <AdminTd>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-on-surface-variant"><Cpu size={14} /></span>
                      <span>
                        <span className="block font-semibold text-on-surface">{model.name}</span>
                        <span className="block font-mono text-[9px] text-on-surface-variant">{model.runtime}</span>
                      </span>
                    </div>
                  </AdminTd>
                  <AdminTd className="text-on-surface-variant">{model.engine}</AdminTd>
                  <AdminTd>
                    <span className="block text-on-surface">{model.inputCost}</span>
                    <span className="block text-[10px] text-on-surface-variant">{model.outputCost}</span>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex items-center gap-2">
                      <AdminBadge tone="success" dot>{model.status}</AdminBadge>
                      <span className="text-[10px] text-on-surface-variant">{model.uptime}</span>
                    </div>
                  </AdminTd>
                  <AdminTd className="text-on-surface-variant">{model.fallback}</AdminTd>
                  <AdminTd>
                    <div className="flex items-center justify-end gap-2">
                      <ModelToggle model={model} />
                      <button
                        type="button"
                        onClick={() => toast.success("Test de latence exécuté", { description: `${model.name} • 412 ms • 0 erreur.` })}
                        aria-label={`Tester ${model.name}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                      >
                        <TestTube2 size={13} />
                      </button>
                    </div>
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminPanel>

      <AdminPanel id="quotas">
        <AdminPanelHeader
          title="Gestion des limites d'utilisation et règles de crédits"
          description="Ajustez les quotas d'allocation de jetons, le throttling des passerelles CLI et les délais d'interruption automatique."
          icon={<Timer size={15} />}
          action={<AdminBadge tone="neutral">gRPC temps réel</AdminBadge>}
        />
        <div className="grid gap-2.5 px-4 pb-3 md:grid-cols-3">
          {(Object.keys(quotaConfig) as QuotaKey[]).map((key) => (
            <QuotaSlider
              key={key}
              quotaKey={key}
              value={quotas[key]}
              onChange={(value) => setQuotas((current) => ({ ...current, [key]: value }))}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-[10px] text-on-surface-variant">
            <Sparkles size={10} className="mr-1 inline text-emerald-400" />
            Les modifications sont répercutées en temps réel sur l’ensemble des nœuds via gRPC.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <AdminButton
              size="sm"
              variant="ghost"
              onClick={() => {
                setQuotas(initialQuotas);
                toast.message("Quotas réinitialisés", { description: "Valeurs par défaut restaurées." });
              }}
            >
              Réinitialiser
            </AdminButton>
            <AdminButton
              size="sm"
              variant="primary"
              onClick={() => toast.success("Configuration sauvegardée", { description: "Quotas propagés aux 3 runners du cluster." })}
            >
              Sauvegarder la configuration
            </AdminButton>
          </div>
        </div>
      </AdminPanel>

      <AdminPanel>
        <AdminPanelHeader
          title="Top consommateurs de puissance de calcul"
          description="Utilisateurs les plus actifs & historique récent des générations."
          icon={<Zap size={15} />}
          action={<AdminButton size="sm" onClick={exportLogs}><Download size={12} /> Exporter logs CSV</AdminButton>}
        />
        <AdminTableShell>
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Utilisateur / organisation</AdminTh>
                <AdminTh>Projets générés</AdminTh>
                <AdminTh>Crédits utilisés</AdminTh>
                <AdminTh>Taux de build réussi</AdminTh>
                <AdminTh>Dernier pipeline</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {consumers.map((row) => (
                <tr key={row.email} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                  <AdminTd>
                    <span className="block font-medium text-on-surface">{row.user}</span>
                    <span className="block text-[10px] text-on-surface-variant">{row.email}</span>
                    <span className="mt-0.5 block text-[9px] text-on-surface-variant">{row.org} • {row.plan}</span>
                  </AdminTd>
                  <AdminTd className="font-semibold">{row.projects}</AdminTd>
                  <AdminTd>
                    <span className="block">{row.credits}</span>
                    <span className="block text-[10px] text-on-surface-variant">{row.perProject}</span>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold ${parseFloat(row.success) >= 99 ? "text-emerald-400" : "text-amber-300"}`}>{row.success}</span>
                      <div className="w-16"><AdminProgress value={parseFloat(row.success)} tone={parseFloat(row.success) >= 99 ? "emerald" : "white"} /></div>
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <span className="block font-mono text-[10px] text-on-surface">{row.pipeline}</span>
                    <span className="block text-[9px] text-on-surface-variant">{row.last}</span>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setInspect(row)} className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">Inspecter</button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuotaTarget(row);
                          setQuotaValue(Number(row.credits.replace(/[^\d]/g, "")) || 50);
                        }}
                        className="text-[10px] font-semibold text-on-surface-variant hover:text-on-surface"
                      >
                        Quota
                      </button>
                    </div>
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminPanel>

      <AdminModal
        open={Boolean(inspect)}
        onClose={() => setInspect(null)}
        title={inspect ? `Diagnostic — ${inspect.user}` : "Diagnostic"}
        description={inspect ? `${inspect.org} • ${inspect.plan}` : undefined}
        footer={
          <>
            <AdminButton onClick={() => setInspect(null)}>Fermer</AdminButton>
            <AdminButton
              variant="primary"
              onClick={() => {
                if (!inspect) return;
                toast.success("Pipeline relancé", { description: `${inspect.pipeline} en file d'attente prioritaire.` });
                setInspect(null);
              }}
            >
              <RefreshCw size={13} /> Relancer le dernier pipeline
            </AdminButton>
          </>
        }
      >
        {inspect && (
          <div className="space-y-2 text-[11px]">
            {[
              ["Email", inspect.email],
              ["Projets générés", inspect.projects],
              ["Crédits utilisés", `${inspect.credits} (${inspect.perProject})`],
              ["Taux de build réussi", inspect.success],
              ["Dernier pipeline", inspect.pipeline],
              ["Dernière activité", inspect.last],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-white/[0.05] py-1.5 last:border-0">
                <span className="text-on-surface-variant">{label}</span>
                <span className="font-medium text-on-surface">{value}</span>
              </div>
            ))}
          </div>
        )}
      </AdminModal>

      <AdminModal
        open={Boolean(quotaTarget)}
        onClose={() => setQuotaTarget(null)}
        title={quotaTarget ? `Quota — ${quotaTarget.user}` : "Quota"}
        description="Allocation mensuelle de crédits d'inférence pour ce compte."
        footer={
          <>
            <AdminButton onClick={() => setQuotaTarget(null)}>Annuler</AdminButton>
            <AdminButton
              variant="primary"
              onClick={() => {
                if (!quotaTarget) return;
                setConsumers((current) =>
                  current.map((row) =>
                    row.email === quotaTarget.email
                      ? { ...row, credits: `${quotaValue} crédits` }
                      : row
                  )
                );
                toast.success("Quota mis à jour", { description: `${quotaTarget.user} • ${quotaValue} crédits / mois.` });
                setQuotaTarget(null);
              }}
            >
              Appliquer
            </AdminButton>
          </>
        }
      >
        <div className="rounded-lg border border-white/[0.06] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wide text-on-surface-variant">Crédits mensuels</span>
            <span className="text-[12px] font-semibold text-emerald-300">{quotaValue} crédits</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={25}
            value={quotaValue}
            onChange={(event) => setQuotaValue(Number(event.target.value))}
            aria-label="Crédits mensuels"
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-500"
          />
        </div>
      </AdminModal>
    </div>
  );
}
