"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Plug,
  Receipt,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { paymentKpis, payments, revenueSeries } from "@/lib/data/admin";
import type { PaymentRow } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import { RevenueVolumeChart, LegendDot } from "@/components/admin/charts";
import {
  AdminBadge,
  AdminButton,
  AdminInput,
  AdminKpiCard,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminPanelHeader,
  AdminSelect,
  AdminTableShell,
  AdminTd,
  AdminTh,
  AdminTabs,
  FieldLabel,
} from "@/components/admin/ui";
import { downloadCsv, openPrintableReport } from "@/lib/export";

type Range = keyof typeof revenueSeries;

const ranges: { value: Range; label: string }[] = [
  { value: "mois", label: "Ce mois" },
  { value: "trimestre", label: "Ce trimestre" },
  { value: "annee", label: "Cette année" },
  { value: "tout", label: "Tout l'historique" },
];

const rangeLabels: Record<Range, string> = {
  mois: "12 mois glissants",
  trimestre: "4 derniers trimestres",
  annee: "5 dernières années",
  tout: "Historique complet",
};

function statusTone(status: PaymentRow["status"]) {
  if (status === "Réussi") return "success" as const;
  if (status === "Litige") return "warning" as const;
  return "danger" as const;
}

export function AdminPaymentsScreen() {
  const [range, setRange] = useState<Range>("mois");
  const [status, setStatus] = useState("Tous");
  const [method, setMethod] = useState("Tous");
  const [minAmount, setMinAmount] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(true);
  const [details, setDetails] = useState<PaymentRow | null>(null);

  const data = revenueSeries[range];
  const last = data[data.length - 1];
  const peak = data.reduce((best, item) => (item.mrr > best.mrr ? item : best), data[0]);

  const methods = useMemo(
    () => ["Tous", ...Array.from(new Set(payments.map((row) => row.method)))],
    []
  );

  const filtered = useMemo(() => {
    const threshold = Number(minAmount);
    return payments.filter((row) => {
      const matchesStatus = status === "Tous" || row.status === status;
      const matchesMethod = method === "Tous" || row.method === method;
      const matchesAmount = !minAmount || Number(row.amount.replace(/[^\d,.]/g, "").replace(",", ".")) >= threshold;
      return matchesStatus && matchesMethod && matchesAmount;
    });
  }, [status, method, minAmount]);

  function exportAudit() {
    downloadCsv("netero-audit-financier.csv", [
      ["Stripe ID", "Client", "Email", "Produit", "Montant", "Moyen", "Date", "Statut"],
      ...filtered.map((row) => [row.id, row.client, row.email, row.product, row.amount, row.method, row.date, row.status]),
    ]);
    toast.success("Audit financier exporté", { description: `${filtered.length} transaction(s) • format CSV.` });
  }

  function openInvoice(row: PaymentRow) {
    openPrintableReport(`Facture ${row.id}`, [
      {
        heading: "Client",
        lines: [row.client, row.email, `Moyen de paiement : ${row.method}`, `Date : ${row.date}`],
      },
      {
        heading: "Détail de la transaction",
        lines: [`Stripe ID : ${row.id}`, `Produit : ${row.product}`, `Montant : ${row.amount}`, `Statut : ${row.status}`],
      },
      {
        heading: "Mentions légales",
        lines: ["NETERO SAS — 12 rue de la Paix, 75002 Paris", "TVA FR 32 891 402 117", "Paiement sécurisé via Stripe"],
      },
    ]);
    toast.success("Facture générée", { description: "La fenêtre d'impression a été ouverte." });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Console système › Trésorerie & facturation"
        title="Paiements & Revenus"
        description="Suivi financier des transactions Stripe, des licences vendues et des flux de trésorerie."
        actions={
          <>
            <AdminButton
              variant={stripeConnected ? "secondary" : "primary"}
              onClick={() => {
                if (!stripeConnected) {
                  setStripeConnected(true);
                  toast.success("Stripe connecté", { description: "Webhooks et synchronisation temps réel activés." });
                } else {
                  toast.message("Stripe opérationnel", { description: "Compte acct_1P8k… • webhooks signés." });
                }
              }}
            >
              <Plug size={13} />
              {stripeConnected ? "Stripe connecté" : "Connecter Stripe"}
            </AdminButton>
            <AdminButton variant="primary" onClick={exportAudit}>
              <Download size={13} /> Exporter l’audit financier
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {paymentKpis.map((kpi) => (
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

      <AdminPanel>
        <AdminPanelHeader
          title="Évolution du revenu & volume des ventes"
          description={`Comparatif MRR mensuel vs volume unitaire • ${rangeLabels[range]}`}
          action={<AdminTabs tabs={ranges} value={range} onChange={setRange} />}
        />
        <div className="flex flex-wrap items-center gap-4 px-4 pb-1 sm:px-5">
          <LegendDot color="#FFFFFF" label="MRR" value={`${last.mrr.toLocaleString("fr-FR")} € (${last.label})`} />
          <LegendDot color="#3A3939" label="Volume de licences" value={`${last.volume}`} />
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-400">
            <ArrowUpRight size={11} /> Pic : {peak.label} • {(peak.mrr / 1000).toFixed(1)}k €
          </span>
        </div>
        <div className="px-2 pb-3 sm:px-3">
          <RevenueVolumeChart data={data} />
        </div>
      </AdminPanel>

      <AdminPanel>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <div>
            <h2 className="text-[14px] font-semibold text-on-surface">Journal des transactions en direct</h2>
            <p className="mt-0.5 text-[10px] text-on-surface-variant">Flux Stripe signé • {filtered.length} sur 2 140</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminSelect value={status} onChange={(event) => setStatus(event.target.value)}>
              {["Tous", "Réussi", "Litige", "Échoué"].map((item) => (
                <option key={item} value={item}>{item === "Tous" ? "Tous les statuts" : item}</option>
              ))}
            </AdminSelect>
            <AdminButton size="sm" variant={advanced ? "primary" : "secondary"} onClick={() => setAdvanced((value) => !value)}>
              <SlidersHorizontal size={12} /> Filtres avancés
            </AdminButton>
          </div>
        </div>

        {advanced && (
          <div className="flex flex-wrap items-end gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <label className="space-y-1">
              <FieldLabel>Moyen de paiement</FieldLabel>
              <AdminSelect value={method} onChange={(event) => setMethod(event.target.value)}>
                {methods.map((item) => <option key={item} value={item}>{item === "Tous" ? "Tous les moyens" : item}</option>)}
              </AdminSelect>
            </label>
            <label className="space-y-1">
              <FieldLabel>Montant minimum (€)</FieldLabel>
              <AdminInput value={minAmount} onChange={(event) => setMinAmount(event.target.value)} placeholder="0" inputMode="numeric" className="h-8 w-[140px]" />
            </label>
            <AdminButton size="sm" variant="ghost" onClick={() => { setStatus("Tous"); setMethod("Tous"); setMinAmount(""); }}>
              Réinitialiser
            </AdminButton>
          </div>
        )}

        <AdminTableShell>
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Client</AdminTh>
                <AdminTh>Produit / licence</AdminTh>
                <AdminTh>Stripe ID</AdminTh>
                <AdminTh>Montant</AdminTh>
                <AdminTh>Moyen de paiement</AdminTh>
                <AdminTh>Date / heure</AdminTh>
                <AdminTh>Statut</AdminTh>
                <AdminTh className="text-right">Facture</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                  <AdminTd>
                    <span className="block font-medium text-on-surface">{row.client}</span>
                    <span className="block text-[10px] text-on-surface-variant">{row.email}</span>
                  </AdminTd>
                  <AdminTd className="text-on-surface-variant">{row.product}</AdminTd>
                  <AdminTd className="font-mono text-[10px] text-on-surface-variant">{row.id}</AdminTd>
                  <AdminTd className="font-semibold">{row.amount}</AdminTd>
                  <AdminTd>
                    <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                      <CreditCard size={12} /> {row.method}
                    </span>
                  </AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface-variant">{row.date}</AdminTd>
                  <AdminTd><AdminBadge tone={statusTone(row.status)} dot>{row.status}</AdminBadge></AdminTd>
                  <AdminTd className="text-right">
                    {row.status === "Litige" ? (
                      <button type="button" onClick={() => setDetails(row)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 hover:text-amber-200">
                        Détails <ExternalLink size={10} />
                      </button>
                    ) : (
                      <button type="button" onClick={() => openInvoice(row)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">
                        <FileText size={11} /> PDF
                      </button>
                    )}
                  </AdminTd>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Wallet size={22} className="mx-auto mb-2 text-on-surface-variant" />
                    <p className="text-[12px] font-medium text-on-surface">Aucune transaction</p>
                    <p className="mt-1 text-[11px] text-on-surface-variant">Ajustez les filtres avancés.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </AdminTableShell>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-[10px] text-on-surface-variant">Affichage 1–{filtered.length} sur 2 140 transactions</p>
          <button type="button" onClick={exportAudit} className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">
            <Download size={11} /> Exporter au format CSV
          </button>
        </div>
      </AdminPanel>

      <AdminModal
        open={Boolean(details)}
        onClose={() => setDetails(null)}
        title={details?.status === "Litige" ? "Litige en cours d'examen" : "Détail de la transaction"}
        description={details ? `${details.id} • ${details.client}` : undefined}
        footer={
          <>
            <AdminButton onClick={() => setDetails(null)}>Fermer</AdminButton>
            <AdminButton
              variant="primary"
              onClick={() => {
                if (!details) return;
                toast.success("Litige transmis à Stripe", { description: "Un dossier de contestation a été ouvert." });
                setDetails(null);
              }}
            >
              <Download size={13} /> Ouvrir le dossier
            </AdminButton>
          </>
        }
      >
        {details && (
          <div className="space-y-2 text-[11px]">
            {[
              ["Client", details.client],
              ["Email", details.email],
              ["Produit", details.product],
              ["Montant", details.amount],
              ["Moyen de paiement", details.method],
              ["Date", details.date],
              ["Statut", details.status],
              ["Stripe ID", details.id],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-white/[0.05] py-1.5 last:border-0">
                <span className="text-on-surface-variant">{label}</span>
                <span className="font-medium text-on-surface">{value}</span>
              </div>
            ))}
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-2.5 text-[10px] text-amber-200">
              <Receipt size={13} className="mt-0.5 shrink-0" />
              Charge contestée par le titulaire de la carte. Réponse requise sous 7 jours ouvrés.
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
