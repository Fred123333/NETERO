"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Accueil", href: "/", path: "accueil" },
  { label: "Boilerplates", href: "/boilerplates", path: "boilerplates" },
  { label: "Fonctionnalités", href: "/fonctionnalites", path: "fonctionnalites" },
  { label: "Tarifs", href: "/tarifs", path: "tarifs" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md shrink-0">
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

        <nav className="hidden md:flex items-center gap-space-xs">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.path}
                href={item.href}
                className={cn(
                  "px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors",
                  active
                    ? "bg-surface-container text-on-surface font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-sm">
          <ThemeToggle />
          <Link
            href="/connexion"
            className="hidden sm:inline-flex items-center px-space-md py-space-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/inscription"
            className="inline-flex items-center px-space-md py-space-sm font-label-md text-label-md font-semibold text-on-primary-container bg-primary-container hover:bg-primary-fixed-dim rounded-full transition-transform active:scale-95"
          >
            Commencer
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-space-xs">
            <User size={18} className="text-on-primary" />
          </div>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}