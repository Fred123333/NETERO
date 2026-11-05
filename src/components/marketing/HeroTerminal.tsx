function TopologySVG() {
  return (
    <svg
      viewBox="0 0 360 150"
      className="w-full h-auto"
      role="img"
      aria-label="Schéma de topologie de l’application"
    >
      <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="2">
        <path d="M180 75 78 35M180 75 78 115M180 75 282 35M180 75 282 115" />
      </g>
      <g fill="currentColor">
        <circle cx="180" cy="75" r="24" className="text-primary-container" />
        <circle cx="78" cy="35" r="16" className="text-secondary-fixed-dim" />
        <circle cx="78" cy="115" r="16" className="text-secondary-fixed-dim" />
        <circle cx="282" cy="35" r="16" className="text-secondary-fixed-dim" />
        <circle cx="282" cy="115" r="16" className="text-secondary-fixed-dim" />
      </g>
      <g fill="currentColor" fontFamily="monospace" fontSize="10" textAnchor="middle">
        <text x="180" y="78" className="fill-surface-container-lowest">CORE</text>
        <text x="78" y="65">APP</text>
        <text x="78" y="145">DB</text>
        <text x="282" y="65">AI</text>
        <text x="282" y="145">API</text>
      </g>
    </svg>
  );
}

const techBadges = [
  "Next.js 15",
  "TypeScript 5.4",
  "Prisma ORM",
  "Tailwind CSS",
  "Stripe Webhooks",
  "Supabase Auth",
];

export function HeroTerminal() {
  return (
    <div className="w-full max-w-5xl mt-14 bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden text-left relative">
      <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error" />
          <span className="w-3 h-3 rounded-full bg-primary-container/60" />
          <span className="w-3 h-3 rounded-full bg-surface-variant" />
          <span className="ml-space-sm font-code text-code-snippet text-secondary-fixed-dim">
            zsh ~ netero-v2.4-agent
          </span>
        </div>
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-fixed-dim">
          <span className="w-2 h-2 rounded-full bg-primary-container" />
          <span>CLI READY</span>
        </div>
      </div>

      <div className="p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-7 font-code text-code-snippet text-secondary-fixed-dim space-y-space-sm">
          <div className="text-on-surface flex items-center gap-space-xs flex-wrap">
            <span className="text-primary-container">$</span>
            <span className="text-primary font-medium">
              npx netero-cli init my-enterprise-saas --ai
            </span>
          </div>
          <div>
            [+] Déballage de l&apos;architecture Next.js 15 App Router...{" "}
            <span className="text-primary-container">✓</span>
          </div>
          <div>
            [+] Configuration Prisma ORM + PostgreSQL multi-schémas...{" "}
            <span className="text-primary-container">✓</span>
          </div>
          <div>
            [+] Branchement Stripe Billing & Webhooks idémpotents...{" "}
            <span className="text-primary-container">✓</span>
          </div>
          <div>
            [+] Injection de l&apos;Agent IA & Prompt Chains contextuels...{" "}
            <span className="text-primary-container">✓</span>
          </div>
          <div className="p-space-sm bg-surface-container-high rounded-lg text-primary-container font-code text-code-snippet mt-space-md">
            &gt; Prêt ! Démarrez avec: cd my-enterprise-saas &amp;&amp; pnpm dev (Port 3000)
          </div>
          <div className="pt-space-md flex flex-wrap gap-2">
            {techBadges.map((b) => (
              <span
                key={b}
                className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-md flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm font-semibold text-primary-container uppercase tracking-wider">
              Topologie Scaffolding
            </span>
            <span className="font-body-sm text-body-sm text-secondary-fixed-dim">
              0 latency init
            </span>
          </div>
          <div className="py-2">
            <TopologySVG />
          </div>
          <div className="mt-space-sm pt-space-xs text-secondary-fixed-dim font-body-sm text-body-sm flex items-center justify-between">
            <span>Temps moyen d&apos;injection</span>
            <span className="font-code text-code-snippet text-on-surface font-semibold">
              &lt; 18.4s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}