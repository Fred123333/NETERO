"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { adminUsers } from "@/lib/data/admin";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const nav = [
  { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Abonnements", href: "/admin/abonnements", icon: CreditCard },
  { label: "Paiements & Revenus", href: "/admin/paiements", icon: Receipt },
  { label: "Gestion des boilerplates", href: "/admin/boilerplates", icon: Layers },
  { label: "Gestion de l'IA", href: "/admin/moteur-ia", icon: BrainCircuit },
  { label: "Projets générés", href: "/admin/projets", icon: FolderKanban },
  { label: "Statistiques & Rapports", href: "/admin/statistiques", icon: BarChart3 },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-[12px] transition-colors",
              active
                ? "bg-white/[0.07] font-semibold text-white"
                : "font-medium text-on-surface-variant hover:bg-white/[0.04] hover:text-on-surface"
            )}
          >
            <Icon
              size={16}
              className={active ? "text-emerald-400" : "text-on-surface-variant group-hover:text-on-surface"}
            />
            <span className="truncate">{item.label}</span>
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#141414]">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <Image
          src="/images/logo-netero.png"
          alt="NETERO"
          width={26}
          height={26}
          className="h-6 w-6 object-contain"
        />
        <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">NETERO</span>
        <span className="rounded border border-white/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
          Admin
        </span>
      </div>

      <p className="px-5 pb-2 pt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/80">
        Console système
      </p>

      <div className="flex-1 overflow-y-auto pb-2">
        <NavList pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Système opérationnel
            </span>
            <span className="text-[10px] font-semibold text-emerald-400">99.9 %</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[10px] text-on-surface-variant/80">v2.1 Enterprise</span>
            <ShieldCheck size={12} className="text-on-surface-variant/70" />
          </div>
        </div>
        <Link
          href="/"
          onClick={onNavigate}
          className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-white/[0.04] hover:text-on-surface"
        >
          <LogOut size={15} />
          Déconnexion
        </Link>
      </div>
    </div>
  );
}

function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const pages = nav
      .filter((item) => item.label.toLowerCase().includes(normalized))
      .map((item) => ({ type: "Page", label: item.label, href: item.href, meta: "Navigation" }));
    const users = adminUsers
      .filter((user) =>
        [user.name, user.email, user.plan, user.handle].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      )
      .slice(0, 4)
      .map((user) => ({
        type: "Utilisateur",
        label: user.name,
        href: `/admin/utilisateurs/${user.id}`,
        meta: user.email,
      }));
    return [...users, ...pages].slice(0, 6);
  }, [query]);

  const open = focused && query.trim().length > 0;

  return (
    <div className="relative w-full md:max-w-[520px]">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (results[0]) router.push(results[0].href);
            else router.push(`/admin/utilisateurs?q=${encodeURIComponent(query)}`);
            setFocused(false);
          }
          if (event.key === "Escape") setFocused(false);
        }}
        placeholder="Rechercher un utilisateur, boilerplate, transaction..."
        className="h-9 w-full rounded-lg border border-white/10 bg-[#1C1B1B] pl-9 pr-3 text-[11px] text-on-surface placeholder:text-on-surface-variant/60 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/25"
      />
      {open && (
        <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border border-white/10 bg-[#1C1B1B] shadow-2xl">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-[11px] text-on-surface-variant">Aucun résultat pour « {query} »</p>
          ) : (
            results.map((result) => (
              <button
                key={`${result.type}-${result.href}`}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  router.push(result.href);
                  setQuery("");
                  setFocused(false);
                }}
                className="flex w-full items-center justify-between gap-3 border-b border-white/[0.05] px-3 py-2 text-left last:border-0 hover:bg-white/[0.05]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium text-on-surface">{result.label}</span>
                  <span className="block truncate text-[10px] text-on-surface-variant">{result.meta}</span>
                </span>
                <span className="shrink-0 rounded border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-on-surface-variant">
                  {result.type}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#171717]/95 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Ouvrir le menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-on-surface hover:bg-white/[0.06] lg:hidden"
        >
          <Menu size={18} />
        </button>

        <SearchBox />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-[#1C1B1B] px-2.5 py-1.5 xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">API</span>
            <span className="text-[10px] font-semibold text-on-surface">24 ms</span>
          </div>
          <div className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-[#1C1B1B] px-2.5 py-1.5 xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span className="text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">Cluster</span>
            <span className="text-[10px] font-semibold text-on-surface">West</span>
          </div>

          <ThemeToggle />

          <Link
            href="/admin/notifications"
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
          >
            <Bell size={17} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </Link>

          <Link
            href="/admin/parametres"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1C1B1B] py-1 pl-1 pr-2.5 transition-colors hover:border-white/20"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">
              AP
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[10px] font-semibold leading-tight text-on-surface">Admin Principal</span>
              <span className="block text-[9px] leading-tight text-on-surface-variant">admin@netero.dev</span>
            </span>
            <span className="hidden rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-emerald-300 md:block">
              Superadmin
            </span>
            <ChevronDown size={13} className="hidden text-on-surface-variant sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="dark min-h-screen bg-[#171717] text-on-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.06] lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[86vw] flex-col border-r border-white/[0.08]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-3 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
            >
              <X size={17} />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onOpenMenu={() => setOpen(true)} />
        <main className="bg-[#171717] px-4 py-5">{children}</main>
      </div>

      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#1C1B1B",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#E5E2E1",
            fontSize: "12px",
          },
        }}
      />
    </div>
  );
}
