"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  Building2,
  ChevronRight,
  Copy,
  CreditCard,
  Cpu,
  ExternalLink,
  Fingerprint,
  KeyRound,
  Laptop,
  Lock,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminBoilerplates,
  adminProjects,
  adminUsers,
  payments,
  userDetail,
} from "@/lib/data/admin";
import {
  AdminBadge,
  AdminButton,
  AdminPanel,
  AdminPanelHeader,
  AdminProgress,
  AdminTableShell,
  AdminTd,
  AdminTh,
} from "@/components/admin/ui";

const tabs = [
  { id: "infos", label: "Informations & Sécurité" },
  { id: "formule", label: "Formule & Paiements" },
  { id: "projets", label: `Projets IA (${adminProjects.length})` },
  { id: "boilerplates", label: "Boilerplates & Clés CLI" },
  { id: "audit", label: "Journal d'audit" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const auditLog = [
  { action: "Connexion réussie via OAuth GitHub", ip: "194.254.12.89", time: "Aujourd'hui 16:42", tone: "success" as const },
  { action: "Clé API netero_live_…4f2a utilisée", ip: "194.254.12.89", time: "Aujourd'hui 15:18", tone: "info" as const },
  { action: "Génération Next.js SaaS déployée", ip: "Edge Paris DC4", time: "Aujourd'hui 14:32", tone: "success" as const },
  { action: "Tentative de connexion bloquée (2FA invalide)", ip: "45.132.88.10", time: "Hier 23:07", tone: "danger" as const },
  { action: "Renouvellement licence Lifetime confirmé", ip: "Stripe Checkout", time: "14 oct 2024", tone: "success" as const },
];

function InfoRow({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.05] py-2.5 last:border-0">
      <span className="text-[10px] font-medium uppercase tracking-wide text-on-surface-variant">{label}</span>
      <span className={`max-w-[60%] text-right text-[11px] text-on-surface ${mono ? "font-mono" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

function SecurityRow({
  icon,
  label,
  value,
  badge,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  badge?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 border-b border-white/[0.05] py-2.5 last:border-0">
      <span className="mt-0.5 text-on-surface-variant">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wide text-on-surface-variant">{label}</p>
        <p className={`mt-0.5 text-[11px] font-medium text-on-surface ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
      {badge}
    </div>
  );
}

function NetworkMap() {
  return (
    <div className="relative h-[210px] w-full overflow-hidden rounded-lg border border-white/[0.06] bg-[#171717]">
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 58% 45%, rgba(16,185,129,0.16), transparent 42%), radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.06), transparent 38%)",
        }}
      />
      <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M-20 200 C 140 160, 240 210, 380 150 S 620 90, 820 120" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        <path d="M-20 120 C 120 90, 260 140, 420 100 S 650 150, 820 80" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <path d="M180 260 C 240 180, 330 170, 420 120 S 520 60, 560 0" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="420" cy="120" r="34" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" />
        <circle cx="420" cy="120" r="56" fill="none" stroke="rgba(16,185,129,0.14)" />
        <circle cx="420" cy="120" r="5" fill="#10B981" />
        <circle cx="560" cy="52" r="3" fill="rgba(255,255,255,0.6)" />
        <circle cx="240" cy="196" r="3" fill="rgba(255,255,255,0.35)" />
        <circle cx="640" cy="170" r="3" fill="rgba(255,255,255,0.25)" />
      </svg>
      <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">
        Edge routing • live
      </div>
      <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/50 px-2.5 py-1.5 backdrop-blur">
        <p className="text-[10px] font-semibold text-on-surface">Paris (75008), France</p>
        <p className="text-[9px] text-on-surface-variant">194.254.12.89 • latence &lt; 4 ms</p>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1.5 text-right">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-300">Route</p>
        <p className="text-[10px] font-semibold text-on-surface">Iliad Entreprises</p>
        <p className="text-[9px] text-on-surface-variant">Paris DC4 • AS24E35</p>
      </div>
    </div>
  );
}

