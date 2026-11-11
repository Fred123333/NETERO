export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  thumbLabel: string;
}

export interface Feature {
  icon:
    | "stream"
    | "payments"
    | "lock"
    | "database"
    | "palette"
    | "monitoring";
  title: string;
  description: string;
}

export interface BoilerplateDetail {
  id: string;
  name: string;
  version: string;
  lastUpdate: string;
  license: string;
  subtitle: string;
  gallery: GalleryItem[];
  features: Feature[];
  stack: { label: string; value: string }[];
  priceSolo: number;
  priceAgency: number;
  cliCommand: string;
}

export const boilerplateDetails: Record<string, BoilerplateDetail> = {
  "saas-ai-copilot": {
    id: "saas-ai-copilot",
    name: "SaaS AI Copilot Starter",
    version: "v3.2.0",
    lastUpdate: "Dernière màj hier",
    license: "Licence Commerciale Illimitée",
    subtitle:
      "L'architecture clé en main pour lancer un assistant IA monétisable avec streaming LLM, authentification et facturation Stripe. Conçu pour le déploiement immédiat en production.",
    gallery: [
      {
        src: "/images/placeholder-yellow.png",
        alt: "Dashboard SaaS AI Copilot Preview",
        caption: "Dashboard Actif : Workspace IA avec multi-modèles & streaming",
        thumbLabel: "Tableau de bord",
      },
      {
        src: "/images/placeholder-yellow.png",
        alt: "Paramètres Facturation",
        caption: "Console de gestion d'abonnements Stripe, facturation et crédits mensuels",
        thumbLabel: "Facturation Stripe",
      },
      {
        src: "/images/placeholder-yellow.png",
        alt: "Console Admin",
        caption: "Console d'administration multitenant, observabilité LLM et gestion des prompts",
        thumbLabel: "Console Admin",
      },
    ],
    features: [
      {
        icon: "stream",
        title: "Streaming SSE OpenAI & Claude",
        description:
          "Support complet de l'AI SDK Vercel avec rendu progressif en tokens, reconnexion automatique et fallback multi-modèles (GPT-4o, Claude 3.5 Sonnet).",
      },
      {
        icon: "payments",
        title: "Abonnements & Crédits Stripe",
        description:
          "Système de facturation récurrente, portail client préconfiguré, webhooks idempotents et rechargement de packs de tokens d'inférence.",
      },
      {
        icon: "lock",
        title: "Auth OAuth & Magic Links",
        description:
          "Authentification ultra-robuste avec NextAuth / Auth.js v5. Intégration GitHub, Google, email sans mot de passe et sessions chiffrées JWT.",
      },
      {
        icon: "database",
        title: "PostgreSQL & Migrations Prisma",
        description:
          "Schéma multitenant optimisé pour Supabase et Neon, relation organisationnelle, indexation vectorielle pgvector prête pour RAG.",
      },
      {
        icon: "palette",
        title: "Design System & Mode Sombre",
        description:
          "Composants Shadcn/UI personnalisés avec thématique Obsidian et dorures précises. Toggle ultra-rapide sans flash de contenu via Tailwind.",
      },
      {
        icon: "monitoring",
        title: "Analytics Intégrés & SEO",
        description:
          "Métriques OpenPanel / PostHog, génération dynamique d'images Open Graph, sitemap automatisé et conformité Core Web Vitals à 99+.",
      },
    ],
    stack: [
      { label: "Runtime", value: "Node.js 20+ LTS" },
      { label: "Framework", value: "Next.js 15 (Turbopack)" },
      { label: "Langage & UI", value: "React 19 & TS 5.6" },
      { label: "Base & ORM", value: "Prisma & Supabase" },
    ],
    priceSolo: 149,
    priceAgency: 299,
    cliCommand: "npx netero-cli clone saas-ai-copilot",
  },
};