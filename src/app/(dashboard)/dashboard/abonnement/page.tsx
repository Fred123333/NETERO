import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Crown,
  Download,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { Bar, PageHeader, Panel, PanelHeader, StatTile, StatusPill } from "@/components/dashboard/ui";
import { invoices } from "@/lib/data/dashboard";

export const metadata: Metadata = {
  title: "Mon abonnement & Facturation — NETERO",
};

const planFeatures = [
  "Accès illimité aux 24 boilerplates Next.js 15",
  "Générations IA illimitées (juste prix par crédit)",
  "Licence commerciale pour projets clients",
  "Support prioritaire avec SLA < 4 h",
  "Synchronisation CLI multi-appareils",
  "Mises à jour de sécurité automatiques",
];

const quotaUsage = [
  { label: "Génération de composants", used: 9, total: 15 },
  { label: "Architectures backend Prisma", used: 5, total: 15 },
  { label: "Audit sécurité & TypeScript", used: 2, total: 15 },
];

export default function AbonnementPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Workspace / Compte / Facturation"
        title="Mon abonnement & Facturation"
        description="Gérez votre licence Pro All-Access, vos crédits de génération IA, votre moyen de paiement et téléchargez vos factures."
        actions={
          <StatusPill tone="success">
            <ShieldCheck size={11} />
            Licence Pro active
          </StatusPill>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Licence" value="Pro" hint="All-Access lifetime" icon={<Crown size={16} />} accent />
        <StatTile label="Crédits IA" value="85" hint="sur 100 restants" icon={<Zap size={16} />} />
        <StatTile label="Prochaine échéance" value="—" hint="Licence à vie, sans renouvellement" icon={<RefreshCw size={16} />} />
        <StatTile label="Moyen de paiement" value="Visa" hint="•••• 4242" icon={<CreditCard size={16} />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel className="relative overflow-hidden border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/12 via-surface-container to-surface-container">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] opacity-[0.07] [background-size:24px_24px]" />
            <div className="relative p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-2.5 py-1 font-label-sm text-[10px] font-semibold uppercase tracking-wide text-[#FFD700]">
                    <Crown size={12} />
                    Plan actuel
                  </span>
                  <h2 className="mt-3 font-headline-lg text-2xl font-bold text-on-surface">
                    Pro All-Access
                  </h2>
                  <p className="mt-1 font-body-sm text-[12px] text-on-surface-variant">
                    Licence à vie • Paiement unique • Accès total au catalogue et au moteur IA.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-headline-lg text-2xl font-bold text-[#FFD700]">299 €</div>
                  <div className="font-body-sm text-[11px] text-on-surface-variant">payé une fois</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {planFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2 font-body-sm text-[12px] text-on-surface-variant">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#FFD700]" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="mb-1.5 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Clé d&apos;activation CLI
                </p>
                <CopyButton
                  text="netero_pro_live_8f2c-91bd-4a77-ae10-2f6c3d9b"
                  label="Clé de licence :"
                />
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Quota de génération IA"
              description="85 crédits restants sur 100. Réinitialisation dans 18 jours."
              icon={<Zap size={18} />}
              action={<StatusPill tone="warning">85 / 100</StatusPill>}
            />
            <div className="p-5">
              <div className="flex items-end justify-between">
                <div className="font-headline-lg text-3xl font-bold text-on-surface">
                  85<span className="text-base text-on-surface-variant">/100</span>
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant">15 consommés</span>
              </div>
              <div className="mt-2">
                <Bar value={85} className="bg-gradient-to-r from-[#E9C400] to-[#FFD700]" />
              </div>

              <ul className="mt-5 space-y-3">
                {quotaUsage.map((q) => (
                  <li key={q.label}>
                    <div className="flex items-center justify-between font-body-sm text-[12px]">
                      <span className="text-on-surface-variant">{q.label}</span>
                      <span className="font-semibold text-on-surface">{q.used} crédits</span>
                    </div>
                    <div className="mt-1.5">
                      <Bar value={(q.used / q.total) * 100} />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-3 sm:flex-row sm:items-center">
                <div>
                  <div className="font-label-sm text-[11px] font-semibold text-on-surface">
                    Recharge automatique
                  </div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant">
                    Activée sous 10 crédits • Pack +100 crédits à 29 €
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFD700] px-3 py-2 font-label-sm text-[11px] font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
                >
                  <Zap size={13} />
                  Recharger des crédits
                </button>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Historique des factures"
              description="Téléchargez vos justificatifs au format PDF."
              icon={<Receipt size={18} />}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
                    <th className="px-5 py-2.5 font-semibold">Date</th>
                    <th className="px-5 py-2.5 font-semibold">Référence</th>
                    <th className="hidden px-5 py-2.5 font-semibold md:table-cell">Désignation</th>
                    <th className="px-5 py-2.5 font-semibold">Montant</th>
                    <th className="px-5 py-2.5 font-semibold">Statut</th>
                    <th className="px-5 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {invoices.map((inv) => (
                    <tr key={inv.reference} className="font-body-sm text-[12px]">
                      <td className="whitespace-nowrap px-5 py-3 text-on-surface-variant">{inv.date}</td>
                      <td className="whitespace-nowrap px-5 py-3 font-code text-[10px] text-on-surface">
                        {inv.reference}
                      </td>
                      <td className="hidden px-5 py-3 text-on-surface-variant md:table-cell">
                        {inv.designation}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-semibold text-on-surface">{inv.amount}</td>
                      <td className="px-5 py-3">
                        <StatusPill tone="success">{inv.status}</StatusPill>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          aria-label="Télécharger la facture"
                          className="rounded-lg border border-outline-variant/30 p-1.5 text-on-surface-variant transition-colors hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer"
                        >
                          <Download size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 border-t border-outline-variant/20 px-5 py-3 font-body-sm text-[11px] text-on-surface-variant">
              <ShieldCheck size={13} className="text-emerald-400" />
              Paiements sécurisés et facturation gérés par Stripe.
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Moyen de paiement" icon={<CreditCard size={18} />} />
            <div className="p-5">
              <div className="rounded-xl border border-outline-variant/25 bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                    Visa
                  </span>
                  <BadgeCheck size={16} className="text-[#FFD700]" />
                </div>
                <p className="mt-6 font-code text-[15px] tracking-widest text-on-surface">
                  •••• •••• •••• 4242
                </p>
                <div className="mt-2 flex items-center justify-between font-body-sm text-[10px] text-on-surface-variant">
                  <span>ALEXANDRE DUPONT</span>
                  <span>08/28</span>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
              >
                Mettre à jour la carte
              </button>
            </div>
          </Panel>

          <Panel className="border-[#FFD700]/25">
            <div className="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/15 text-[#FFD700]">
                <Building2 size={18} />
              </span>
              <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">Netero Enterprise</h3>
              <p className="mt-1 font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
                Pour les équipes : SSO/SAML, isolation réseau, SLA 99,99% et facturation centralisée.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-2 font-label-sm text-[12px] font-semibold text-[#FFD700] transition-colors hover:bg-[#FFD700]/15 cursor-pointer"
              >
                Contacter les ventes
                <ArrowRight size={14} />
              </Link>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Support & garanties" icon={<Sparkles size={18} />} />
            <ul className="space-y-2.5 p-5">
              {[
                "SLA de réponse < 4 h",
                "Accès au Discord VIP",
                "Audit de sécurité inclus",
                "Facturation Stripe conforme",
              ].map((g) => (
                <li key={g} className="flex items-start gap-2 font-body-sm text-[12px] text-on-surface-variant">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                  {g}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
