"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Hash,
  KeyRound,
  Mail,
  MonitorSmartphone,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Ticket,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { licenseInspection, licenses, subscriptionKpis } from "@/lib/data/admin";
import type { LicenseRow } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import {
  AdminBadge,
  AdminButton,
  AdminInput,
  AdminKpiCard,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminSelect,
  AdminTableShell,
  AdminTd,
  AdminTh,
  AdminTabs,
  FieldLabel,
} from "@/components/admin/ui";
import { downloadCsv } from "@/lib/export";

type StatusTab = "Tous" | LicenseRow["status"];

function statusTone(status: LicenseRow["status"]) {
  if (status === "Actif") return "success" as const;
  if (status === "Expiré") return "warning" as const;
  return "danger" as const;
}

const plans = ["Free Starter", "Pro Solo", "Pro All-Access Lifetime", "Entreprise Multi-sièges"];

export function AdminSubscriptionsScreen() {
  const [rows, setRows] = useState<LicenseRow[]>(licenses);
  const [status, setStatus] = useState<StatusTab>("Tous");
  const [query, setQuery] = useState("");
  const [formula, setFormula] = useState("Toutes");
  const [period, setPeriod] = useState("Toutes les périodes");
  const [selected, setSelected] = useState<LicenseRow>(licenses[0]);
  const [showInspection, setShowInspection] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);

  const [newClient, setNewClient] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState(plans[2]);
  const [newAmount, setNewAmount] = useState("299");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus = status === "Tous" || row.status === status;
      const matchesFormula = formula === "Toutes" || row.plan.includes(formula.replace("Multi-sièges", "Multi"));
      const matchesQuery =
        !normalized ||
        [row.client, row.email, row.license, row.plan].some((value) =>
          value.toLowerCase().includes(normalized)
        );
      return matchesStatus && matchesFormula && matchesQuery;
    });
  }, [rows, status, formula, query]);

  const inspection = useMemo(() => {
    if (selected.id === licenses[0].id) return licenseInspection;
    return {
      holder: selected.client,
      email: selected.email,
      verified: "Titulaire vérifié",
      stripe: "Stripe Customer OK",
      activationKey: selected.license.split("-")[0] + "-4096",
      hash: "SHA256 : 9a2c…f41b",
      machines: selected.seats.includes("10") ? "10 / 10 actifs" : "1 / 3 actifs",
      gateway: "Stripe Checkout",
      heartbeat: "Il y a 2 h",
      aiGeneration: selected.status === "Actif" ? "Illimité" : "Suspendu",
      cli: [
        { command: `netero license inspect ${selected.license}`, result: "200 OK" },
        { command: "netero verify --jwt", result: "200 OK" },
        { command: "IA CodeGen Engine v2.4", result: "980 tkn" },
      ],
    };
  }, [selected]);

  function syncStripe() {
    setSyncing(true);
    window.setTimeout(() => {
      setSyncing(false);
      toast.success("Stripe synchronisé", {
        description: `${rows.length} licences vérifiées • 0 divergence détectée.`,
      });
    }, 900);
  }

  function createLicense() {
    if (!newClient.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      toast.error("Champs invalides", { description: "Renseignez un titulaire et un email valides." });
      return;
    }
    const number = rows.length + 8841;
    const row: LicenseRow = {
      id: `lic-${number}`,
      client: newClient.trim(),
      email: newEmail.trim(),
      plan: newPlan,
      seats: newPlan.includes("Entreprise") ? "10 sièges" : "1 siège",
      license: `MANUAL-${String(number).slice(-4)}`,
      start: "Aujourd'hui",
      end: newPlan.includes("Lifetime") ? "Illimité (à vie)" : "Dans 1 an",
      amount: `${newAmount} €`,
      status: "Actif",
    };
    setRows((current) => [row, ...current]);
    setSelected(row);
    setShowInspection(true);
    setCreateOpen(false);
    setNewClient("");
    setNewEmail("");
    toast.success("Licence créée", { description: `${row.client} • ${row.license} • clé RSA-4096 générée.` });
  }

  function exportRows() {
    downloadCsv("netero-abonnements.csv", [
      ["Client", "Email", "Formule", "Sièges", "Licence", "Début", "Échéance", "Montant", "Statut"],
      ...filtered.map((row) => [row.client, row.email, row.plan, row.seats, row.license, row.start, row.end, row.amount, row.status]),
    ]);
    toast.success("Export généré", { description: `${filtered.length} abonnement(s) exporté(s).` });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Console système › Billing core › Env : production-FR"
        title="Gestion des abonnements & Licences"
        description="Supervision des formules Free, Pro All-Access Lifetime et abonnements Entreprise récurrents. Audit cryptographique des clés et synchronisation passerelle Stripe."
        actions={
          <>
            <AdminButton onClick={() => setPoliciesOpen(true)}>
              <Settings2 size={13} /> Politiques tarifaires
            </AdminButton>
            <AdminButton variant="primary" onClick={() => setCreateOpen(true)}>
              <Plus size={13} /> Créer une licence manuelle
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {subscriptionKpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            icon={<AdminKpiIcon name={kpi.icon} />}
          />
        ))}
      </div>

      <AdminPanel>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <AdminTabs
            tabs={[
              { value: "Tous" as StatusTab, label: "Tous (1 380)" },
              { value: "Actif" as StatusTab, label: "Actifs (1 245)" },
              { value: "Expiré" as StatusTab, label: "Expirés / En attente" },
              { value: "Annulé" as StatusTab, label: "Annulés" },
            ]}
            value={status}
            onChange={setStatus}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={syncStripe}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/15 disabled:opacity-60"
            >
              <RefreshCw size={11} className={syncing ? "animate-spin" : undefined} />
              {syncing ? "Sync…" : "Stripe sync OK"}
            </button>
            <AdminButton size="sm" onClick={exportRows}>Exporter</AdminButton>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="relative min-w-[240px] flex-1">
            <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <AdminInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filtrer par nom, email, ID de licence cryptée ou token Stripe…"
              className="h-8 pl-7 text-[11px]"
            />
          </div>
          <AdminSelect value={period} onChange={(event) => setPeriod(event.target.value)}>
            {["Toutes les périodes", "Ce mois", "Ce trimestre", "Cette année"].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </AdminSelect>
          <AdminSelect value={formula} onChange={(event) => setFormula(event.target.value)}>
            {["Toutes", "Pro All-Access", "Pro Solo", "Entreprise", "IA Pro"].map((item) => (
              <option key={item} value={item}>{item === "Toutes" ? "Toutes formules confondues" : item}</option>
            ))}
          </AdminSelect>
          <AdminButton size="sm" variant={showInspection ? "primary" : "secondary"} onClick={() => setShowInspection((value) => !value)}>
            <ShieldCheck size={12} /> Inspection licence
          </AdminButton>
        </div>

        <div className={`grid ${showInspection ? "xl:grid-cols-[minmax(0,1fr)_300px]" : "grid-cols-1"}`}>
          <div className="min-w-0">
            <AdminTableShell>
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr>
                    <AdminTh>Client</AdminTh>
                    <AdminTh>Formule</AdminTh>
                    <AdminTh>Licence / Stripe</AdminTh>
                    <AdminTh>Début</AdminTh>
                    <AdminTh>Échéance</AdminTh>
                    <AdminTh>Statut</AdminTh>
                    <AdminTh className="text-right">Montant</AdminTh>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setSelected(row);
                        setShowInspection(true);
                      }}
                      className={`cursor-pointer border-t border-white/[0.05] transition-colors hover:bg-white/[0.03] ${
                        selected.id === row.id ? "bg-white/[0.03]" : ""
                      }`}
                    >
                      <AdminTd>
                        <span className="block font-medium text-on-surface">{row.client}</span>
                        <span className="block text-[10px] text-on-surface-variant">{row.email}</span>
                      </AdminTd>
                      <AdminTd>
                        <span className="block text-on-surface">{row.plan}</span>
                        <span className="block text-[10px] text-on-surface-variant">{row.seats}</span>
                      </AdminTd>
                      <AdminTd>
                        <span className="block font-mono text-[10px] text-emerald-300">{row.license}</span>
                        <span className="block text-[10px] text-on-surface-variant">Stripe • visa</span>
                      </AdminTd>
                      <AdminTd className="whitespace-nowrap text-on-surface-variant">{row.start}</AdminTd>
                      <AdminTd className="whitespace-nowrap text-on-surface-variant">{row.end}</AdminTd>
                      <AdminTd><AdminBadge tone={statusTone(row.status)} dot>{row.status}</AdminBadge></AdminTd>
                      <AdminTd className="text-right font-semibold">{row.amount}</AdminTd>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <Ticket size={22} className="mx-auto mb-2 text-on-surface-variant" />
                        <p className="text-[12px] font-medium text-on-surface">Aucune licence trouvée</p>
                        <p className="mt-1 text-[11px] text-on-surface-variant">Modifiez les filtres ou créez une licence manuelle.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </AdminTableShell>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
              <p className="text-[10px] text-on-surface-variant">
                Affichage 1 à {filtered.length} sur 1 380 abonnements • {period}
              </p>
              <div className="flex items-center gap-1">
                <AdminButton size="sm" variant="ghost" disabled><ChevronLeft size={13} /> Précédent</AdminButton>
                <span className="px-2 text-[10px] font-semibold text-on-surface">230</span>
                <AdminButton size="sm" variant="ghost" disabled>Suivant <ChevronRight size={13} /></AdminButton>
              </div>
            </div>
          </div>

          {showInspection && (
            <aside className="border-t border-white/[0.06] bg-[#1C1B1B]/60 p-3.5 xl:border-l xl:border-t-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">Inspection licence</p>
                  <p className="mt-0.5 font-mono text-[11px] font-semibold text-emerald-300">ID #{selected.license.slice(-4)}</p>
                </div>
                <button type="button" onClick={() => setShowInspection(false)} aria-label="Fermer l'inspection" className="text-on-surface-variant hover:text-on-surface">
                  <X size={14} />
                </button>
              </div>

              <div className="mt-3 rounded-lg border border-white/[0.06] bg-[#201F1F] p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">
                    {inspection.holder.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-on-surface">{inspection.holder}</p>
                    <p className="truncate text-[9px] text-on-surface-variant">{inspection.email}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <AdminBadge tone="success"><CheckCircle2 size={9} /> {inspection.verified}</AdminBadge>
                  <AdminBadge tone="info"><CreditCard size={9} /> Stripe OK</AdminBadge>
                </div>
              </div>

              <div className="mt-2.5 space-y-2 text-[10px]">
                <div className="rounded-lg border border-white/[0.06] p-2.5">
                  <p className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-on-surface-variant"><KeyRound size={10} /> Clé d’activation RSA-4096</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-on-surface">{inspection.activationKey}</span>
                    <button type="button" onClick={() => { navigator.clipboard?.writeText(inspection.activationKey); toast.success("Clé copiée"); }} className="text-on-surface-variant hover:text-on-surface"><Copy size={11} /></button>
                  </div>
                  <p className="mt-1 flex items-center gap-1 font-mono text-[9px] text-on-surface-variant"><Hash size={9} /> {inspection.hash}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-white/[0.06] p-2.5">
                    <p className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-on-surface-variant"><MonitorSmartphone size={10} /> Empreintes</p>
                    <p className="mt-1 font-semibold text-on-surface">{inspection.machines}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] p-2.5">
                    <p className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-on-surface-variant"><Radio size={10} /> Heartbeat</p>
                    <p className="mt-1 font-semibold text-on-surface">{inspection.heartbeat}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] p-2.5">
                    <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">Passerelle</p>
                    <p className="mt-1 font-semibold text-on-surface">{inspection.gateway}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] p-2.5">
                    <p className="text-[9px] uppercase tracking-wide text-on-surface-variant">Génération IA</p>
                    <p className="mt-1 font-semibold text-emerald-300">{inspection.aiGeneration}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-[#141414] p-2.5">
                  <p className="mb-1.5 text-[9px] uppercase tracking-wide text-on-surface-variant">Dernières requêtes CLI</p>
                  {inspection.cli.map((entry) => (
                    <div key={entry.command} className="flex items-center justify-between gap-2 border-t border-white/[0.05] py-1 font-mono text-[9px]">
                      <span className="truncate text-on-surface">{entry.command}</span>
                      <span className="shrink-0 text-emerald-300">{entry.result}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-1">
                  <AdminButton size="sm" className="w-full" onClick={() => toast.success("Vérification Stripe forcée", { description: `Licence ${selected.license} revalidée.` })}>
                    <RefreshCw size={11} /> Forcer re-vérification Stripe
                  </AdminButton>
                  <AdminButton size="sm" className="w-full" onClick={() => toast.success("Accès renvoyés", { description: `Email envoyé à ${inspection.email}.` })}>
                    <Mail size={11} /> Renvoyer les accès par email
                  </AdminButton>
                  <AdminButton
                    size="sm"
                    variant="danger"
                    className="w-full"
                    onClick={() => {
                      setRows((current) => current.map((row) => (row.id === selected.id ? { ...row, status: "Annulé" } : row)));
                      setSelected((current) => ({ ...current, status: "Annulé" }));
                      toast.success("Accès révoqué", { description: `${selected.license} ajoutée à la blacklist.` });
                    }}
                  >
                    <Ban size={11} /> Révoquer l’accès / blacklist
                  </AdminButton>
                </div>
              </div>
            </aside>
          )}
        </div>
      </AdminPanel>

      <AdminModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer une licence manuelle"
        description="Génère une clé cryptographique RSA-4096 et associe le client au billing core."
        footer={
          <>
            <AdminButton onClick={() => setCreateOpen(false)}>Annuler</AdminButton>
            <AdminButton variant="primary" onClick={createLicense}>
              <KeyRound size={13} /> Générer la licence
            </AdminButton>
          </>
        }
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <FieldLabel>Titulaire</FieldLabel>
              <AdminInput value={newClient} onChange={(event) => setNewClient(event.target.value)} placeholder="Nom du client" />
            </label>
            <label className="block space-y-1">
              <FieldLabel>Email</FieldLabel>
              <AdminInput value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="client@entreprise.com" type="email" />
            </label>
          </div>
          <label className="block space-y-1">
            <FieldLabel>Formule</FieldLabel>
            <AdminSelect className="h-9 w-full" value={newPlan} onChange={(event) => setNewPlan(event.target.value)}>
              {plans.map((item) => <option key={item} value={item}>{item}</option>)}
            </AdminSelect>
          </label>
          <label className="block space-y-1">
            <FieldLabel>Montant facturé (€)</FieldLabel>
            <AdminInput value={newAmount} onChange={(event) => setNewAmount(event.target.value)} inputMode="numeric" />
          </label>
          <div className="rounded-lg border border-white/[0.06] bg-[#1C1B1B] p-2.5 text-[10px] text-on-surface-variant">
            <ShieldCheck size={11} className="mr-1 inline text-emerald-400" />
            La clé sera chiffrée, stockée dans le vault et envoyée au client par email sécurisé.
          </div>
        </div>
      </AdminModal>

      <AdminModal
        open={policiesOpen}
        onClose={() => setPoliciesOpen(false)}
        title="Politiques tarifaires"
        description="Grille officielle appliquée par le billing core et Stripe."
        footer={<AdminButton variant="primary" onClick={() => { setPoliciesOpen(false); toast.success("Politiques publiées", { description: "Les nouvelles règles tarifaires sont actives." }); }}>Appliquer</AdminButton>}
      >
        <div className="space-y-2">
          {[
            { plan: "Free Starter", price: "0 €", detail: "1 projet • crédits limités" },
            { plan: "Pro Solo", price: "29 €/m", detail: "Projets illimités • 1 siège" },
            { plan: "Pro All-Access Lifetime", price: "299 €", detail: "Licence à vie • tous les boilerplates" },
            { plan: "Entreprise Multi-sièges", price: "599 €", detail: "10 sièges • SLA 99.9 %" },
          ].map((item) => (
            <div key={item.plan} className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] px-3 py-2">
              <div>
                <p className="text-[11px] font-medium text-on-surface">{item.plan}</p>
                <p className="text-[10px] text-on-surface-variant">{item.detail}</p>
              </div>
              <span className="text-[12px] font-semibold text-emerald-300">{item.price}</span>
            </div>
          ))}
        </div>
      </AdminModal>
    </div>
  );
}
