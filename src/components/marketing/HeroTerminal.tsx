import { TopologySVG } from "./TopologySVG";
import { Circle, Cpu, HardDrive, Zap, Activity } from "lucide-react";

const techBadges = [
  "Next.js 15",
  "TypeScript 5.4",
  "Prisma ORM",
  "Tailwind CSS",
  "Stripe Webhooks",
  "Supabase Auth",
  "Auth.js v5",
  "Zod",
];

const systemMetrics = [
  { icon: Cpu, label: "CPU", value: "12%", color: "text-emerald-400" },
  { icon: HardDrive, label: "RAM", value: "248MB", color: "text-emerald-400" },
  { icon: Zap, label: "Latence", value: "18.4s", color: "text-[#FFD700]" },
  { icon: Activity, label: "Build", value: "OK", color: "text-emerald-400" },
];

export function HeroTerminal() {
  return (
    <div className="w-full max-w-5xl mt-14 bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden text-left relative">
      {/* Terminal header */}
      <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error" />
          <span className="w-3 h-3 rounded-full bg-[#FFD700]/60" />
          <span className="w-3 h-3 rounded-full bg-surface-variant" />
          <span className="ml-space-sm font-code text-code-snippet text-on-surface-variant">
            zsh ~ netero-v2.4-agent
          </span>
        </div>
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
          <span>CLI READY</span>
          <span className="text-on-surface-variant/50 mx-1">·</span>
          <span className="font-code">v2.4.1</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="px-space-lg py-2 bg-surface-container/50 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <span className="font-code text-[10px] text-on-surface-variant whitespace-nowrap">
            build
          </span>
          <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-[#FFD700] to-[#e9c400] rounded-full" />
          </div>
          <span className="font-code text-[10px] text-emerald-400 font-semibold">
            100%
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Terminal (7/12) */}
        <div className="lg:col-span-7 font-code text-code-snippet text-on-surface-variant space-y-space-sm">
          <div className="text-on-surface flex items-center gap-space-xs flex-wrap">
            <span className="text-[#FFD700]">$</span>
            <span className="text-on-surface font-medium">
              npx netero-cli init my-enterprise-saas --ai
            </span>
          </div>

          <div>
            [+] Résolution des dépendances (142 packages)...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Déballage de l&apos;architecture Next.js 15 App Router...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Configuration Prisma ORM + PostgreSQL multi-schémas...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Branchement Stripe Billing & Webhooks idémpotents...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Injection de l&apos;Agent IA & Prompt Chains contextuels...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Génération des types TypeScript (strict mode)...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Configuration ESLint, Prettier & Husky...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>
          <div>
            [+] Seed de la base de données de démo...{" "}
            <span className="text-[#FFD700]">✓</span>
          </div>

          <div className="p-space-sm bg-surface-container-high rounded-lg text-[#FFD700] font-code text-code-snippet mt-space-md">
            &gt; Prêt ! Démarrez avec: cd my-enterprise-saas &amp;&amp; pnpm dev (Port 3000)
          </div>

          {/* Ligne finale avec curseur */}
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="text-[#FFD700]">$</span>
            <span className="w-2 h-4 bg-[#FFD700] animate-pulse" />
          </div>

          {/* Badges tech — enrichis */}
          <div className="pt-space-md flex flex-wrap gap-2">
            {techBadges.map((b) => (
              <span
                key={b}
                className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface border border-outline-variant/30"
              >
                {b}
              </span>
            ))}
            <span className="px-2 py-1 bg-[#FFD700]/10 rounded font-label-sm text-label-sm text-[#FFD700] border border-[#FFD700]/30">
              +12 more
            </span>
          </div>
        </div>

        {/* Panneau droit (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          {/* Métriques système */}
          <div className="grid grid-cols-2 gap-2">
            {systemMetrics.map((m) => (
              <div
                key={m.label}
                className="p-2 bg-surface-container rounded-lg border border-outline-variant/20 flex items-center gap-2"
              >
                <m.icon size={14} className={m.color} />
                <div className="flex flex-col">
                  <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className={`font-code text-[11px] font-semibold ${m.color}`}>
                    {m.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Schéma topologie */}
          <div className="bg-surface-container rounded-xl p-space-md flex flex-col shadow-inner flex-1">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm font-semibold text-[#FFD700] uppercase tracking-wider">
                Topologie Scaffolding
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                <Circle size={6} className="fill-emerald-400 text-emerald-400" />
                0 latency init
              </span>
            </div>
            <div className="py-2 flex-1">
              <TopologySVG />
            </div>
          </div>

          {/* Footer temps */}
          <div className="pt-space-xs text-on-surface-variant font-body-sm text-body-sm flex items-center justify-between border-t border-outline-variant/20 pt-space-sm">
            <span>Temps moyen d&apos;injection</span>
            <span className="font-code text-code-snippet text-[#FFD700] font-bold">
              &lt; 18.4s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}