import Link from "next/link";
import { Zap, Terminal } from "lucide-react";
import { HeroTerminal } from "./HeroTerminal";

const metrics = [
  { value: "4,800+", label: "Développeurs actifs" },
  { value: "99.9%", label: "Uptime des APIs" },
  { value: "0 Lock-in", label: "Code 100% vôtre" },
  { value: "14 min", label: "Du clone au push prod" },
];

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden px-gutter pt-space-xl pb-28">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-180 h-90 bg-surface-container-highest/60 blur-[140px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Badge release */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface-container rounded-full shadow-md mb-space-lg">
          <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-sm text-label-sm text-primary-container font-semibold tracking-wide uppercase">
            NETERO ENGINE v2.4 • BOILERPLATES NEXT.JS & GÉNÉRATEUR IA
          </span>
        </div>

        {/* Titre */}
        <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl text-balance text-on-surface font-bold tracking-tight">
          Expédiez vos SaaS en quelques heures,{" "}
          <span className="text-primary-container">pas en plusieurs mois.</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-space-lg font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance">
          La plateforme tout-en-un pour développeurs combinant des architectures Next.js 15 FullStack
          prêtes pour la production et un agent IA qui génère et déploie vos fonctionnalités
          critiques.
        </p>

        {/* CTA */}
        <div className="mt-space-xl flex flex-col sm:flex-row items-center gap-space-md">
          <Link
            href="#tarifs"
            className="inline-flex items-center justify-center gap-space-xs px-6 py-3.5 bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-full shadow-xl hover:bg-primary-fixed-dim transition-transform active:scale-95"
          >
            <span>Commencer gratuitement</span>
            <Zap size={18} />
          </Link>
          <Link
            href="#boilerplates"
            className="inline-flex items-center justify-center gap-space-xs px-6 py-3.5 bg-surface-container text-on-surface font-label-md text-label-md font-medium rounded-full shadow-md hover:bg-surface-container-high transition-colors"
          >
            <span>Explorer les boilerplates</span>
            <Terminal size={18} />
          </Link>
        </div>

        {/* 4 métriques */}
        <div className="mt-space-xl grid grid-cols-2 md:grid-cols-4 gap-space-md w-full max-w-3xl">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-space-md bg-surface-container-low rounded-xl text-center shadow-sm"
            >
              <div className="font-headline-md text-headline-md font-bold text-on-surface">
                {m.value}
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">{m.label}</div>
            </div>
          ))}
        </div>

        {/* ⬇️ NOUVEAU — mock terminal + schéma de topologie */}
        <HeroTerminal />
      </div>
    </section>
  );
}