import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  Globe,
  KeyRound,
  Laptop,
  Lock,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Terminal,
  Trash2,
  Webhook,
  Zap,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { Bar, PageHeader, Panel, PanelHeader, StatTile, StatusPill } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "API & CLI v2.4 — NETERO",
};

const commands = [
  { cmd: "netero login", description: "Authentifie la CLI via votre clé de licence." },
  { cmd: "netero clone <slug>", description: "Clone un boilerplate du catalogue." },
  { cmd: "netero generate", description: "Lance une génération IA depuis le prompt courant." },
  { cmd: "netero deploy", description: "Déploie le projet sur Vercel en production." },
  { cmd: "netero sync", description: "Synchronise le workspace local et les crédits." },
];

const snippets = [
  {
    label: "cURL",
    code: `curl https://api.netero.dev/v1/generations \\
  -H "Authorization: Bearer $NETERO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"template":"saas-ai-copilot","name":"my-app"}'`,
  },
  {
    label: "JavaScript",
    code: `import { Netero } from "@netero/sdk";

const netero = new Netero({ apiKey: process.env.NETERO_API_KEY });

const job = await netero.generations.create({
  template: "saas-ai-copilot",
  name: "my-app",
});`,
  },
  {
    label: "Python",
    code: `import os
from netero import Netero

client = Netero(api_key=os.environ["NETERO_API_KEY"])

job = client.generations.create(
    template="saas-ai-copilot",
    name="my-app",
)`,
  },
];

const apiKeys = [
  {
    name: "Production",
    masked: "netero_prod_live_••••••••8f2c",
    created: "14/10/2024",
    used: "il y a 2 min",
    status: "active" as const,
  },
  {
    name: "Development",
    masked: "netero_dev_test_••••••••91bd",
    created: "02/09/2024",
    used: "il y a 3 jours",
    status: "active" as const,
  },
  {
    name: "CI/CD",
    masked: "netero_ci_••••••••77ae",
    created: "10/08/2024",
    used: "—",
    status: "revoked" as const,
  },
];

const webhookEvents = ["generation.completed", "build.failed", "deployment.ready"];

const scopes = [
  "generations:write",
  "boilerplates:read",
  "projects:read",
  "deployments:write",
  "webhooks:manage",
];

const limits = [
  { label: "Requêtes aujourd'hui", value: "1 284 / 10 000", percent: 12.8 },
  { label: "Limite par minute", value: "82 / 120", percent: 68.3 },
  { label: "Webhooks actifs", value: "3 / 5", percent: 60 },
  { label: "Stockage artefacts", value: "12 / 50 Mo", percent: 24 },
];

