"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  GitBranch,
  MoreHorizontal,
  Plus,
  RefreshCw,
  ScanSearch,
  Search,
  ShieldCheck,
  Star,
  Tags,
  Webhook,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminBoilerplates,
  boilerplateKpis,
  weeklyClones,
} from "@/lib/data/admin";
import type { AdminBoilerplate } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import { ClonesBarChart } from "@/components/admin/charts";
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
  FieldLabel,
} from "@/components/admin/ui";

const statusOptions = ["Tous les statuts", "Publié", "Brouillon", "Dépublié"];

function statusTone(status: AdminBoilerplate["status"]) {
  if (status === "Publié") return "success" as const;
  if (status === "Brouillon") return "warning" as const;
  return "neutral" as const;
}

function RowMenu({
  item,
  onToggle,
}: {
  item: AdminBoilerplate;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        aria-label={`Actions ${item.title}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-lg border border-white/10 bg-[#1C1B1B] py-1 shadow-xl">
          <button type="button" onClick={() => { toast.message("Console d'édition", { description: item.title }); setOpen(false); }} className="block w-full px-3 py-1.5 text-left text-[11px] text-on-surface hover:bg-white/[0.06]">
            Modifier le modèle
          </button>
          <button type="button" onClick={() => { toast.success("Dépôt synchronisé", { description: item.repo }); setOpen(false); }} className="block w-full px-3 py-1.5 text-left text-[11px] text-on-surface hover:bg-white/[0.06]">
            Synchroniser GitHub
          </button>
          <button type="button" onClick={() => { onToggle(); setOpen(false); }} className="block w-full px-3 py-1.5 text-left text-[11px] text-on-surface hover:bg-white/[0.06]">
            {item.status === "Publié" ? "Dépublier" : "Publier"}
          </button>
        </div>
      )}
    </div>
  );
}

export function AdminBoilerplatesScreen() {
  const [rows, setRows] = useState<AdminBoilerplate[]>(adminBoilerplates);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [status, setStatus] = useState("Tous les statuts");
  const [syncing, setSyncing] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newRepo, setNewRepo] = useState("");
  const [newCategory, setNewCategory] = useState("IA & Copilotes");
  const [newStack, setNewStack] = useState("Next.js 15, Prisma, Stripe");
  const [newPrice, setNewPrice] = useState("299 €");

  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(adminBoilerplates.map((item) => item.category)))],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((item) => {
      const matchesQuery =
        !normalized ||
        [item.title, item.repo, item.category, item.stack.join(" ")].some((value) =>
          value.toLowerCase().includes(normalized)
        );
      const matchesCategory = category === "Tous" || item.category === category;
      const matchesStatus = status === "Tous les statuts" || item.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [rows, query, category, status]);

  function syncRepos() {
    setSyncing(true);
    window.setTimeout(() => {
      setSyncing(false);
      toast.success("Dépôts synchronisés", { description: "27 repositories GitHub alignés • 3 tags LTS mis à jour." });
    }, 950);
  }

  function togglePublish(item: AdminBoilerplate) {
    const nextStatus: AdminBoilerplate["status"] = item.status === "Publié" ? "Dépublié" : "Publié";
    setRows((current) => current.map((row) => (row.id === item.id ? { ...row, status: nextStatus } : row)));
    toast.success(nextStatus === "Publié" ? "Boilerplate publié" : "Boilerplate dépublié", { description: item.title });
  }

  function createBoilerplate() {
    if (!newTitle.trim() || !newRepo.trim()) {
      toast.error("Champs requis", { description: "Le titre et le repository sont obligatoires." });
      return;
    }
    const row: AdminBoilerplate = {
      id: `bp-${Date.now()}`,
      title: newTitle.trim(),
      repo: newRepo.trim(),
      category: newCategory,
      stack: newStack.split(",").map((part) => part.trim()).filter(Boolean),
      version: "v1.0",
      tag: "NEW",
      price: newPrice,
      status: "Brouillon",
      clones: "0 clone",
      thumbnail: "/images/catalogue/saas-ai-matrix.png",
    };
    setRows((current) => [row, ...current]);
    setCreateOpen(false);
    setNewTitle("");
    setNewRepo("");
    toast.success("Boilerplate créé", { description: `${row.title} ajouté en brouillon.` });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Répertoire master • v2.1 LTS kernel"
        title="Gestion des boilerplates"
        description="Administration du catalogue officiel des templates Next.js 15, contrôle de version et tarification."
        actions={
          <>
            <AdminButton onClick={syncRepos} disabled={syncing}>
              <GitBranch size={13} />
              {syncing ? "Synchronisation…" : "Synchroniser les dépôts"}
            </AdminButton>
            <AdminButton variant="primary" onClick={() => setCreateOpen(true)}>
              <Plus size={13} /> Nouveau boilerplate
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {boilerplateKpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            trend={kpi.trend}
            icon={<AdminKpiIcon name={kpi.icon} />}
            accent={kpi.icon === "layers"}
          />
        ))}
      </div>

      <AdminPanel>
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="relative min-w-[260px] flex-1">
            <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <AdminInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filtrer les boilerplates par titre, stack ou repository…"
              className="h-8 pl-7 text-[11px]"
            />
          </div>
          <AdminSelect value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item === "Tous" ? "Tous les domaines" : item}</option>
            ))}
          </AdminSelect>
          <AdminSelect value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((item) => <option key={item} value={item}>{item}</option>)}
          </AdminSelect>
        </div>

        <AdminTableShell>
          <table className="w-full min-w-[1040px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Modèle & thumbnail</AdminTh>
                <AdminTh>Catégorie</AdminTh>
                <AdminTh>Stack technique</AdminTh>
                <AdminTh>Version</AdminTh>
                <AdminTh>Tags</AdminTh>
                <AdminTh>Prix / formule</AdminTh>
                <AdminTh>Statut</AdminTh>
                <AdminTh>Téléchargements</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                  <AdminTd>
                    <div className="flex items-center gap-2.5">
                      <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-white/10 bg-[#141414]">
                        <Image src={item.thumbnail} alt={item.title} fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-semibold text-on-surface">{item.title}</span>
                        <span className="block max-w-[240px] truncate text-[10px] text-on-surface-variant">{item.repo}</span>
                      </span>
                    </div>
                  </AdminTd>
                  <AdminTd className="text-on-surface-variant">{item.category}</AdminTd>
                  <AdminTd>
                    <div className="flex max-w-[220px] flex-wrap gap-1">
                      {item.stack.map((tech) => (
                        <span key={tech} className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-on-surface-variant">{tech}</span>
                      ))}
                    </div>
                  </AdminTd>
                  <AdminTd className="font-mono text-[10px] text-on-surface-variant">{item.version}</AdminTd>
                  <AdminTd>
                    <AdminBadge tone={item.tag === "LATEST" ? "success" : item.tag === "ARCHIVED" ? "neutral" : item.tag === "BETA" ? "warning" : "info"}>
                      {item.tag}
                    </AdminBadge>
                  </AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface">{item.price}</AdminTd>
                  <AdminTd><AdminBadge tone={statusTone(item.status)} dot>{item.status}</AdminBadge></AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface-variant">{item.clones}</AdminTd>
                  <AdminTd>
                    <RowMenu item={item} onToggle={() => togglePublish(item)} />
                  </AdminTd>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Search size={22} className="mx-auto mb-2 text-on-surface-variant" />
                    <p className="text-[12px] font-medium text-on-surface">Aucun boilerplate trouvé</p>
                    <p className="mt-1 text-[11px] text-on-surface-variant">Modifiez la recherche ou les filtres.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </AdminTableShell>
        <div className="border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-[10px] text-on-surface-variant">Affichage de {filtered.length} modèles sur 27 totaux</p>
        </div>
      </AdminPanel>

      <div className="grid gap-3 lg:grid-cols-3">
        <AdminPanel>
          <AdminPanelHeader title="Clones hebdomadaires" description="Derniers 7 jours" />
          <div className="px-2 pb-3 sm:px-3">
            <ClonesBarChart data={weeklyClones} />
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader
            title="Santé des dépôts Git"
            description="Synchronisation GitHub"
            action={<AdminBadge tone="success">100 % intacts</AdminBadge>}
          />
          <div className="space-y-2 px-4 pb-4 text-[11px]">
            {[
              { icon: Webhook, label: "Webhooks GitHub actifs", value: "27 / 27" },
              { icon: GitBranch, label: "Tags de synchronisation LTS", value: "v15.2.4 alignée" },
              { icon: CheckCircle2, label: "Workflows CI/CD", value: "Vert" },
              { icon: ShieldCheck, label: "Dépendances vulnérables", value: "0 critique" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 border-b border-white/[0.05] py-1.5 last:border-0">
                  <Icon size={12} className="text-on-surface-variant" />
                  <span className="flex-1 text-on-surface-variant">{item.label}</span>
                  <span className="font-semibold text-on-surface">{item.value}</span>
                </div>
              );
            })}
          </div>
        </AdminPanel>

        <AdminPanel>
          <AdminPanelHeader title="Actions rapides catalogue" description="Maintenance du répertoire" />
          <div className="space-y-1.5 px-4 pb-4">
            <AdminButton size="sm" className="w-full justify-start" onClick={() => toast.success("Scan de vulnérabilités lancé", { description: "27 dépôts en cours d'analyse • résultats sous 2 min." })}>
              <ScanSearch size={12} /> Déclencher le scan de vulnérabilités
            </AdminButton>
            <AdminButton size="sm" className="w-full justify-start" onClick={() => toast.success("Aperçus régénérés", { description: "Les thumbnails OpenGraph ont été mis à jour." })}>
              <RefreshCw size={12} /> Régénérer les aperçus OG
            </AdminButton>
            <AdminButton size="sm" className="w-full justify-start" onClick={() => toast.success("README mis à jour", { description: "Le catalogue master a été republié sur GitHub." })}>
              <Tags size={12} /> Mettre à jour le README
            </AdminButton>
            <AdminButton size="sm" className="w-full justify-start" onClick={() => toast.message("Audit qualité", { description: "Score catalogue : 4.92 / 5 • 612 avis." })}>
              <Star size={12} /> Auditer la qualité du catalogue
            </AdminButton>
          </div>
        </AdminPanel>
      </div>

      <AdminModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Nouveau boilerplate"
        description="Créez une entrée en brouillon, puis publiez après validation QA."
        footer={
          <>
            <AdminButton onClick={() => setCreateOpen(false)}>Annuler</AdminButton>
            <AdminButton variant="primary" onClick={createBoilerplate}>
              <Plus size={13} /> Créer le brouillon
            </AdminButton>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block space-y-1">
            <FieldLabel>Titre du modèle</FieldLabel>
            <AdminInput value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="SaaS AI Copilot Starter" />
          </label>
          <label className="block space-y-1">
            <FieldLabel>Repository GitHub</FieldLabel>
            <AdminInput value={newRepo} onChange={(event) => setNewRepo(event.target.value)} placeholder="github.com/netero.org/mon-modele" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <FieldLabel>Catégorie</FieldLabel>
              <AdminSelect className="h-9 w-full" value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                {categories.filter((item) => item !== "Tous").map((item) => <option key={item} value={item}>{item}</option>)}
              </AdminSelect>
            </label>
            <label className="block space-y-1">
              <FieldLabel>Prix</FieldLabel>
              <AdminInput value={newPrice} onChange={(event) => setNewPrice(event.target.value)} placeholder="299 €" />
            </label>
          </div>
          <label className="block space-y-1">
            <FieldLabel>Stack (séparée par des virgules)</FieldLabel>
            <AdminInput value={newStack} onChange={(event) => setNewStack(event.target.value)} />
          </label>
        </div>
      </AdminModal>
    </div>
  );
}
