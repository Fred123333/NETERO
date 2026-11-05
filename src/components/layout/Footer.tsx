import Image from "next/image";
import Link from "next/link";
import { Terminal, Code, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Plateforme",
    links: [
      { label: "Catalogue Next.js", href: "/boilerplates" },
      { label: "Générateur IA", href: "/fonctionnalites" },
      { label: "Architecture Technique", href: "/documentation" },
      { label: "Mises à jour", href: "/changelog" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "Design System & UI", href: "/composants" },
      { label: "Communauté Discord", href: "/communaute" },
      { label: "Support Technique", href: "/support" },
    ],
  },
  {
    title: "Légal & Société",
    links: [
      { label: "Conditions Générales", href: "/conditions-utilisation" },
      { label: "Confidentialité", href: "/politique-confidentialite" },
      { label: "Licences Commerciales", href: "/licences" },
      { label: "Sécurité & Conformité", href: "/securite" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-gutter py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-xl">
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <Image
                src="/images/logo-netero.png"
                alt="NETERO Logo N"
                width={28}
                height={28}
                className="h-7 w-auto object-contain"
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-bold uppercase">
                NETERO
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Next.js production-grade boilerplates & AI fullstack app generators conçus pour les
              développeurs exigeants.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              {[Terminal, Code, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-label-md text-label-md font-semibold text-on-surface mb-space-md">
                {col.title}
              </div>
              <ul className="space-y-space-sm">
                {col.links.map((l) => (
                  <li key={l.href} className="font-body-sm text-body-sm">
                    <Link
                      href={l.href}
                      className="text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
          <div>© 2025 NETERO Technologies Inc. Tous droits réservés.</div>
          <div className="flex items-center gap-space-lg">
            <Link href="/conditions-utilisation" className="hover:text-on-surface transition-colors">
              Conditions
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-on-surface transition-colors"
            >
              Vie Privée
            </Link>
            <Link href="/status" className="hover:text-on-surface transition-colors">
              Status des services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}