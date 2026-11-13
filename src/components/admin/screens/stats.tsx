"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Download,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminReports,
  formulaDistribution,
  generatorMix,
  opsMetrics,
  statsKpis,
  statsSummary,
  usersEvolution,
} from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import {
  FormulaDonut,
  GeneratorMixChart,
  LegendDot,
  RevenueProjectionChart,
  UsersEvolutionChart,
} from "@/components/admin/charts";
import {
  AdminBadge,
  AdminButton,
  AdminKpiCard,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminPanelHeader,
  AdminSelect,
  AdminTd,
  AdminTh,
  AdminTableShell,
  FieldLabel,
} from "@/components/admin/ui";
import { downloadCsv, openPrintableReport } from "@/lib/export";

type Period = keyof typeof usersEvolution;

const periods: { value: Period; label: string }[] = [
  { value: "90j", label: "Derniers 90 jours" },
  { value: "180j", label: "6 derniers mois" },
  { value: "365j", label: "12 derniers mois" },
];

export function AdminStatsScreen() {
  const [period, setPeriod] = useState<Period>("90j");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState<"PDF" | "CSV">("PDF");
  const [reportType, setReportType] = useState("Activité plateforme");

  const periodLabel = periods.find((item) => item.value === period)?.label ?? "Derniers 90 jours";
  const totalUsers = formulaDistribution.reduce((sum, item) => sum + item.value, 0);
  const data = usersEvolution[period];

  const reportSections = useMemo(
    () => [
      { heading: "Acquisition & utilisateurs", lines: statsKpis.map((kpi) => `${kpi.label} : ${kpi.value} (${kpi.hint ?? ""})`) },
      { heading: "Répartition des formules", lines: formulaDistribution.map((item) => `${item.name} : ${item.value.toLocaleString("fr-FR")} comptes (${item.percent})`) },
      { heading: "Indicateurs clés", lines: statsSummary.map((item) => `${item.label} : ${item.value}`) },
      { heading: "Opérations & infrastructure", lines: opsMetrics.map((item) => `${item.label} : ${item.value}`) },
    ],
    []
  );

  function generateReport() {
    if (reportFormat === "PDF") {
      openPrintableReport(reportType, reportSections);
      toast.success("Rapport PDF généré", { description: "La fenêtre d'impression a été ouverte." });
    } else {
      downloadCsv(`netero-rapport-${reportType.toLowerCase().replace(/\s+/g, "-")}.csv`, [
        ["Section", "Indicateur", "Valeur"],
        ...reportSections.flatMap((section) =>
          section.lines.map((line) => {
            const [label, ...rest] = line.split(" : ");
            return [section.heading, label, rest.join(" : ")];
          })
        ),
      ]);
      toast.success("Rapport CSV généré", { description: "Le fichier a été téléchargé." });
    }
    setReportOpen(false);
  }

  function downloadReport(title: string, format: "PDF" | "CSV") {
    if (format === "PDF") {
      openPrintableReport(title, reportSections);
    } else {
      downloadCsv(`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`, [
        ["Titre", title],
        ["Généré le", new Date().toLocaleString("fr-FR")],
        [],
        ["Section", "Indicateur", "Valeur"],
        ...reportSections.flatMap((section) =>
          section.lines.map((line) => {
            const [label, ...rest] = line.split(" : ");
            return [section.heading, label, rest.join(" : ")];
          })
        ),
      ]);
    }
    toast.success(`${format} téléchargé`, { description: title });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Telemetry // Reports ref: netero-analytics-v2"
        title="Statistiques globales & Rapports"
        description="Analytique approfondie de la plateforme, conversion commerciale et indicateurs de performance clés. Synchronisation en continu avec le cluster télémétrique."
        actions={
          <>
            <AdminSelect value={period} onChange={(event) => setPeriod(event.target.value as Period)} className="h-9">
              {periods.map((item) => (
                <option key={item.value} value={item.value}>Période : {item.label}</option>
              ))}
            </AdminSelect>
            <AdminButton variant="primary" onClick={() => setReportOpen(true)}>
              <FileText size={13} /> Générer un rapport PDF / CSV
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {statsKpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            icon={<AdminKpiIcon name={kpi.icon} />}
            accent={kpi.icon === "users"}
          />
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <AdminPanel>
          <AdminPanelHeader
            title="Évolution du nombre d'utilisateurs"
            description={`Inscriptions cumulées vs actifs hebdomadaires (${periodLabel})`}
          />
          <div className="flex flex-wrap items-center gap-4 px-4 pb-1 sm:px-5">
            <LegendDot color="#FFFFFF" label="Cumulés" value={data[data.length - 1].cumules.toLocaleString("fr-FR")} />
            <LegendDot color="#10B981" label="Actifs" value={data[data.length - 1].actifs.toLocaleString("fr-FR")} />
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-400"><ArrowUpRight size={11} /> +12.4 %</span>
          </div>
          <div className="px-2 pb-3 sm:px-3">
            <UsersEvolutionChart data={data} />
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader title="Répartition des formules" description="Free vs Pro All-Access vs Enterprise" />
          <FormulaDonut data={formulaDistribution} total={totalUsers.toLocaleString("fr-FR")} />
          <div className="space-y-1.5 px-4 pb-4">
            {formulaDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 border-b border-white/[0.05] py-1.5 last:border-0">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="flex-1 text-[10px] text-on-surface-variant">{item.name}</span>
                <span className="text-[10px] font-semibold text-on-surface">{item.value.toLocaleString("fr-FR")}</span>
                <span className="w-9 text-right text-[10px] text-on-surface-variant">{item.percent}</span>
              </div>
            ))}
          </div>
        </AdminPanel>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-5">
        {statsSummary.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
            <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">{item.label}</p>
            <p className="mt-1 text-[13px] font-semibold text-on-surface">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <AdminPanel>
          <AdminPanelHeader
            title="Évolution des revenus et du MRR"
            description="Stripe cohort analysis • projections Q1 / Q2"
          />
          <div className="flex flex-wrap items-center gap-4 px-4 pb-1 sm:px-5">
            <LegendDot color="#FFFFFF" label="Réel" value="48 250 €" />
            <LegendDot color="#8E9192" label="Projection" value="58 100 €" />
          </div>
          <div className="px-2 pb-3 sm:px-3">
            <RevenueProjectionChart />
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader
            title="Boilerplates vs générateur IA"
            description="Dépôts téléchargés vs inférences de scaffolding"
            action={
              <div className="flex items-center gap-3">
                <LegendDot color="#FFFFFF" label="Inférences" />
                <LegendDot color="#444748" label="Clones" />
              </div>
            }
          />
          <div className="px-2 pb-1 sm:px-3">
            <GeneratorMixChart data={generatorMix} />
          </div>
          <div className="space-y-1 px-4 pb-4">
            {generatorMix.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3 border-b border-white/[0.05] py-1 last:border-0">
                <span className="truncate text-[10px] text-on-surface-variant">{item.name}</span>
                <span className="shrink-0 text-[10px] text-on-surface">{item.jobs.toLocaleString("fr-FR")} jobs • {item.clones.toLocaleString("fr-FR")} clones</span>
              </div>
            ))}
          </div>
        </AdminPanel>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <AdminPanel className="p-3.5">
          <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">Net revenue retention</p>
          <p className="mt-1 flex items-center gap-1.5 text-[18px] font-bold text-emerald-400">119.3 % <TrendingUp size={14} /></p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">MRR actuel : 142 850,00 €</p>
        </AdminPanel>
        <AdminPanel className="p-3.5">
          <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">Total prompts IA</p>
          <p className="mt-1 text-[18px] font-bold text-on-surface">12 100 <span className="text-[10px] font-normal text-on-surface-variant">execs</span></p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">Ratio clones / IA : 0.67</p>
        </AdminPanel>
        {opsMetrics.map((metric) => (
          <AdminPanel key={metric.label} className="p-3.5">
            <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">{metric.label}</p>
            <p className="mt-1 text-[15px] font-bold text-on-surface">{metric.value}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-emerald-400"><CheckCircle2 size={10} /> SLO respecté</p>
          </AdminPanel>
        ))}
      </div>

      <AdminPanel>
        <AdminPanelHeader
          title="Rapports d'activité & conformité légale"
          description="Exports comptables, audits d'infrastructure et conformité prêts pour vérification interne et fiscale."
          action={<AdminBadge tone="neutral">Total : {adminReports.length} récents</AdminBadge>}
        />
        <AdminTableShell>
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Rapport</AdminTh>
                <AdminTh>Généré</AdminTh>
                <AdminTh>Taille</AdminTh>
                <AdminTh>Statut</AdminTh>
                <AdminTh className="text-right">Téléchargements</AdminTh>
              </tr>
            </thead>
            <tbody>
              {adminReports.map((report) => (
                <tr key={report.id} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                  <AdminTd>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-on-surface-variant"><FileText size={13} /></span>
                      <span className="font-medium text-on-surface">{report.title}</span>
                    </div>
                  </AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface-variant">{report.generated}</AdminTd>
                  <AdminTd className="text-on-surface-variant">{report.size}</AdminTd>
                  <AdminTd><AdminBadge tone="success">{report.status}</AdminBadge></AdminTd>
                  <AdminTd>
                    <div className="flex items-center justify-end gap-1.5">
                      <AdminButton size="sm" onClick={() => downloadReport(report.title, "PDF")}>
                        <Download size={11} /> PDF
                      </AdminButton>
                      <AdminButton size="sm" variant="ghost" onClick={() => downloadReport(report.title, "CSV")}>
                        <FileSpreadsheet size={11} /> CSV
                      </AdminButton>
                    </div>
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminPanel>

      <AdminModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Générer un rapport"
        description="Choisissez le périmètre et le format d'export du rapport analytique."
        footer={
          <>
            <AdminButton onClick={() => setReportOpen(false)}>Annuler</AdminButton>
            <AdminButton variant="primary" onClick={generateReport}>
              <Download size={13} /> Générer le rapport
            </AdminButton>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block space-y-1">
            <FieldLabel>Type de rapport</FieldLabel>
            <AdminSelect className="h-9 w-full" value={reportType} onChange={(event) => setReportType(event.target.value)}>
              {["Activité plateforme", "Audit financier", "Performance infrastructure", "Conformité SOC2"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </AdminSelect>
          </label>
          <div className="space-y-1">
            <FieldLabel>Format</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {(["PDF", "CSV"] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setReportFormat(format)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors ${
                    reportFormat === format
                      ? "border-emerald-500/40 bg-emerald-500/10 text-on-surface"
                      : "border-white/10 text-on-surface-variant hover:bg-white/[0.04]"
                  }`}
                >
                  {format === "PDF" ? <FileText size={13} /> : <FileSpreadsheet size={13} />}
                  {format === "PDF" ? "Document PDF" : "Tableur CSV"}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#1C1B1B] p-2.5 text-[10px] text-on-surface-variant">
            <ArrowDownRight size={11} className="mr-1 inline text-emerald-400" />
            Le rapport inclut {periodLabel.toLowerCase()}, les KPI d’acquisition, la répartition des formules et les métriques d’infrastructure.
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
