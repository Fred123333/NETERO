"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Accueil", href: "/", path: "accueil" },
  { label: "Boilerplates", href: "/boilerplates", path: "boilerplates" },
  { label: "Fonctionnalités", href: "/fonctionnalites", path: "fonctionnalites" },
  { label: "Tarifs", href: "/#tarifs", path: "tarifs" },
];

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center justify-center gap-space-xs">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.path}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors duration-300 cursor-pointer",
              active
                ? "text-on-surface font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {item.label}
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-container"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden border-t border-outline-variant/30 px-gutter py-space-md flex flex-col gap-space-xs">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.path}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors cursor-pointer",
              active
                ? "text-primary-container font-bold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/connexion"
        onClick={onNavigate}
        className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
      >
        Connexion
      </Link>
    </nav>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // Le wrapper laisse un espace avec le haut de l'écran (top-4 / md:top-5)
    <header className="fixed top-4 md:top-5 inset-x-0 z-50 px-4 md:px-6 pointer-events-none">
      <div className="pointer-events-auto relative max-w-7xl mx-auto overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        <div className="h-16 px-gutter grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-space-md">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-space-sm">
              <Image
                src="/images/logo-netero.png"
                alt="NETERO Logo N"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-bold uppercase">
                NETERO
              </span>
            </Link>
          </div>

          {/* Navigation centrée */}
          <Suspense fallback={<div className="hidden md:block h-10 w-72" />}>
            <HeaderNav />
          </Suspense>

          {/* Actions à droite */}
          <div className="flex items-center justify-end gap-space-sm col-start-3">
            <ThemeToggle />
            <Link
              href="/connexion"
              className="hidden sm:inline-flex items-center px-space-md py-space-sm font-label-md text-label-md font-semibold text-on-surface rounded-xl border border-primary-container/60 hover:border-primary-container hover:bg-primary-container/10 transition-all duration-300 cursor-pointer active:scale-95"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center px-space-md py-space-sm font-label-md text-label-md font-semibold text-on-primary-container bg-primary-container hover:bg-primary-fixed-dim rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Commencer
            </Link>
            <div className="w-8 h-8 rounded-full bg-surface-container-high hidden sm:flex items-center justify-center shrink-0 ml-space-xs">
              <User size={18} className="text-on-surface" />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
        <ScrollProgress />
      </div>
    </header>
  );
}