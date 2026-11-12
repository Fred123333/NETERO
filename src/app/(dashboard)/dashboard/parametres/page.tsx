import Link from "next/link";
import type { Metadata } from "next";
import {
  Bell,
  CheckCircle2,
  Crown,
  Globe,
  KeyRound,
  Laptop,
  LogOut,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { PageHeader, Panel, PanelHeader, StatusPill } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Paramètres du compte — NETERO",
};

const tabs = [
  { label: "Profil général", active: true },
  { label: "Sécurité & Clés", active: false },
  { label: "Affichage & Thème", active: false },
  { label: "Notifications", active: false },
];

const notifications = [
  { label: "Fin de génération IA", description: "Recevoir un email dès qu'un build est terminé.", enabled: true },
  { label: "Nouveaux boilerplates", description: "Alertes lors de la publication de templates.", enabled: true },
  { label: "Mises à jour de sécurité", description: "Patchs critiques et avis de vulnérabilité.", enabled: true },
  { label: "Rapport hebdomadaire", description: "Résumé d'activité du workspace chaque lundi.", enabled: false },
];

const sessions = [
  { device: "MacBook Pro — Chrome", location: "Paris, FR", current: true, icon: Laptop },
  { device: "iPhone 15 — Safari", location: "Paris, FR", current: false, icon: Smartphone },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        enabled ? "justify-end bg-[#FFD700]" : "justify-start bg-surface-container-highest"
      }`}
    >
      <span className={`h-4 w-4 rounded-full ${enabled ? "bg-[#171717]" : "bg-on-surface-variant"}`} />
    </span>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
  readOnly = false,
}: {
  label: string;
  defaultValue: string;
  type?: string;
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
        readOnly={readOnly}
        className={`w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:border-[#FFD700]/50 focus:outline-none ${
          readOnly ? "cursor-default opacity-70" : ""
        }`}
      />
    </label>
  );
}

export default function ParametresPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Netero Cloud / Organisation Alpha / Paramètres"
        title="Paramètres du compte"
        description="Gérez votre profil, vos identifiants de sécurité, vos préférences d'affichage et vos notifications."
        actions={
          <>
            <StatusPill tone="success">
              <Crown size={11} />
              Pro All-Access
            </StatusPill>
            <Link
              href="/dashboard/compte"
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <User size={16} />
              Modifier mon compte
            </Link>
          </>
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
              title="Informations personnelles"
              description="Ces informations apparaissent sur votre profil public et vos factures."
              icon={<User size={18} />}
            />
            <div className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD700]/15 font-headline-lg text-xl font-bold text-[#FFD700]">
                  AD
                </span>
                <div>
                  <button
                    type="button"
                    className="rounded-lg border border-outline-variant/40 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                  >
                    Changer l&apos;avatar
                  </button>
                  <p className="mt-1 font-body-sm text-[10px] text-on-surface-variant">
                    JPG, PNG ou WebP — 2 Mo maximum.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nom complet" defaultValue="Alexandre Dupont" />
                <Field label="Adresse email" defaultValue="alexandre@netero.dev" type="email" />
                <Field label="Rôle" defaultValue="Fondateur & Lead Developer" />
                <Field label="GitHub" defaultValue="@alexandre-dupont" />
                <Field label="Organisation" defaultValue="Alpha" readOnly />
                <Field label="Identifiant CLI" defaultValue="usr_alpha_8f2c91bd" readOnly />
              </div>

              <div className="mt-4 flex justify-end">
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
              title="Sécurité & authentification"
              description="Renforcez la protection de votre compte."
              icon={<ShieldCheck size={18} />}
              action={<StatusPill tone="success">2FA activée</StatusPill>}
            />
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Mot de passe actuel" defaultValue="••••••••••••" type="password" />
                <Field label="Nouveau mot de passe" defaultValue="" type="password" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-3">
                <div>
                  <div className="font-label-sm text-[11px] font-semibold text-on-surface">
                    Authentification à deux facteurs
                  </div>
                  <div className="font-body-sm text-[10px] text-on-surface-variant">
                    Application d&apos;authentification (TOTP) — configurée.
                  </div>
                </div>
                <StatusPill tone="success">Active</StatusPill>
              </div>

              <div>
                <p className="mb-2 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Sessions actives
                </p>
                <div className="divide-y divide-outline-variant/15 rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
                  {sessions.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.device} className="flex items-center justify-between gap-3 px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Icon size={15} className="text-[#FFD700]" />
                          <div>
                            <div className="font-body-sm text-[12px] text-on-surface">{s.device}</div>
                            <div className="font-body-sm text-[10px] text-on-surface-variant">
                              {s.location}
                            </div>
                          </div>
                        </div>
                        {s.current ? (
                          <StatusPill tone="success">Cet appareil</StatusPill>
                        ) : (
                          <button
                            type="button"
                            className="font-label-sm text-[11px] font-semibold text-red-400 hover:underline cursor-pointer"
                          >
                            Révoquer
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Préférences d'affichage & thème"
              description="Personnalisez l'apparence de votre workspace."
              icon={<Palette size={18} />}
            />
            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
              <div className="rounded-xl border border-[#FFD700]/40 bg-[#FFD700]/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFD700]/15 text-[#FFD700]">
                    <Palette size={16} />
                  </span>
                  <CheckCircle2 size={16} className="text-[#FFD700]" />
                </div>
                <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">Mode sombre</h3>
                <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
                  Palette Monolithe Gold — recommandé.
                </p>
                <StatusPill tone="success" className="mt-3">Actif</StatusPill>
              </div>
              <div className="cursor-pointer rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container-high">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                    <Palette size={16} />
                  </span>
                </div>
                <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">Mode clair</h3>
                <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
                  Contraste élevé, idéal en plein jour.
                </p>
                <StatusPill tone="neutral" className="mt-3">Disponible</StatusPill>
              </div>

              <div className="sm:col-span-2">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 font-body-sm text-[12px] text-on-surface-variant">
                      <Globe size={14} className="text-[#FFD700]" />
                      Langue de l&apos;interface
                    </span>
                    <span className="font-code text-[11px] text-on-surface">Français (FR)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 font-body-sm text-[12px] text-on-surface-variant">
                      <Terminal size={14} className="text-[#FFD700]" />
                      Densité d&apos;affichage
                    </span>
                    <span className="font-code text-[11px] text-on-surface">Confort</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Notifications"
              description="Choisissez les alertes que vous souhaitez recevoir."
              icon={<Bell size={18} />}
            />
            <div className="divide-y divide-outline-variant/15">
              {notifications.map((n) => (
                <div key={n.label} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div>
                    <div className="font-label-sm text-[12px] font-semibold text-on-surface">{n.label}</div>
                    <div className="font-body-sm text-[10px] text-on-surface-variant">{n.description}</div>
                  </div>
                  <Toggle enabled={n.enabled} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Clés API & environnement CLI"
              description="Utilisez ces identifiants pour automatiser vos déploiements."
              icon={<KeyRound size={18} />}
            />
            <div className="space-y-3 p-5">
              <div>
                <p className="mb-1.5 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Clé de production
                </p>
                <CopyButton
                  text="netero_prod_live_sk_8f2c91bd4a77ae102f6c3d9b"
                  label="Clé API de production :"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-body-sm text-[11px] text-on-surface-variant">
                  <Terminal size={13} className="text-[#FFD700]" />
                  CLI v2.4.1 — connectée
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-outline-variant/40 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  Générer une nouvelle clé
                </button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel className="border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/10 to-surface-container p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/15 text-[#FFD700]">
              <Crown size={18} />
            </span>
            <h3 className="mt-3 font-label-md text-[13px] font-bold text-on-surface">Plan Pro All-Access</h3>
            <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
              Licence active • 85/100 crédits • Support prioritaire.
            </p>
            <Link
              href="/dashboard/abonnement"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-3 py-2 font-label-sm text-[12px] font-semibold text-[#FFD700] transition-colors hover:bg-[#FFD700]/15 cursor-pointer"
            >
              Gérer l&apos;abonnement
            </Link>
          </Panel>

          <Panel>
            <PanelHeader title="Sessions & accès" icon={<ShieldCheck size={18} />} />
            <div className="space-y-2 p-5">
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Rôle</span>
                <span className="font-semibold text-on-surface">Propriétaire</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Organisation</span>
                <span className="font-semibold text-on-surface">Alpha</span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-[12px]">
                <span className="text-on-surface-variant">Membre depuis</span>
                <span className="font-semibold text-on-surface">Oct. 2024</span>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Déconnexion" icon={<LogOut size={18} />} />
            <div className="p-5">
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Fermer la session sur cet appareil.
              </p>
              <Link
                href="/"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
              >
                <LogOut size={14} />
                Se déconnecter
              </Link>
            </div>
          </Panel>

          <Panel className="border-red-500/25 bg-red-500/5">
            <div className="flex items-center gap-2 px-5 pt-4">
              <Trash2 size={16} className="text-red-400" />
              <h3 className="font-label-md text-[13px] font-bold text-on-surface">Supprimer le compte</h3>
            </div>
            <div className="p-5 pt-2">
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Action irréversible. Toutes vos données et projets seront effacés définitivement.
              </p>
              <Link
                href="/dashboard/compte#donnees"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 font-label-sm text-[11px] font-semibold text-red-400 transition-colors hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={13} />
                Supprimer mon compte
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
