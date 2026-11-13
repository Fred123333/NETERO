"use client";

import { useMemo, useState } from "react";
import {
  Download,
  ExternalLink,
  FolderKanban,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { adminProjects } from "@/lib/data/admin";
import type { AdminProject } from "@/lib/data/admin";
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
} from "@/components/admin/ui";
import { downloadCsv } from "@/lib/export";

const kpis = [
  { label: "Projets générés", value: "142", hint: "+18 ce mois", trend: "up" as const, icon: "sparkles" },
  { label: "Déploiements réussis", value: "98.9 %", hint: "Build fail rate 1.1 %", trend: "up" as const, icon: "rocket" },
  { label: "Builds en cours", value: "3", hint: "Cluster AI00-FR", trend: "flat" as const, icon: "clock" },
  { label: "Crédits consommés", value: "612", hint: "Moyenne 4.2 / projet", trend: "up" as const, icon: "cpu" },
];

function statusTone(status: AdminProject["status"]) {
  if (status === "Déployé") return "success" as const;
  if (status === "Build") return "warning" as const;
  return "danger" as const;
}

export function AdminProjectsScreen() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");
  const [inspect, setInspect] = useState<AdminProject | null>(null);
  const [redeploying, setRedeploying] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return adminProjects.filter((project) => {
      const matchesStatus = status === "Tous" || project.status === status;
      const matchesQuery =
        !normalized ||
        [project.name, project.user, project.org, project.stack].some((value) =>
          value.toLowerCase().includes(normalized)
        );
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  function exportRows() {
    downloadCsv("netero-projets.csv", [
      ["Projet", "Utilisateur", "Organisation", "Stack", "Statut", "Crédits", "Date"],
      ...filtered.map((project) => [project.name, project.user, project.org, project.stack, project.status, project.credits, project.date]),
    ]);
    toast.success("Export généré", { description: `${filtered.length} projet(s) exporté(s).` });
  }

  return (
    <div className="mx-auto max-w-[1240px] space-y-4">
      <AdminPageHeader
        eyebrow="Console système › Registre des générations"
        title="Projets générés"
        description="Traçabilité complète des projets scaffoldés par le moteur IA, de la compilation au déploiement edge."
        actions={
          <>
            <AdminButton onClick={exportRows}><Download size={13} /> Exporter</AdminButton>
            <AdminButton variant="primary" onClick={() => toast.message("Nouveau projet", { description: "Le générateur IA est accessible depuis l'espace client." })}>
              <Plus size={13} /> Lancer une génération
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <AdminKpiCard key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} trend={kpi.trend} icon={<AdminKpiIcon name={kpi.icon} />} />
        ))}
      </div>

      <AdminPanel>
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="relative min-w-[240px] flex-1">
            <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <AdminInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un projet, utilisateur, stack…" className="h-8 pl-7 text-[11px]" />
          </div>
          <AdminSelect value={status} onChange={(event) => setStatus(event.target.value)}>
            {["Tous", "Déployé", "Build", "Échec"].map((item) => (
              <option key={item} value={item}>{item === "Tous" ? "Tous les statuts" : item}</option>
            ))}
          </AdminSelect>
        </div>

        <AdminTableShell>
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <AdminTh>Projet</AdminTh>
                <AdminTh>Utilisateur</AdminTh>
                <AdminTh>Stack</AdminTh>
                <AdminTh>Statut</AdminTh>
                <AdminTh>Crédits</AdminTh>
                <AdminTh>Dernière activité</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                  <AdminTd>
                    <span className="block font-medium text-on-surface">{project.name}</span>
                    <span className="block text-[10px] text-on-surface-variant">{project.org}</span>
                  </AdminTd>
                  <AdminTd className="text-on-surface-variant">{project.user}</AdminTd>
                  <AdminTd className="text-[10px] text-on-surface-variant">{project.stack}</AdminTd>
                  <AdminTd><AdminBadge tone={statusTone(project.status)} dot>{project.status}</AdminBadge></AdminTd>
                  <AdminTd className="font-semibold">{project.credits}</AdminTd>
                  <AdminTd className="whitespace-nowrap text-on-surface-variant">{project.date}</AdminTd>
                  <AdminTd>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setInspect(project)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300">
                        Inspecter <ExternalLink size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toast.success("Redéploiement lancé", { description: `${project.name} • build #${Math.floor(Math.random() * 900) + 100}` })}
                        aria-label={`Redéployer ${project.name}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                      >
                        <RefreshCw size={12} />
                      </button>
                    </div>
                  </AdminTd>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <FolderKanban size={22} className="mx-auto mb-2 text-on-surface-variant" />
                    <p className="text-[12px] font-medium text-on-surface">Aucun projet trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </AdminTableShell>
        <div className="border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-[10px] text-on-surface-variant">Affichage de {filtered.length} projets sur 142 générations enregistrées</p>
        </div>
      </AdminPanel>

      <AdminModal
        open={Boolean(inspect)}
        onClose={() => setInspect(null)}
        title={inspect?.name ?? "Projet"}
        description={inspect ? `${inspect.org} • ${inspect.user}` : undefined}
        footer={
          <>
            <AdminButton onClick={() => setInspect(null)}>Fermer</AdminButton>
            <AdminButton
              variant="primary"
              disabled={redeploying}
              onClick={() => {
                if (!inspect) return;
                setRedeploying(true);
                window.setTimeout(() => {
                  setRedeploying(false);
                  toast.success("Build terminé", { description: `${inspect.name} redéployé sur le cluster West.` });
                  setInspect(null);
                }, 1100);
              }}
            >
              <RefreshCw size={13} className={redeploying ? "animate-spin" : undefined} />
              {redeploying ? "Déploiement…" : "Redéployer"}
            </AdminButton>
          </>
        }
      >
        {inspect && (
          <div className="space-y-2 text-[11px]">
            {[
              ["Statut", inspect.status],
              ["Stack", inspect.stack],
              ["Crédits consommés", String(inspect.credits)],
              ["Dernière activité", inspect.date],
              ["URL de prévisualisation", `https://${inspect.id}.netero.app`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-white/[0.05] py-1.5 last:border-0">
                <span className="text-on-surface-variant">{label}</span>
                <span className="max-w-[60%] truncate font-medium text-on-surface">{value}</span>
              </div>
            ))}
            <div className="mt-2 rounded-lg border border-white/[0.06] bg-[#141414] p-2.5 font-mono text-[9px] text-on-surface-variant">
              <p><span className="text-emerald-400">$</span> netero build {inspect.id} --edge</p>
              <p className="mt-1">✓ AST validé • ✓ typecheck • ✓ déploiement CDN</p>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
