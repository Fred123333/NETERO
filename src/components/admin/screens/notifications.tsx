"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BellRing,
  CheckCheck,
  CreditCard,
  Cpu,
  Settings2,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { adminNotifications, notificationKpis } from "@/lib/data/admin";
import type { AdminNotification, AdminTone } from "@/lib/data/admin";
import { AdminKpiIcon } from "@/components/admin/icons";
import {
  AdminBadge,
  AdminButton,
  AdminKpiCard,
  AdminPageHeader,
  AdminPanel,
  AdminTabs,
} from "@/components/admin/ui";

const toneStyles: Record<AdminTone, { icon: typeof Bell; className: string }> = {
  success: { icon: CheckCheck, className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300" },
  warning: { icon: BellRing, className: "border-amber-500/20 bg-amber-500/10 text-amber-300" },
  danger: { icon: ShieldAlert, className: "border-red-500/20 bg-red-500/10 text-red-300" },
  info: { icon: Cpu, className: "border-sky-500/20 bg-sky-500/10 text-sky-300" },
  neutral: { icon: CreditCard, className: "border-white/10 bg-white/[0.05] text-on-surface-variant" },
};

type Category = "Toutes" | AdminNotification["category"];

export function AdminNotificationsScreen() {
  const [items, setItems] = useState(adminNotifications);
  const [category, setCategory] = useState<Category>("Toutes");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const unread = items.filter((item) => !item.read).length;

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory = category === "Toutes" || item.category === category;
        const matchesUnread = !unreadOnly || !item.read;
        return matchesCategory && matchesUnread;
      }),
    [items, category, unreadOnly]
  );

  const categories: Category[] = ["Toutes", "Système", "Paiement", "Sécurité", "IA"];

  function markAll() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
    toast.success("Notifications marquées comme lues", { description: `${unread} alerte(s) traitée(s).` });
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-4">
      <AdminPageHeader
        eyebrow="Console système › Centre d'alertes"
        title="Notifications"
        description="Alertes système, sécurité, facturation et activité du moteur IA. Les événements critiques sont poussés en temps réel via gRPC."
        actions={
          <>
            <Link href="/admin/parametres">
              <AdminButton><Settings2 size={13} /> Paramètres d’alertes</AdminButton>
            </Link>
            <AdminButton variant="primary" onClick={markAll} disabled={unread === 0}>
              <CheckCheck size={13} /> Tout marquer comme lu
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-2.5">
        {notificationKpis.map((kpi) => (
          <AdminKpiCard key={kpi.label} label={kpi.label} value={kpi.label === "Non lues" ? String(unread) : kpi.value} hint={kpi.hint} trend={kpi.trend} icon={<AdminKpiIcon name={kpi.icon} />} />
        ))}
      </div>

      <AdminPanel>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <AdminTabs
            tabs={categories.map((item) => ({
              value: item,
              label: item === "Toutes" ? `Toutes (${items.length})` : item,
            }))}
            value={category}
            onChange={setCategory}
          />
          <label className="flex cursor-pointer items-center gap-2 text-[10px] text-on-surface-variant">
            <input type="checkbox" checked={unreadOnly} onChange={(event) => setUnreadOnly(event.target.checked)} className="h-3.5 w-3.5 accent-emerald-500" />
            Non lues uniquement
          </label>
        </div>

        <ul className="divide-y divide-white/[0.05]">
          {filtered.map((item) => {
            const style = toneStyles[item.tone];
            const Icon = style.icon;
            return (
              <li key={item.id} className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] ${item.read ? "opacity-70" : ""}`}>
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${style.className}`}>
                  <Icon size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`text-[12px] ${item.read ? "font-medium text-on-surface-variant" : "font-semibold text-on-surface"}`}>{item.title}</p>
                    <AdminBadge tone={item.tone}>{item.category}</AdminBadge>
                    {!item.read && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{item.detail}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-wide text-on-surface-variant/70">{item.time}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, read: !entry.read } : entry)));
                      toast.success(item.read ? "Marquée comme non lue" : "Notification lue");
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                    aria-label={item.read ? "Marquer comme non lue" : "Marquer comme lue"}
                  >
                    <CheckCheck size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setItems((current) => current.filter((entry) => entry.id !== item.id));
                      toast.success("Notification supprimée");
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-on-surface-variant hover:bg-red-500/10 hover:text-red-300"
                    aria-label="Supprimer la notification"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-4 py-14 text-center">
              <Bell size={22} className="mx-auto mb-2 text-on-surface-variant" />
              <p className="text-[12px] font-medium text-on-surface">Aucune notification</p>
              <p className="mt-1 text-[11px] text-on-surface-variant">Tout est à jour dans cette catégorie.</p>
            </li>
          )}
        </ul>
      </AdminPanel>
    </div>
  );
}
