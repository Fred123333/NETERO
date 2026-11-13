"use client";

import { useState } from "react";
import {
  Copy,
  Globe2,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Save,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";
import {
  AdminBadge,
  AdminButton,
  AdminInput,
  AdminPageHeader,
  AdminPanel,
  AdminPanelHeader,
  AdminSelect,
  AdminTabs,
  FieldLabel,
} from "@/components/admin/ui";

type TabId = "general" | "securite" | "alertes" | "api";

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.05] py-3 last:border-0">
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-on-surface">{label}</p>
        <p className="mt-0.5 text-[10px] text-on-surface-variant">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-white/15"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export function AdminSettingsScreen() {
  const [tab, setTab] = useState<TabId>("general");
  const [platformName, setPlatformName] = useState("NETERO Infrastructure OS");
  const [supportEmail, setSupportEmail] = useState("support@netero.dev");
  const [platformUrl, setPlatformUrl] = useState("https://app.netero.dev");
  const [timezone, setTimezone] = useState("Europe/Paris (CET)");
  const [maintenance, setMaintenance] = useState(false);
  const [require2fa, setRequire2fa] = useState(true);
  const [ssoEnforced, setSsoEnforced] = useState(false);
  const [ipAllowlist, setIpAllowlist] = useState("194.254.12.0/24, 82.64.0.0/16");
  const [sessionTimeout, setSessionTimeout] = useState("8 heures");
  const [alerts, setAlerts] = useState({ security: true, payments: true, ai: true, weekly: true, marketing: false });
  const [apiKey, setApiKey] = useState("netero_live_sk_7f3a92c1e84b4f2a");
  const [rotating, setRotating] = useState(false);

  function save() {
    toast.success("Paramètres enregistrés", {
      description: "Configuration appliquée aux nœuds admin et journalisée.",
    });
  }

  function rotateKey() {
    setRotating(true);
    window.setTimeout(() => {
      const random = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setApiKey(`netero_live_sk_${random}`);
      setRotating(false);
      toast.success("Clé API régénérée", { description: "L'ancienne clé est révoquée sous 60 secondes." });
    }, 900);
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-4">
      <AdminPageHeader
        eyebrow="Console système › Configuration globale"
        title="Paramètres"
        description="Identité de la plateforme, politiques de sécurité, préférences d'alertes et accès programmatiques."
        actions={
          <>
            <AdminButton onClick={() => toast.message("Modifications ignorées")}>Annuler</AdminButton>
            <AdminButton variant="primary" onClick={save}><Save size={13} /> Enregistrer</AdminButton>
          </>
        }
      />

      <AdminTabs
        tabs={[
          { value: "general" as TabId, label: "Général" },
          { value: "securite" as TabId, label: "Sécurité" },
          { value: "alertes" as TabId, label: "Alertes" },
          { value: "api" as TabId, label: "API & intégrations" },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === "general" && (
        <div className="grid gap-3">
          <AdminPanel>
            <AdminPanelHeader title="Profil administrateur" description="Compte SUPERADMIN principal" icon={<UserCog size={15} />} action={<AdminBadge tone="success">Superadmin</AdminBadge>} />
            <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-[17px] font-bold text-emerald-300">AP</span>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <label className="space-y-1">
                  <FieldLabel>Nom affiché</FieldLabel>
                  <AdminInput defaultValue="Admin Principal" />
                </label>
                <label className="space-y-1">
                  <FieldLabel>Email</FieldLabel>
                  <AdminInput defaultValue="admin@netero.dev" type="email" />
                </label>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel>
            <AdminPanelHeader title="Identité de la plateforme" description="Informations utilisées dans les emails et documents générés" icon={<Globe2 size={15} />} />
            <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
              <label className="space-y-1">
                <FieldLabel>Nom de la plateforme</FieldLabel>
                <AdminInput value={platformName} onChange={(event) => setPlatformName(event.target.value)} />
              </label>
              <label className="space-y-1">
                <FieldLabel>URL publique</FieldLabel>
                <AdminInput value={platformUrl} onChange={(event) => setPlatformUrl(event.target.value)} />
              </label>
              <label className="space-y-1">
                <FieldLabel>Email de support</FieldLabel>
                <AdminInput value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} type="email" />
              </label>
              <label className="space-y-1">
                <FieldLabel>Fuseau horaire par défaut</FieldLabel>
                <AdminSelect className="h-9 w-full" value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                  {["Europe/Paris (CET)", "Europe/London (GMT)", "America/New_York (EST)", "UTC"].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AdminSelect>
              </label>
            </div>
            <div className="px-4 pb-4">
              <Toggle
                label="Mode maintenance"
                hint="Bloque les nouvelles générations et affiche une page d'information aux clients."
                checked={maintenance}
                onChange={() => {
                  setMaintenance((value) => !value);
                  toast.message(maintenance ? "Mode maintenance désactivé" : "Mode maintenance activé", {
                    description: maintenance
                      ? "Les générations sont de nouveau acceptées."
                      : "Les nouvelles générations sont temporairement bloquées.",
                  });
                }}
              />
            </div>
          </AdminPanel>
        </div>
      )}

      {tab === "securite" && (
        <div className="grid gap-3">
          <AdminPanel>
            <AdminPanelHeader title="Politiques d'accès" description="Contrôles appliqués à l'ensemble des comptes" icon={<ShieldCheck size={15} />} />
            <div className="px-4 pb-4">
              <Toggle label="Exiger la 2FA pour tous les comptes" hint="Les utilisateurs sans TOTP seront bloqués à la prochaine connexion." checked={require2fa} onChange={() => setRequire2fa((value) => !value)} />
              <Toggle label="Forcer le SSO entreprise" hint="Délègue l'authentification au fournisseur SAML des organisations." checked={ssoEnforced} onChange={() => setSsoEnforced((value) => !value)} />
              <Toggle label="Journaliser les impersonations" hint="Chaque session admin est tracée avec IP, durée et actions." checked onChange={() => toast.message("Option verrouillée", { description: "Obligatoire pour la conformité SOC2." })} />
            </div>
          </AdminPanel>

          <AdminPanel>
            <AdminPanelHeader title="Sessions & réseau" description="Durcissement de la passerelle d'administration" icon={<Lock size={15} />} />
            <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
              <label className="space-y-1">
                <FieldLabel>Expiration de session</FieldLabel>
                <AdminSelect className="h-9 w-full" value={sessionTimeout} onChange={(event) => setSessionTimeout(event.target.value)}>
                  {["1 heure", "4 heures", "8 heures", "24 heures"].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AdminSelect>
              </label>
              <label className="space-y-1">
                <FieldLabel>Liste d’IP autorisées (CIDR)</FieldLabel>
                <AdminInput value={ipAllowlist} onChange={(event) => setIpAllowlist(event.target.value)} />
              </label>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-2.5 text-[10px] text-emerald-200">
                <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                Dernier audit RBAC : aujourd’hui 06:00 • 0 anomalie détectée • TLS 1.3 strict actif.
              </div>
            </div>
          </AdminPanel>
        </div>
      )}

      {tab === "alertes" && (
        <AdminPanel>
          <AdminPanelHeader title="Préférences de notification" description="Canaux et catégories poussés vers admin@netero.dev" icon={<Mail size={15} />} />
          <div className="px-4 pb-4">
            <Toggle label="Alertes de sécurité critiques" hint="Connexions suspectes, échecs 2FA, changements de rôle." checked={alerts.security} onChange={() => setAlerts((current) => ({ ...current, security: !current.security }))} />
            <Toggle label="Paiements & litiges" hint="Nouveaux paiements, échecs Stripe, contestations de carte." checked={alerts.payments} onChange={() => setAlerts((current) => ({ ...current, payments: !current.payments }))} />
            <Toggle label="Anomalies du moteur IA" hint="Dépassements de latence, erreurs de pipeline, bascules de fallback." checked={alerts.ai} onChange={() => setAlerts((current) => ({ ...current, ai: !current.ai }))} />
            <Toggle label="Rapport hebdomadaire" hint="Synthèse des KPI et de la performance infrastructure chaque lundi." checked={alerts.weekly} onChange={() => setAlerts((current) => ({ ...current, weekly: !current.weekly }))} />
            <Toggle label="Communications produit" hint="Annonces de nouveaux boilerplates et versions du moteur." checked={alerts.marketing} onChange={() => setAlerts((current) => ({ ...current, marketing: !current.marketing }))} />
          </div>
        </AdminPanel>
      )}

      {tab === "api" && (
        <div className="grid gap-3">
          <AdminPanel>
            <AdminPanelHeader title="Clé API secrète" description="Utilisée par la CLI et les intégrations server-to-server" icon={<KeyRound size={15} />} action={<AdminBadge tone="success">Active</AdminBadge>} />
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141414] px-3 py-2">
                <code className="flex-1 truncate font-mono text-[11px] text-emerald-300">{apiKey}</code>
                <button type="button" onClick={() => { navigator.clipboard?.writeText(apiKey); toast.success("Clé copiée"); }} aria-label="Copier la clé" className="text-on-surface-variant hover:text-on-surface"><Copy size={13} /></button>
                <button type="button" onClick={rotateKey} disabled={rotating} aria-label="Régénérer la clé" className="text-on-surface-variant hover:text-on-surface disabled:opacity-50">
                  <RefreshCw size={13} className={rotating ? "animate-spin" : undefined} />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-on-surface-variant">Créée le 12 janvier 2024 • dernière utilisation il y a 6 minutes • scope : admin complet.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <AdminButton size="sm" onClick={() => toast.success("Webhook de test envoyé", { description: "200 OK • signature HMAC valide." })}>Tester le webhook</AdminButton>
                <AdminButton size="sm" variant="danger" onClick={() => toast.success("Clé révoquée", { description: "Les intégrations devront être reconnectées." })}>Révoquer la clé</AdminButton>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel>
            <AdminPanelHeader title="Intégrations" description="Services connectés à la console" />
            <div className="space-y-2 px-4 pb-4">
              {[
                { name: "Stripe", detail: "Billing, abonnements & litiges", status: "Connecté" },
                { name: "GitHub", detail: "Synchronisation des boilerplates", status: "Connecté" },
                { name: "Anthropic", detail: "Moteur Claude 3.5 Sonnet", status: "Connecté" },
                { name: "Slack", detail: "Alertes critiques vers #netero-ops", status: "À connecter" },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] px-3 py-2.5">
                  <div>
                    <p className="text-[11px] font-medium text-on-surface">{integration.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{integration.detail}</p>
                  </div>
                  {integration.status === "Connecté" ? (
                    <AdminBadge tone="success" dot>Connecté</AdminBadge>
                  ) : (
                    <AdminButton size="sm" onClick={() => toast.success("Slack connecté", { description: "Canal #netero-ops vérifié." })}>Connecter</AdminButton>
                  )}
                </div>
              ))}
            </div>
          </AdminPanel>
        </div>
      )}
    </div>
  );
}
