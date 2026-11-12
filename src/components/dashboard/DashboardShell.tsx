"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Sparkles,
  FolderKanban,
  Star,
  CreditCard,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Zap,
  Bell,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const nav = [
  { label: "Accueil", href: "/dashboard", icon: Home },
  { label: "Boilerplates", href: "/dashboard/boilerplates", icon: LayoutGrid },
  { label: "Générateur IA", href: "/dashboard/generateur", icon: Sparkles },
  { label: "Mes projets", href: "/dashboard/projets", icon: FolderKanban },
  { label: "Favoris", href: "/dashboard/favoris", icon: Star },
  { label: "Mon abonnement", href: "/dashboard/abonnement", icon: CreditCard },
  { label: "Historique", href: "/dashboard/historique", icon: History },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
  { label: "Mon compte", href: "/dashboard/compte", icon: UserIcon },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 font-label-md text-label-md transition-colors cursor-pointer",
              active
                ? "bg-[#FFD700]/10 text-[#FFD700] font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            )}
          >
            <Icon size={18} className={active ? "text-[#FFD700]" : ""} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const isCli = pathname.startsWith("/dashboard/cli");

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5 border-b border-outline-variant/20">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/logo-netero.png"
            alt="NETERO"
            width={30}
            height={30}
            className="h-8 w-auto object-contain"
          />
          <span className="font-headline-sm text-headline-sm font-bold uppercase tracking-tight text-on-surface">
            NETERO
          </span>
        </Link>
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-1 font-label-sm text-[11px] font-semibold uppercase tracking-wide text-[#FFD700]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
          Pro All-Access
        </div>
        <div className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
          CLI v2.4 connecté
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto">
        <NavLinks pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-outline-variant/20 p-3">
        <Link
          href="/dashboard/cli"
          onClick={onNavigate}
          aria-current={isCli ? "page" : undefined}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 font-label-sm text-label-sm transition-colors cursor-pointer",
            isCli
              ? "bg-[#FFD700]/10 text-[#FFD700] font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          )}
        >
          <Zap size={16} />
          API &amp; CLI v2.4
        </Link>
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-[#FFD700] cursor-pointer"
        >
          <LogOut size={16} />
          Déconnexion
        </Link>

        <div className="mt-2 flex items-center gap-3 rounded-xl bg-surface-container px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/15 text-[#FFD700]">
            <UserIcon size={18} />
          </div>
          <div className="min-w-0">
            <div className="truncate font-label-md text-label-md font-semibold text-on-surface">
              Alexandre Dupont
            </div>
            <div className="truncate font-body-sm text-[11px] text-on-surface-variant">
              pro All-Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ onOpenMenu, pathname }: { onOpenMenu: () => void; pathname: string }) {
  const active = nav.find((n) =>
    n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)
  );
  const pageTitle = pathname.startsWith("/dashboard/cli")
    ? "API & CLI v2.4"
    : (active?.label ?? "Dashboard");

  return (
    <header className="sticky top-0 z-30 border-b border-outline-variant/20 bg-surface/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Ouvrir le menu"
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="font-body-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
            Workspace
          </div>
          <div className="truncate font-label-md text-label-md font-semibold text-on-surface">
            {pageTitle}
          </div>
        </div>

        <div className="ml-auto hidden md:flex items-center">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              placeholder="Rechercher boilerplates, code..."
              className="h-10 w-64 lg:w-80 rounded-lg border border-outline-variant/40 bg-surface-container-lowest pl-9 pr-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-[#FFD700]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/40"
            />
          </div>
        </div>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/25 bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[12px] font-semibold text-[#FFD700]">
            <Zap size={14} />
            85/100
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
          </button>
          <ThemeToggle />
          <Link
            href="/dashboard/compte"
            className="flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container px-1.5 py-1.5 pr-2.5 transition-colors hover:bg-surface-container-high cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFD700]/15 text-[#FFD700]">
              <UserIcon size={16} />
            </span>
            <span className="hidden xl:block text-left">
              <span className="block font-label-sm text-[12px] font-semibold leading-tight text-on-surface">
                Alexandre Dupont
              </span>
              <span className="block font-body-sm text-[10px] leading-tight text-on-surface-variant">
                Pro All-Access
              </span>
            </span>
            <ChevronDown size={14} className="hidden xl:block text-on-surface-variant" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-outline-variant/20 bg-surface-container-lowest lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-outline-variant/20 bg-surface-container-lowest">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-3 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
            >
              <X size={18} />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onOpenMenu={() => setOpen(true)} pathname={pathname} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