export default function CliPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Workspace / Intégrations / API & CLI"
        title="API & CLI v2.4"
        description="Automatisez vos générations, clones et déploiements depuis votre terminal ou vos pipelines CI/CD. Gérez vos clés, webhooks et limites de l'API Netero."
        actions={
          <>
            <StatusPill tone="success">
              <CheckCircle2 size={11} />
              CLI connectée
            </StatusPill>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2.5 font-label-md text-label-md font-semibold text-[#171717] transition-transform hover:bg-[#e9c400] active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              Générer une clé
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Requêtes aujourd'hui" value="1 284" hint="sur 10 000 autorisées" icon={<Activity size={16} />} accent />
        <StatTile label="Latence moyenne" value="86 ms" hint="p95 sur 24 h" icon={<Zap size={16} />} />
        <StatTile label="Version CLI" value="v2.4.1" hint="à jour" icon={<Terminal size={16} />} />
        <StatTile label="Dernière sync" value="14 min" hint="macbook-pro-alexandre" icon={<RefreshCw size={16} />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Connexion CLI"
              description="Votre terminal est authentifié sur ce workspace."
              icon={<Terminal size={18} />}
              action={<StatusPill tone="success">En ligne</StatusPill>}
            />
            <div className="p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: "Appareil", value: "macbook-pro-alexandre.local", icon: Laptop },
                  { label: "Version", value: "netero-cli v2.4.1", icon: Cpu },
                  { label: "Dernière sync", value: "il y a 14 minutes", icon: Clock },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-3"
                    >
                      <div className="flex items-center gap-1.5 font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
                        <Icon size={12} className="text-[#FFD700]" />
                        {row.label}
                      </div>
                      <div className="mt-1.5 truncate font-code text-[11px] text-on-surface">{row.value}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <CopyButton text="npm install -g @netero/cli" label="Installer la CLI :" />
                <CopyButton text="netero login" label="S'authentifier :" />
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Démarrage rapide API"
              description="Base URL : https://api.netero.dev/v1"
              icon={<Code2 size={18} />}
              action={<StatusPill tone="info">REST + JSON</StatusPill>}
            />
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                {snippets.map((s, i) => (
                  <span
                    key={s.label}
                    className={
                      i === 0
                        ? "rounded-lg bg-[#FFD700]/10 px-3 py-1.5 font-label-sm text-[11px] font-semibold text-[#FFD700]"
                        : "cursor-pointer rounded-lg px-3 py-1.5 font-label-sm text-[11px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                    }
                  >
                    {s.label}
                  </span>
                ))}
              </div>
              <pre className="overflow-x-auto rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-4 font-code text-[11px] leading-relaxed text-on-surface-variant">
                <code>{snippets[0].code}</code>
              </pre>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <CopyButton
                  text="netero_prod_live_8f2c91bd4a77ae102f6c3d9b"
                  label="Clé API de test :"
                />
                <CopyButton
                  text={snippets[0].code}
                  label="Copier l'exemple cURL :"
                />
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Clés API"
              description="Créez, faites tourner ou révoquez vos identifiants."
              icon={<KeyRound size={18} />}
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-2.5 py-1.5 font-label-sm text-[11px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
                >
                  <Plus size={12} />
                  Nouvelle clé
                </button>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
                    <th className="px-5 py-2.5 font-semibold">Nom</th>
                    <th className="px-5 py-2.5 font-semibold">Clé</th>
                    <th className="hidden px-5 py-2.5 font-semibold md:table-cell">Créée le</th>
                    <th className="hidden px-5 py-2.5 font-semibold lg:table-cell">Dernière utilisation</th>
                    <th className="px-5 py-2.5 font-semibold">Statut</th>
                    <th className="px-5 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {apiKeys.map((k) => (
                    <tr key={k.name} className="font-body-sm text-[12px]">
                      <td className="whitespace-nowrap px-5 py-3 font-semibold text-on-surface">{k.name}</td>
                      <td className="whitespace-nowrap px-5 py-3 font-code text-[10px] text-on-surface-variant">
                        {k.masked}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-on-surface-variant md:table-cell">
                        {k.created}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-on-surface-variant lg:table-cell">
                        {k.used}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill tone={k.status === "active" ? "success" : "neutral"}>
                          {k.status === "active" ? "Active" : "Révoquée"}
                        </StatusPill>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            aria-label="Faire tourner la clé"
                            disabled={k.status === "revoked"}
                            className="rounded-lg border border-outline-variant/30 p-1.5 text-on-surface-variant transition-colors hover:border-[#FFD700]/40 hover:text-[#FFD700] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <RefreshCw size={12} />
                          </button>
                          <button
                            type="button"
                            aria-label="Révoquer la clé"
                            disabled={k.status === "revoked"}
                            className="rounded-lg border border-outline-variant/30 p-1.5 text-on-surface-variant transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 border-t border-outline-variant/20 px-5 py-3 font-body-sm text-[11px] text-on-surface-variant">
              <Lock size={13} className="text-emerald-400" />
              Les clés sont chiffrées au repos. Ne les partagez jamais dans un dépôt public.
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Webhooks"
              description="Recevez des événements signés sur votre endpoint."
              icon={<Webhook size={18} />}
              action={<StatusPill tone="success">3 actifs</StatusPill>}
            />
            <div className="space-y-4 p-5">
              <CopyButton
                text="https://api.netero.dev/v1/webhooks/alpha"
                label="Endpoint de réception :"
              />
              <div>
                <p className="mb-2 font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Événements abonnés
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {webhookEvents.map((e) => (
                    <span
                      key={e}
                      className="rounded border border-outline-variant/30 bg-surface-container-lowest px-2 py-1 font-code text-[10px] text-on-surface-variant"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <CopyButton
                text="whsec_8f2c91bd4a77ae102f6c3d9b"
                label="Secret de signature :"
              />
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Limites & quotas" icon={<Activity size={18} />} />
            <div className="space-y-4 p-5">
              {limits.map((l) => (
                <div key={l.label}>
                  <div className="flex items-center justify-between font-body-sm text-[12px]">
                    <span className="text-on-surface-variant">{l.label}</span>
                    <span className="font-semibold text-on-surface">{l.value}</span>
                  </div>
                  <div className="mt-1.5">
                    <Bar value={l.percent} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Scopes & permissions" icon={<ShieldCheck size={18} />} />
            <ul className="space-y-2.5 p-5">
              {scopes.map((s) => (
                <li key={s} className="flex items-center gap-2 font-code text-[11px] text-on-surface-variant">
                  <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Commandes CLI" icon={<Terminal size={18} />} />
            <div className="divide-y divide-outline-variant/15">
              {commands.map((c) => (
                <div key={c.cmd} className="px-5 py-2.5">
                  <div className="font-code text-[11px] font-semibold text-[#FFD700]">{c.cmd}</div>
                  <div className="mt-0.5 font-body-sm text-[10px] text-on-surface-variant">
                    {c.description}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Documentation" icon={<BookOpen size={18} />} />
            <div className="divide-y divide-outline-variant/15">
              {["Guide de démarrage CLI", "Référence de l'API REST", "Exemples & SDK", "Changelog v2.4"].map(
                (d) => (
                  <div
                    key={d}
                    className="flex cursor-pointer items-center justify-between gap-2 px-5 py-3 transition-colors hover:bg-surface-container-high"
                  >
                    <span className="font-body-sm text-[12px] text-on-surface">{d}</span>
                    <ExternalLink size={12} className="text-on-surface-variant" />
                  </div>
                )
              )}
            </div>
          </Panel>

          <Panel className="border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/10 to-surface-container p-5">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#FFD700]" />
              <h3 className="font-label-md text-[13px] font-bold text-on-surface">Statut de l&apos;API</h3>
            </div>
            <div className="mt-3 flex items-center justify-between font-body-sm text-[12px]">
              <span className="text-on-surface-variant">Tous les services</span>
              <StatusPill tone="success">Opérationnels</StatusPill>
            </div>
            <div className="mt-2 flex items-center justify-between font-body-sm text-[12px]">
              <span className="text-on-surface-variant">Uptime 30 jours</span>
              <span className="font-semibold text-emerald-400">99,98 %</span>
            </div>
            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 font-label-sm text-[12px] font-semibold text-on-surface transition-colors hover:bg-surface-container-high cursor-pointer"
            >
              <Server size={13} />
              Voir la page de statut
              <ArrowRight size={13} />
            </button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
