"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Search,
  ShieldOff,
  UserPlus,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { adminUsers } from "@/lib/data/admin";
import type { AdminUser } from "@/lib/data/admin";
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

type StatusFilter = "Tous" | AdminUser["status"];

const kpis = [
  { label: "Utilisateurs totaux", value: "14 820", hint: "+12.4 % ce mois", trend: "up" as const, icon: "users" },
  { label: "Actifs (DAU/MAU)", value: "3 410", hint: "68.0 % taux d'activité", trend: "up" as const, icon: "activity" },
  { label: "Abonnés premium", value: "1 245", hint: "MRR 48.2k € récurrent", trend: "up" as const, icon: "crown" },
  { label: "Comptes suspendus", value: "12", hint: "3 à revoir cette semaine", trend: "down" as const, icon: "shield" },
];

function planTone(plan: string) {
  if (plan.toLowerCase().includes("entreprise")) return "info" as const;
  if (plan.toLowerCase().includes("pro")) return "success" as const;
  if (plan.toLowerCase().includes("free")) return "neutral" as const;
  return "warning" as const;
}

function statusTone(status: AdminUser["status"]) {
  if (status === "Actif") return "success" as const;
  if (status === "Suspendu") return "danger" as const;
  return "warning" as const;
}

function RowMenu({
  user,
  suspended,
  onToggleSuspend,
}: {
  user: AdminUser;
  suspended: boolean;
  onToggleSuspend: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        aria-label={`Actions pour ${user.name}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-lg border border-white/10 bg-[#1C1B1B] py-1 shadow-xl">
          <Link
            href={`/admin/utilisateurs/${user.id}`}
            className="block px-3 py-1.5 text-[11px] text-on-surface hover:bg-white/[0.06]"
          >
            Voir la fiche
          </Link>
          <button
            type="button"
            onClick={() => {
              onToggleSuspend();
              setOpen(false);
            }}
            className="block w-full px-3 py-1.5 text-left text-[11px] text-on-surface hover:bg-white/[0.06]"
          >
            {suspended ? "Réactiver le compte" : "Suspendre le compte"}
          </button>
          <button
            type="button"
            onClick={() => {
              toast.success("Invitation 2FA envoyée", { description: `${user.email} doit reconfigurer son authenticator.` });
              setOpen(false);
            }}
            className="block w-full px-3 py-1.5 text-left text-[11px] text-on-surface hover:bg-white/[0.06]"
          >
            Réinitialiser la 2FA
          </button>
        </div>
      )}
    </div>
  );
}

export function AdminUsersScreen({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<StatusFilter>("Tous");
  const [plan, setPlan] = useState("Tous");
  const [role, setRole] = useState("Tous");
  const [selected, setSelected] = useState<string[]>([]);
  const [suspendedIds, setSuspendedIds] = useState<string[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Développeur");
  const [invitePlan, setInvitePlan] = useState("Free Starter");

  const plans = useMemo(
    () => ["Tous", ...Array.from(new Set(adminUsers.map((user) => user.plan)))],
    []
  );
  const roles = useMemo(
    () => ["Tous", ...Array.from(new Set(adminUsers.map((user) => user.role)))],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return adminUsers.filter((user) => {
      const effectiveStatus = suspendedIds.includes(user.id) ? "Suspendu" : user.status;
      const matchesQuery =
        !normalized ||
        [user.name, user.email, user.handle, user.role, user.plan].some((value) =>
          value.toLowerCase().includes(normalized)
        );
      const matchesStatus = status === "Tous" || effectiveStatus === status;
      const matchesPlan = plan === "Tous" || user.plan === plan;
      const matchesRole = role === "Tous" || user.role === role;
      return matchesQuery && matchesStatus && matchesPlan && matchesRole;
    });
  }, [query, status, plan, role, suspendedIds]);

  const allSelected = filtered.length > 0 && filtered.every((user) => selected.includes(user.id));

  function toggleAll() {
    if (allSelected) setSelected([]);
    else setSelected(filtered.map((user) => user.id));
  }

  function toggleOne(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  function toggleSuspend(user: AdminUser) {
    const isSuspended = suspendedIds.includes(user.id);
    setSuspendedIds((current) =>
      isSuspended ? current.filter((value) => value !== user.id) : [...current, user.id]
    );
    toast.success(isSuspended ? "Compte réactivé" : "Compte suspendu", {
      description: `${user.name} — ${isSuspended ? "accès rétabli" : "sessions révoquées et accès bloqué"}.`,
    });
  }

  function exportRows(rows: AdminUser[]) {
    downloadCsv("netero-utilisateurs.csv", [
      ["Nom", "Email", "Handle", "Rôle", "Formule", "Projets", "Inscription", "2FA", "Statut"],
      ...rows.map((user) => [
        user.name,
        user.email,
        user.handle,
        user.role,
        user.plan,
        user.projects,
        user.joined,
        user.twoFA ? "Activé" : "Désactivé",
        suspendedIds.includes(user.id) ? "Suspendu" : user.status,
      ]),
    ]);
    toast.success("Export généré", { description: `${rows.length} utilisateur(s) exporté(s) en CSV.` });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Gestion des accès • RBAC & identités"
        title="Utilisateurs"
        description="Gérez les comptes, rôles, formules d'abonnement et politiques de sécurité de la plateforme."
        actions={
          <>
            <AdminButton onClick={() => exportRows(filtered)}>
              <Download size={13} />
              Exporter CSV
            </AdminButton>
            <AdminButton variant="primary" onClick={() => setInviteOpen(true)}>
              <UserPlus size={13} />
              Inviter un utilisateur
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {kpis.map((kpi) => (
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
              { value: "Tous" as StatusFilter, label: "Tous (14 820)" },
              { value: "Actif" as StatusFilter, label: "Actifs (12 450)" },
              { value: "En attente" as StatusFilter, label: "En attente (18)" },
              { value: "Suspendu" as StatusFilter, label: "Suspendus (12)" },
            ]}
            value={status}
            onChange={setStatus}
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <AdminInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher nom, email…"
                className="h-8 w-[190px] pl-7 text-[11px]"
              />
            </div>
            <AdminSelect value={plan} onChange={(event) => setPlan(event.target.value)}>
              {plans.map((item) => (
                <option key={item} value={item}>{item === "Tous" ? "Tous les plans" : item}</option>
              ))}
            </AdminSelect>
            <AdminSelect value={role} onChange={(event) => setRole(event.target.value)}>
              {roles.map((item) => (
                <option key={item} value={item}>{item === "Tous" ? "Tous les rôles" : item}</option>
              ))}
            </AdminSelect>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2">
            <span className="text-[11px] font-medium text-emerald-200">{selected.length} sélectionné(s)</span>
            <div className="ml-auto flex items-center gap-2">
              <AdminButton size="sm" onClick={() => exportRows(filtered.filter((user) => selected.includes(user.id)))}>
                Exporter
              </AdminButton>
              <AdminButton
                size="sm"
                variant="danger"
                onClick={() => {
                  setSuspendedIds((current) => Array.from(new Set([...current, ...selected])));
                  toast.success("Comptes suspendus", { description: `${selected.length} compte(s) désactivé(s).` });
                  setSelected([]);
                }}
              >
                Suspendre
              </AdminButton>
              <AdminButton size="sm" variant="ghost" onClick={() => setSelected([])}>
                Annuler
              </AdminButton>
            </div>
          </div>
        )}

        <AdminTableShell>
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr>
                <AdminTh className="w-9">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Tout sélectionner"
                    className="h-3.5 w-3.5 accent-emerald-500"
                  />
                </AdminTh>
                <AdminTh>Utilisateur</AdminTh>
                <AdminTh>Rôle</AdminTh>
                <AdminTh>Formule</AdminTh>
                <AdminTh>Projets</AdminTh>
                <AdminTh>Inscription</AdminTh>
                <AdminTh>2FA</AdminTh>
                <AdminTh>Statut</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const isSuspended = suspendedIds.includes(user.id);
                const effectiveStatus = isSuspended ? "Suspendu" : user.status;
                return (
                  <tr key={user.id} className="border-t border-white/[0.05] transition-colors hover:bg-white/[0.02]">
                    <AdminTd>
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleOne(user.id)}
                        aria-label={`Sélectionner ${user.name}`}
                        className="h-3.5 w-3.5 accent-emerald-500"
                      />
                    </AdminTd>
                    <AdminTd>
                      <Link href={`/admin/utilisateurs/${user.id}`} className="flex items-center gap-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-[10px] font-bold text-white`}>
                          {user.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-on-surface hover:text-emerald-300">{user.name}</span>
                          <span className="block truncate text-[10px] text-on-surface-variant">{user.email}</span>
                        </span>
                      </Link>
                    </AdminTd>
                    <AdminTd className="text-on-surface-variant">{user.role}</AdminTd>
                    <AdminTd><AdminBadge tone={planTone(user.plan)}>{user.plan}</AdminBadge></AdminTd>
                    <AdminTd className="font-semibold">{user.projects}</AdminTd>
                    <AdminTd className="whitespace-nowrap text-on-surface-variant">{user.joined}</AdminTd>
                    <AdminTd>
                      {user.twoFA ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 size={13} /> Activé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-on-surface-variant">
                          <ShieldOff size={13} /> Non
                        </span>
                      )}
                    </AdminTd>
                    <AdminTd><AdminBadge tone={statusTone(effectiveStatus)} dot>{effectiveStatus}</AdminBadge></AdminTd>
                    <AdminTd>
                      <RowMenu user={user} suspended={isSuspended} onToggleSuspend={() => toggleSuspend(user)} />
                    </AdminTd>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Users size={22} className="mx-auto mb-2 text-on-surface-variant" />
                    <p className="text-[12px] font-medium text-on-surface">Aucun utilisateur trouvé</p>
                    <p className="mt-1 text-[11px] text-on-surface-variant">Ajustez les filtres ou la recherche.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </AdminTableShell>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-[10px] text-on-surface-variant">
            {filtered.length} résultat(s) affiché(s) sur 14 820 comptes
          </p>
          <div className="flex items-center gap-1">
            <AdminButton size="sm" variant="ghost" disabled>
              <ChevronLeft size={13} /> Précédent
            </AdminButton>
            <span className="px-2 text-[10px] font-semibold text-on-surface">1 / 1 235</span>
            <AdminButton size="sm" variant="ghost" disabled>
              Suivant <ChevronRight size={13} />
            </AdminButton>
          </div>
        </div>
      </AdminPanel>

      <AdminModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Inviter un utilisateur"
        description="Un email d'activation avec lien sécurisé sera envoyé immédiatement."
        footer={
          <>
            <AdminButton onClick={() => setInviteOpen(false)}>Annuler</AdminButton>
            <AdminButton
              variant="primary"
              onClick={() => {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
                  toast.error("Email invalide", { description: "Saisissez une adresse email professionnelle valide." });
                  return;
                }
                toast.success("Invitation envoyée", { description: `${inviteEmail} • ${invitePlan} • ${inviteRole}` });
                setInviteOpen(false);
                setInviteEmail("");
              }}
            >
              Envoyer l’invitation
            </AdminButton>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block space-y-1">
            <FieldLabel>Adresse email</FieldLabel>
            <AdminInput
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="nom@entreprise.com"
              type="email"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <FieldLabel>Rôle</FieldLabel>
              <AdminSelect
                className="h-9 w-full"
                value={inviteRole}
                onChange={(event) => setInviteRole(event.target.value)}
              >
                {["Développeur", "Lead Architect", "Admin", "Observateur"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </AdminSelect>
            </label>
            <label className="block space-y-1">
              <FieldLabel>Formule</FieldLabel>
              <AdminSelect
                className="h-9 w-full"
                value={invitePlan}
                onChange={(event) => setInvitePlan(event.target.value)}
              >
                {["Free Starter", "Pro All-Access", "Entreprise Custom"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </AdminSelect>
            </label>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
