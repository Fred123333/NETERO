import { notFound } from "next/navigation";
import {
  Zap,
  ShieldCheck,
  Waves,
  CreditCard,
  Lock,
  Database,
  Palette,
  Activity,
  FolderArchive,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ImageGallery } from "@/components/marketing/ImageGallery";
import { CodeTree } from "@/components/marketing/CodeTree";
import { BoilerplateSidebar } from "@/components/marketing/BoilerplateSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { boilerplateDetails } from "@/lib/data/boilerplate-details";

const iconMap = {
  stream: Waves,
  payments: CreditCard,
  lock: Lock,
  database: Database,
  palette: Palette,
  monitoring: Activity,
} as const;

/**
 * generateStaticParams — prérendu statique de chaque boilerplate connu.
 * Ajoute de nouvelles entrées dans boilerplate-details.ts → elles seront
 * prérendues automatiquement au prochain build, sans rien changer ici.
 */
export function generateStaticParams() {
  return Object.keys(boilerplateDetails).map((id) => ({ id }));
}

export default async function BoilerplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = boilerplateDetails[id];
  if (!detail) notFound();

  return (
    <div className="w-full max-w-7xl mx-auto px-gutter py-space-lg">
      <Breadcrumb
        items={[
          { label: "Boilerplates", href: "/boilerplates" },
          { label: detail.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* En-tête */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                <Zap size={13} className="text-[#FFD700]" />
                Next.js 15 App Router
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {detail.version} ({detail.lastUpdate})
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-outline-variant">
                <ShieldCheck size={13} className="text-on-surface-variant" />
                {detail.license}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              {detail.name}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {detail.subtitle}
            </p>
          </div>

          {/* Galerie (client component) */}
          <ImageGallery items={detail.gallery} />

          {/* Tabs (client component) */}
          <Tabs defaultValue="apercu" className="w-full" orientation="vertical">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-space-lg">
              <TabsList className="flex flex-col items-stretch gap-1 bg-transparent p-0 h-auto w-full">
                <TabsTrigger
                  value="apercu"
                  className="justify-start px-space-md py-2.5 rounded-lg font-label-md text-label-md text-left data-[state=active]:bg-surface-container-highest data-[state=active]:text-on-surface data-[state=active]:font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  Aperçu & Fonctionnalités
                </TabsTrigger>
                <TabsTrigger
                  value="architecture"
                  className="justify-start px-space-md py-2.5 rounded-lg font-label-md text-label-md text-left data-[state=active]:bg-surface-container-highest data-[state=active]:text-on-surface data-[state=active]:font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  Architecture & Structure
                </TabsTrigger>
                <TabsTrigger
                  value="documentation"
                  className="justify-start px-space-md py-2.5 rounded-lg font-label-md text-label-md text-left data-[state=active]:bg-surface-container-highest data-[state=active]:text-on-surface data-[state=active]:font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  Documentation
                </TabsTrigger>
                <TabsTrigger
                  value="changelog"
                  className="justify-start px-space-md py-2.5 rounded-lg font-label-md text-label-md text-left data-[state=active]:bg-surface-container-highest data-[state=active]:text-on-surface data-[state=active]:font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  Changelog ({detail.version})
                </TabsTrigger>
              </TabsList>

              <div className="min-w-0">
                <TabsContent value="apercu" className="mt-0 flex flex-col gap-space-lg">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Fonctionnalités Incluses
                      </h2>
                      <span className="font-code text-code-snippet text-on-surface-variant font-medium">
                        {detail.features.length} modules prêts au déploiement
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {detail.features.map((f) => {
                        const Icon = iconMap[f.icon];
                        return (
                          <div
                            key={f.title}
                            className="p-space-md rounded-xl flex flex-col gap-space-xs bg-surface-container border border-outline-variant/20"
                          >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#FFD700] bg-surface-container-highest">
                              <Icon size={20} />
                            </div>
                            <h3 className="font-label-md text-label-md font-semibold text-on-surface">
                              {f.title}
                            </h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                              {f.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Structure de Code du Projet
                      </h2>
                      <span className="font-code text-code-snippet text-[#FFD700] flex items-center gap-1">
                        <FolderArchive size={14} />
                        Clean Architecture standard
                      </span>
                    </div>
                    <CodeTree />
                  </div>

                  <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Prérequis & Stack Technique
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Pensé pour être déployé en 1 clic sur Vercel, Railway ou un VPS
                      auto-hébergé avec Docker Compose inclus.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
                      {detail.stack.map((s) => (
                        <div
                          key={s.label}
                          className="p-space-sm rounded-lg flex flex-col bg-surface-container-highest border border-outline-variant/20"
                        >
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {s.label}
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="architecture" className="mt-0">
                  <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm border border-outline-variant/20">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Architecture Fluctuation & Edge Streaming
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Le flux d'inférence s'exécute directement sur l'Edge Runtime de
                      Next.js pour réduire la latence réseau à moins de 15ms. Les jetons
                      consommés sont décomptés de façon asynchrone par un job worker afin
                      de ne jamais bloquer la réponse de l'utilisateur.
                    </p>
                    <div className="p-space-sm bg-surface-container-lowest rounded-lg font-code text-code-snippet text-on-surface-variant whitespace-pre-wrap">
                      {`Client UI ──► Edge Route Handler ──► Anthropic/OpenAI API (SSE Stream)
                  └──► Prisma Async Batcher ──► PostgreSQL (Ledger Débit)`}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documentation" className="mt-0">
                  <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm border border-outline-variant/20">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Guide de démarrage rapide
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Une documentation exhaustive de 45 pages couvre la création des clés
                      d'API Stripe, la configuration du DNS personnalisé et le déploiement
                      sur Vercel sans accroc.
                    </p>
                    <div className="flex items-center gap-space-sm pt-space-xs">
                      <FolderArchive size={20} className="text-[#FFD700]" />
                      <span className="font-label-md text-label-md text-on-surface font-medium">
                        Manuel accessible immédiatement après acquisition
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="changelog" className="mt-0">
                  <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-label-md font-bold text-on-surface">
                        Version 3.2.0
                      </span>
                      <span className="text-body-sm font-code text-on-surface-variant">
                        Déployé hier
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                      <li>
                        Mise à niveau vers Next.js 15.0 stable avec React 19 canary
                        support.
                      </li>
                      <li>
                        Ajout du connecteur Claude 3.5 Sonnet avec extraction de
                        métadonnées de tokens.
                      </li>
                      <li>
                        Optimisation de la table de cache Prisma pour réduction de 40% des
                        requêtes en base.
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>

        <BoilerplateSidebar
          priceSolo={detail.priceSolo}
          priceAgency={detail.priceAgency}
          cliCommand={detail.cliCommand}
        />
      </div>
    </div>
  );
}