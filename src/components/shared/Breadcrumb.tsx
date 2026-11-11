import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mb-space-md flex-wrap"
    >
      <Link
        href="/"
        className="hover:text-on-surface transition-colors flex items-center gap-1"
      >
        <Home size={15} />
        Accueil
      </Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-outline-variant" />
          {c.href ? (
            <Link href={c.href} className="hover:text-on-surface transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="text-on-surface font-semibold">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}