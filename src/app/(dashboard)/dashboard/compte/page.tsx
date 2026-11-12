import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  Download,
  Globe,
  KeyRound,
  Link2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  User,
  UserX,
} from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatusPill } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Mon compte — NETERO",
};

const tabs = [
  { label: "Profil", active: true },
  { label: "Identifiants & sécurité", active: false },
  { label: "Données & suppression", active: false },
];

const linkedAccounts = [
  {
    name: "GitHub",
    identifier: "@alexandre-dupont",
    icon: Code2,
    connected: true,
  },
  {
    name: "Google",
    identifier: "alexandre@netero.dev",
    icon: Globe,
    connected: true,
  },
  {
    name: "Slack",
    identifier: "Notifications du workspace",
    icon: Link2,
    connected: false,
  },
];

function Field({
  label,
  defaultValue,
  type = "text",
  placeholder,
  readOnly = false,
}: {
  label: string;
  defaultValue: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-[#FFD700]/50 focus:outline-none ${
          readOnly ? "cursor-default opacity-70" : ""
        }`}
      />
    </label>
  );
}

export default function ComptePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Netero Cloud / Organisation Alpha / Compte"
        title="Modifier mon compte"
        description="Mettez à jour vos informations personnelles, vos identifiants de connexion et gérez la conservation ou la suppression de votre compte."
        actions={
          <StatusPill tone="success">
            <Crown size={11} />
            Pro All-Access
          </StatusPill>
        }
      />

      <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
        {tabs.map((t) => (
          <span
            key={t.label}
            className={
              t.active
                ? "rounded-lg bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[12px] font-semibold text-[#FFD700]"
                : "cursor-pointer rounded-lg px-3 py-1.5 font-label-sm text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            }
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Profil public"
              description="Ces informations apparaissent sur votre profil et vos factures."
              icon={<User size={18} />}
            />
            <div className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFD700]/15 font-headline-lg text-2xl font-bold text-[#FFD700]">
                  AD
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container text-on-surface-variant">
                    <Camera size={13} />
                  </span>
                </span>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-outline-variant/40 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                    >
                      Changer la photo
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-outline-variant/30 px-3 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:border-red-500/30 hover:text-red-400 cursor-pointer"
                    >
                      Retirer
                    </button>
                  </div>
                  <p className="mt-1.5 font-body-sm text-[10px] text-on-surface-variant">
                    JPG, PNG ou WebP — 2 Mo maximum.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Prénom" defaultValue="Alexandre" />
                <Field label="Nom" defaultValue="Dupont" />
                <Field label="Nom d'utilisateur" defaultValue="alexandre-dupont" />
                <Field label="Adresse email" defaultValue="alexandre@netero.dev" type="email" />
                <Field label="Téléphone" defaultValue="+33 6 12 34 56 78" type="tel" />
                <Field label="Localisation" defaultValue="Paris, France" />
                <Field label="Site web" defaultValue="https://alexandre-dupont.dev" type="url" />
                <Field label="Organisation" defaultValue="Alpha" readOnly />
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                  Bio
                </span>
                <textarea
                  rows={3}
                  defaultValue="Fondateur & Lead Developer. Je construis des produits Next.js rapides et des agents IA utiles."
                  className="w-full resize-none rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:border-[#FFD700]/50 focus:outline-none"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-body-sm text-[11px] text-on-surface-variant">
                  <Clock size={12} />
                  Dernière mise à jour il y a 12 jours
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
                >
                  <Save size={15} />
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Identifiants de connexion"
              description="Modifiez votre email de connexion ou votre mot de passe."
              icon={<KeyRound size={18} />}
              action={<StatusPill tone="success">2FA activée</StatusPill>}
            />
            <div className="space-y-5 p-5">
              <div>
                <p className="mb-2 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Changer d&apos;adresse email
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nouvel email" defaultValue="" type="email" placeholder="nouveau@email.com" />
                  <Field label="Confirmer l'email" defaultValue="" type="email" placeholder="nouveau@email.com" />
                </div>
              </div>

              <div className="border-t border-outline-variant/15 pt-4">
                <p className="mb-2 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Changer de mot de passe
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Mot de passe actuel" defaultValue="••••••••••••" type="password" />
                  <Field label="Nouveau mot de passe" defaultValue="" type="password" />
                  <Field label="Confirmer" defaultValue="" type="password" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-body-sm text-[11px] text-on-surface-variant">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  Dernière modification il y a 43 jours
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 px-4 py-2.5 font-label-md text-label-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  Mettre à jour les identifiants
                </button>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Comptes liés"
              description="Connectez des services tiers pour accélérer la connexion."
              icon={<Link2 size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {linkedAccounts.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.name} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-on-surface">
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <div className="font-label-sm text-[12px] font-semibold text-on-surface">{a.name}</div>
                        <div className="truncate font-body-sm text-[10px] text-on-surface-variant">
                          {a.identifier}
                        </div>
                      </div>
                    </div>
                    {a.connected ? (
                      <div className="flex items-center gap-2">
                        <StatusPill tone="success">Connecté</StatusPill>
                        <button
                          type="button"
                          className="font-label-sm text-[11px] font-semibold text-red-400 hover:underline cursor-pointer"
                        >
                          Déconnecter
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="rounded-lg border border-outline-variant/40 px-2.5 py-1.5 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                      >
                        Connecter
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel id="donnees" className="scroll-mt-24">
            <PanelHeader
              title="Données & suppression du compte"
              description="Exportez vos données ou fermez définitivement votre compte."
              icon={<Download size={18} />}
            />
            <div className="space-y-3 p-5">
              <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-4 py-3 sm:flex-row sm:items-center">
                <div>
                  <div className="font-label-sm text-[12px] font-semibold text-on-surface">
                    Exporter mes données
                  </div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant">
                    Archive ZIP : projets, historiques, factures et paramètres.
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  <Download size={13} />
                  Demander l&apos;export
                </button>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-4 py-3 sm:flex-row sm:items-center">
                <div>
                  <div className="font-label-sm text-[12px] font-semibold text-on-surface">
                    Désactiver temporairement
                  </div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant">
                    Suspend l&apos;accès sans supprimer vos projets. Réactivable à tout moment.
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  <UserX size={13} />
                  Désactiver
                </button>
              </div>
            </div>

            <div className="mx-5 mb-5 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-400" />
                <div>
                  <h3 className="font-label-md text-[13px] font-bold text-on-surface">
                    Supprimer définitivement mon compte
                  </h3>
                  <p className="mt-1 font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
                    Cette action est irréversible. Tous vos projets, boilerplates, historiques de
                    génération et factures seront définitivement effacés après 30 jours. Votre licence
                    Pro sera perdue.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                    Raison de la suppression
                  </span>
                  <select
                    defaultValue=""
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:border-red-500/50 focus:outline-none"
                  >
                    <option value="" disabled>
                      Sélectionnez une raison…
                    </option>
                    <option>Trop cher</option>
                    <option>Fonctionnalités manquantes</option>
                    <option>Je n&apos;en ai plus besoin</option>
                    <option>Je migre vers un autre outil</option>
                    <option>Autre</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-label-sm text-[11px] font-semibold text-on-surface-variant">
                    Tapez <span className="font-code text-red-400">SUPPRIMER</span> pour confirmer
                  </span>
                  <input
                    type="text"
                    placeholder="SUPPRIMER"
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-code text-[12px] text-on-surface placeholder:text-on-surface-variant/40 focus:border-red-500/50 focus:outline-none"
                  />
                </label>

                <label className="flex items-start gap-2 font-body-sm text-[11px] text-on-surface-variant">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#FFD700]"
                  />
                  Je comprends que la suppression est définitive et que mes données ne pourront pas
                  être récupérées après 30 jours.
                </label>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-500/90 px-4 py-2.5 font-label-md text-label-md font-semibold text-white transition-colors hover:bg-red-500 cursor-pointer"
                >
                  <Trash2 size={15} />
                  Supprimer définitivement mon compte
                </button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel className="border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/10 to-surface-container p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700]/15 font-headline-lg text-lg font-bold text-[#FFD700]">
              AD
            </span>
            <h3 className="mt-3 font-label-md text-[14px] font-bold text-on-surface">Alexandre Dupont</h3>
            <p className="font-body-sm text-[11px] text-on-surface-variant">alexandre@netero.dev</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <StatusPill tone="warning">
                <Crown size={10} />
                Pro All-Access
              </StatusPill>
              <StatusPill tone="success">Vérifié</StatusPill>
            </div>
            <div className="mt-4 space-y-2 border-t border-outline-variant/20 pt-3 font-body-sm text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">ID compte</span>
                <span className="font-code text-[10px] text-on-surface">usr_alpha_8f2c91bd</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Membre depuis</span>
                <span className="text-on-surface">Oct. 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Organisation</span>
                <span className="text-on-surface">Alpha</span>
              </div>
            </div>
            <Link
              href="/dashboard/abonnement"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-2 font-label-sm text-[12px] font-semibold text-[#FFD700] transition-colors hover:bg-[#FFD700]/15 cursor-pointer"
            >
              Gérer l&apos;abonnement
              <ArrowRight size={14} />
            </Link>
          </Panel>

          <Panel>
            <PanelHeader title="Sécurité" icon={<ShieldCheck size={18} />} />
            <div className="space-y-2.5 p-5">
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">2FA</span>
                <StatusPill tone="success">Active</StatusPill>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Sessions actives</span>
                <span className="font-semibold text-on-surface">2 appareils</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Dernière connexion</span>
                <span className="font-semibold text-on-surface">Aujourd&apos;hui</span>
              </div>
              <Link
                href="/dashboard/parametres"
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
              >
                <KeyRound size={13} />
                Gérer la sécurité
              </Link>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Coordonnées" icon={<Mail size={18} />} />
            <div className="space-y-2.5 p-5 font-body-sm text-[12px] text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#FFD700]" />
                alexandre@netero.dev
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#FFD700]" />
                +33 6 12 34 56 78
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#FFD700]" />
                Paris, France
              </div>
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-[#FFD700]" />
                alexandre-dupont.dev
              </div>
            </div>
          </Panel>

          <Panel>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <h3 className="font-label-md text-[12px] font-bold text-on-surface">
                  Compte en règle
                </h3>
              </div>
              <p className="mt-1.5 font-body-sm text-[11px] text-on-surface-variant">
                Profil vérifié, 2FA active, email confirmé. Aucune action requise.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