export function AdminUserDetailScreen({ userId }: { userId: string }) {
  const user = adminUsers.find((item) => item.id === userId) ?? adminUsers[0];
  const isPrimary = user.id === userDetail.user.id;
  const [tab, setTab] = useState<TabId>("infos");
  const [suspended, setSuspended] = useState(user.status === "Suspendu");
  const [impersonating, setImpersonating] = useState(false);

  const uid = isPrimary ? userDetail.uid : `USR-2024-${user.initials}-000${user.projects}`;
  const projectList = adminProjects.slice(0, Math.max(1, Math.min(adminProjects.length, user.projects)));
  const userPayments = payments.slice(0, 4);

  function copyUid() {
    navigator.clipboard?.writeText(uid);
    toast.success("UID copié", { description: uid });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 text-[11px]">
          <Link href="/admin/utilisateurs" className="text-on-surface-variant hover:text-on-surface">
            Utilisateurs
          </Link>
          <ChevronRight size={12} className="text-on-surface-variant/60" />
          <span className="font-medium text-on-surface">{user.name}</span>
        </nav>
        <div className="flex items-center gap-2">
          <AdminBadge tone="success" dot>Synchronisé en temps réel</AdminBadge>
          <AdminBadge tone={suspended ? "danger" : "success"}>
            {suspended ? "Fiche suspendue" : "Statut fiche : actif"}
          </AdminBadge>
        </div>
      </div>

      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 items-start gap-3.5">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${user.gradient} text-[18px] font-bold text-white`}>
              {user.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-bold leading-tight text-on-surface">{user.name}</h1>
                <AdminBadge tone="success">{user.plan}</AdminBadge>
                <AdminBadge tone={suspended ? "danger" : "success"} dot>
                  {suspended ? "Suspendu" : "Actif & vérifié"}
                </AdminBadge>
              </div>
              <p className="mt-1 text-[11px] text-on-surface-variant">{user.email} • {user.role}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-on-surface-variant">
                <span className="inline-flex items-center gap-1"><Activity size={11} className="text-emerald-400" /> Dernier ping : il y a 14 min</span>
                <span className="inline-flex items-center gap-1"><Fingerprint size={11} /> {uid}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={11} /> Paris, France</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminButton
              disabled={impersonating}
              onClick={() => {
                setImpersonating(true);
                window.setTimeout(() => {
                  setImpersonating(false);
                  toast.success("Session d'impersonation ouverte", { description: `Vous naviguez en tant que ${user.name}.` });
                }, 800);
              }}
            >
              <UserCog size={13} className={impersonating ? "animate-pulse" : undefined} />
              {impersonating ? "Connexion…" : "Impersonate"}
            </AdminButton>
            <AdminButton onClick={() => toast.success("Email de réinitialisation envoyé", { description: user.email })}>
              <RefreshCw size={13} /> Reset MDP
            </AdminButton>
            <AdminButton
              variant={suspended ? "primary" : "danger"}
              onClick={() => {
                setSuspended((value) => !value);
                toast.success(suspended ? "Compte réactivé" : "Compte suspendu", {
                  description: `${user.name} — ${suspended ? "accès rétabli." : "toutes les sessions ont été révoquées."}`,
                });
              }}
            >
              {suspended ? <BadgeCheck size={13} /> : <Lock size={13} />}
              {suspended ? "Réactiver" : "Suspendre"}
            </AdminButton>
          </div>
        </div>
      </AdminPanel>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <AdminPanel className="p-3.5">
          <div className="flex items-center gap-1.5 text-on-surface-variant"><Building2 size={12} /><span className="text-[9px] font-semibold uppercase tracking-wide">Organisation</span></div>
          <p className="mt-2 text-[13px] font-semibold text-on-surface">{isPrimary ? userDetail.organizationDetail : "Indie Craft"}</p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">{isPrimary ? "Tenant #8812" : "Tenant #4401"}</p>
        </AdminPanel>
        <AdminPanel className="p-3.5">
          <div className="flex items-center gap-1.5 text-on-surface-variant"><Sparkles size={12} /><span className="text-[9px] font-semibold uppercase tracking-wide">Crédits IA</span></div>
          <p className="mt-2 text-[13px] font-semibold text-on-surface">85 / 100</p>
          <div className="mt-1.5"><AdminProgress value={85} /></div>
        </AdminPanel>
        <AdminPanel className="p-3.5">
          <div className="flex items-center gap-1.5 text-on-surface-variant"><Cpu size={12} /><span className="text-[9px] font-semibold uppercase tracking-wide">Boilerplates clés</span></div>
          <p className="mt-2 text-[13px] font-semibold text-on-surface">3 actifs</p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">Licence Lifetime valide</p>
        </AdminPanel>
        <AdminPanel className="p-3.5">
          <div className="flex items-center gap-1.5 text-on-surface-variant"><ShieldCheck size={12} /><span className="text-[9px] font-semibold uppercase tracking-wide">Sécurité profil</span></div>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-on-surface"><Lock size={12} className="text-emerald-400" /> 2FA active</p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">Vérification matérielle</p>
        </AdminPanel>
      </div>

      <AdminPanel>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-1">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                  tab === item.id
                    ? "bg-white/[0.08] text-on-surface"
                    : "text-on-surface-variant hover:bg-white/[0.04] hover:text-on-surface"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <AdminBadge tone="success" dot>2FA validé</AdminBadge>
        </div>

        {tab === "infos" && (
          <div className="grid gap-3 p-4 xl:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[12px] font-semibold text-on-surface">Paramètres du compte</h2>
                <button type="button" onClick={copyUid} className="inline-flex items-center gap-1 text-[10px] text-on-surface-variant hover:text-on-surface">
                  <Copy size={11} /> Copier UID
                </button>
              </div>
              <InfoRow label="Identifiant unique (UID)" value={uid} mono />
              <InfoRow label="Nom légal" value={user.name} />
              <InfoRow label="Organisation rattachée" value={isPrimary ? userDetail.organization : "Indie Craft SAS"} />
              <InfoRow label="GitHub connecté" value={isPrimary ? userDetail.github : user.handle} />
              <InfoRow label="Rôle système" value={isPrimary ? userDetail.systemRole : user.role.toUpperCase().replace(/\s+/g, "_")} mono />
              <InfoRow label="Création du compte" value={isPrimary ? userDetail.created : user.joined} />
              <InfoRow label="Workspace" value={isPrimary ? userDetail.workspace : "Workspace Standard"} />
            </div>

            <div className="rounded-lg border border-white/[0.06] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[12px] font-semibold text-on-surface">Sécurité & télémétrie d’accès</h2>
                <AdminBadge tone="success">TLS 1.3</AdminBadge>
              </div>
              <SecurityRow icon={<Lock size={13} />} label="Méthode 2FA" value={isPrimary ? userDetail.twoFA : "TOTP Authenticator (SHA256)"} badge={<AdminBadge tone="success">Activé</AdminBadge>} />
              <SecurityRow icon={<Activity size={13} />} label="Dernière connexion" value={isPrimary ? userDetail.lastLogin : "Il y a 3 heures"} />
              <SecurityRow icon={<Laptop size={13} />} label="Environnement / device" value={isPrimary ? userDetail.device : "Windows 11 / Edge 131"} />
              <SecurityRow icon={<MapPin size={13} />} label="Adresse IP" value={isPrimary ? userDetail.ip : "82.64.10.220"} mono />
              <SecurityRow icon={<ShieldCheck size={13} />} label="Certificat TLS / SSH" value={isPrimary ? userDetail.tls : "RSA-4096 VALID"} badge={<AdminBadge tone="success">Valide</AdminBadge>} />
              <SecurityRow icon={<KeyRound size={13} />} label="Dernier changement de mot de passe" value={isPrimary ? userDetail.passwordChanged : "02 nov 2024"} />
              <div className="mt-3 flex flex-wrap gap-2">
                <AdminButton
                  size="sm"
                  variant="danger"
                  onClick={() => toast.success("Sessions invalidées", { description: "Toutes les sessions actives ont été révoquées." })}
                >
                  Invalider toutes les sessions
                </AdminButton>
                <AdminButton
                  size="sm"
                  onClick={() => toast.success("Profil régénéré", { description: "Les jetons CLI et le cache de profil ont été renouvelés." })}
                >
                  <RefreshCw size={12} /> Régénérer le profil
                </AdminButton>
              </div>
            </div>

            <div className="xl:col-span-2">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[12px] font-semibold text-on-surface">Localisation & passerelle réseau</h2>
                <span className="text-[10px] text-on-surface-variant">IP 194.254.12.89 • routeur Anycast</span>
              </div>
              <NetworkMap />
            </div>
          </div>
        )}

        {tab === "formule" && (
          <div className="grid gap-3 p-4 xl:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-300">Formule active</p>
              <p className="mt-1.5 text-[16px] font-semibold text-on-surface">{user.plan}</p>
              <p className="mt-1 text-[11px] text-on-surface-variant">Facturation annuelle • renouvellement automatique</p>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex justify-between"><span className="text-on-surface-variant">Sièges</span><span className="text-on-surface">1 / 3</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Prochain prélèvement</span><span className="text-on-surface">14 oct 2026</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Montant</span><span className="text-on-surface">299,00 €</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Moyen de paiement</span><span className="text-on-surface">Visa •••• 4242</span></div>
              </div>
              <AdminButton variant="primary" className="mt-4 w-full" onClick={() => toast.success("Portail Stripe ouvert", { description: "Gestion de la formule et des factures." })}>
                <CreditCard size={13} /> Gérer la formule
              </AdminButton>
            </div>
            <div>
              <h2 className="mb-2 text-[12px] font-semibold text-on-surface">Historique des paiements</h2>
              <AdminTableShell>
                <table className="w-full min-w-[480px] border-collapse">
                  <thead><tr><AdminTh>Transaction</AdminTh><AdminTh>Produit</AdminTh><AdminTh>Montant</AdminTh><AdminTh>Date</AdminTh><AdminTh>Statut</AdminTh></tr></thead>
                  <tbody>
                    {userPayments.map((payment) => (
                      <tr key={payment.id} className="border-t border-white/[0.05]">
                        <AdminTd className="font-mono text-[10px] text-on-surface-variant">{payment.id}</AdminTd>
                        <AdminTd>{payment.product}</AdminTd>
                        <AdminTd className="font-semibold">{payment.amount}</AdminTd>
                        <AdminTd className="whitespace-nowrap text-on-surface-variant">{payment.date}</AdminTd>
                        <AdminTd><AdminBadge tone={payment.status === "Réussi" ? "success" : payment.status === "Litige" ? "warning" : "danger"} dot>{payment.status}</AdminBadge></AdminTd>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AdminTableShell>
            </div>
          </div>
        )}

        {tab === "projets" && (
          <div className="p-4">
            <div className="grid gap-2.5 md:grid-cols-2">
              {projectList.map((project) => (
                <div key={project.id} className="rounded-lg border border-white/[0.06] p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-on-surface">{project.name}</p>
                      <p className="mt-0.5 truncate text-[10px] text-on-surface-variant">{project.stack}</p>
                    </div>
                    <AdminBadge tone={project.status === "Déployé" ? "success" : project.status === "Build" ? "warning" : "danger"} dot>{project.status}</AdminBadge>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-on-surface-variant">
                    <span>{project.date}</span>
                    <span>{project.credits} crédits</span>
                  </div>
                  <AdminProgress value={project.status === "Déployé" ? 100 : project.status === "Build" ? 64 : 22} tone={project.status === "Échec" ? "red" : "emerald"} />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-on-surface-variant">{project.org}</span>
                    <button type="button" onClick={() => toast.message("Ouverture du projet", { description: project.name })} className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">
                      Inspecter <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "boilerplates" && (
          <div className="grid gap-3 p-4 xl:grid-cols-2">
            <div>
              <h2 className="mb-2 text-[12px] font-semibold text-on-surface">Boilerplates associés</h2>
              <div className="space-y-2">
                {adminBoilerplates.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] p-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] text-on-surface-variant"><Cpu size={14} /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium text-on-surface">{item.title}</p>
                      <p className="truncate text-[10px] text-on-surface-variant">{item.repo}</p>
                    </div>
                    <AdminBadge tone="neutral">{item.version}</AdminBadge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-[12px] font-semibold text-on-surface">Clés CLI récentes</h2>
              <div className="rounded-lg border border-white/[0.06] bg-[#141414] p-3 font-mono text-[10px]">
                <div className="mb-2 flex items-center gap-1.5 text-on-surface-variant"><Terminal size={12} /> netero-cli • session signée</div>
                {(isPrimary ? userDetail.recentCli : [
                  { command: "netero pull nextjs-saas", result: "200 OK" },
                  { command: "netero verify --jwt", result: "200 OK" },
                  { command: "netero deploy --edge", result: "200 OK" },
                ]).map((entry) => (
                  <div key={entry.command} className="flex items-center justify-between border-t border-white/[0.05] py-1.5">
                    <span className="text-on-surface"><span className="text-emerald-400">$</span> {entry.command}</span>
                    <span className="text-on-surface-variant">{entry.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "audit" && (
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[12px] font-semibold text-on-surface">Journal d’audit</h2>
              <AdminButton size="sm" onClick={() => toast.success("Journal exporté", { description: "audit-utilisateur.csv" })}>
                Exporter
              </AdminButton>
            </div>
            <ol className="space-y-2">
              {auditLog.map((entry) => (
                <li key={entry.action} className="flex flex-wrap items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${entry.tone === "success" ? "bg-emerald-400" : entry.tone === "danger" ? "bg-red-400" : "bg-sky-400"}`} />
                  <span className="flex-1 text-[11px] text-on-surface">{entry.action}</span>
                  <span className="text-[10px] text-on-surface-variant">{entry.ip}</span>
                  <span className="w-[130px] text-right text-[10px] text-on-surface-variant">{entry.time}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </AdminPanel>

      <AdminPanel>
        <AdminPanelHeader
          title="Projets IA récents"
          description="Dernières générations exécutées par le moteur pour ce compte"
          action={<AdminBadge tone="neutral">{projectList.length} projets</AdminBadge>}
        />
        <AdminTableShell>
          <table className="w-full min-w-[600px] border-collapse">
            <thead><tr><AdminTh>Projet</AdminTh><AdminTh>Pipeline</AdminTh><AdminTh>Statut</AdminTh><AdminTh>Crédits</AdminTh><AdminTh>Date</AdminTh><AdminTh /></tr></thead>
            <tbody>
              {projectList.map((project) => (
                <tr key={`bottom-${project.id}`} className="border-t border-white/[0.05]">
                  <AdminTd className="font-medium">{project.name}</AdminTd>
                  <AdminTd className="text-on-surface-variant">{project.stack}</AdminTd>
                  <AdminTd><AdminBadge tone={project.status === "Déployé" ? "success" : project.status === "Build" ? "warning" : "danger"}>{project.status}</AdminBadge></AdminTd>
                  <AdminTd>{project.credits}</AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface-variant">{project.date}</AdminTd>
                  <AdminTd className="text-right">
                    <button type="button" onClick={() => toast.message(project.name, { description: "Ouverture de la console projet." })} className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">
                      Ouvrir
                    </button>
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableShell>
      </AdminPanel>
    </div>
  );
}
