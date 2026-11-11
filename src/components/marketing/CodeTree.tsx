import { Folder, FolderArchive, FileCode } from "lucide-react";

type Line =
  | { type: "folder"; depth: number; name: string; comment: string; bold?: boolean }
  | { type: "file"; depth: number; name: string; comment: string };

const lines: Line[] = [
  { type: "folder", depth: 0, name: "app/", comment: "App router, API routes, streaming SSE handlers", bold: true },
  { type: "file", depth: 1, name: "api/chat/route.ts", comment: "Vercel AI SDK Core streaming engine" },
  { type: "file", depth: 1, name: "api/webhooks/stripe/", comment: "Traitement automatisé des événements de facturation" },
  { type: "file", depth: 1, name: "(dashboard)/copilot/", comment: "Espace de travail conversationnel et historique" },
  { type: "folder", depth: 0, name: "components/", comment: "Shadcn UI customisé, AI prompt input, streaming bubble", bold: true },
  { type: "file", depth: 1, name: "ai-input.tsx", comment: "Champ extensible avec support d'upload de fichiers" },
  { type: "file", depth: 1, name: "message-stream.tsx", comment: "Markdown enrichi avec coloration syntaxique Prism" },
  { type: "folder", depth: 0, name: "lib/", comment: "Stripe webhooks, Prisma client, AI orchestration", bold: true },
  { type: "file", depth: 1, name: "ai-router.ts", comment: "Multi-provider fallback & retry policy logic" },
  { type: "file", depth: 1, name: "tokens-budget.ts", comment: "Calcul et déduction en direct des quotas utilisateur" },
  { type: "folder", depth: 0, name: "prisma/", comment: "schema.prisma optimisé multitenant & quotas", bold: true },
];

export function CodeTree() {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-space-md font-code text-code-snippet overflow-x-auto shadow-2xl border border-outline-variant/20">
      <div className="flex items-center justify-between pb-space-sm mb-space-sm text-on-surface-variant text-body-sm border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error/80" />
          <span className="w-3 h-3 rounded-full bg-[#FFD700]/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-on-surface text-[12px]">
            netero-saas-copilot/
          </span>
        </div>
        <span className="text-[11px] text-on-surface-variant">TypeScript 5.6</span>
      </div>
      <div className="space-y-1 text-on-surface">
        {lines.map((l, i) => {
          const isFolder = l.type === "folder";
          const Icon = isFolder ? (isFolder && l.bold ? FolderArchive : Folder) : FileCode;
          const isLast = i === lines.length - 1;
          const indent = l.depth > 0 ? "pl-6" : "";
          const prefix = l.depth > 0 ? "│  ├── " : isLast ? "└── " : "├── ";
          return (
            <div key={i} className={`flex items-center ${indent}`}>
              <span className="text-on-surface-variant select-none whitespace-pre">
                {prefix}
              </span>
              <Icon
                size={15}
                className={`mr-1.5 shrink-0 ${
                  isFolder ? "text-[#FFD700]" : "text-on-surface-variant"
                }`}
              />
              <span className={isFolder && l.bold ? "font-bold text-[#FFD700]" : ""}>
                {l.name}
              </span>
              <span className="ml-2 text-on-surface-variant text-[11px]">
                // {l.comment}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}