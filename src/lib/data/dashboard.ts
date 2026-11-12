export type Tone = "success" | "warning" | "info" | "neutral" | "danger";

export interface BoilerplateItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  rating: string;
  reviews: number;
  badge?: string;
  version: string;
  price: string;
}

export const dashboardBoilerplates: BoilerplateItem[] = [
  {
    id: "saas-ai-copilot",
    category: "IA & Copilotes",
    title: "SaaS AI Copilot Starter",
    description:
      "Stack de référence avec chat en streaming, persistance vectorielle pgvector, facturation Stripe unifiée et webhooks pré-configurés.",
    tags: ["Next.js 15", "AI SDK", "pgvector", "Stripe"],
    rating: "4.9",
    reviews: 142,
    badge: "Populaire",
    version: "v3.2.0",
    price: "Inclus Pro",
  },
  {
    id: "b2b-multi-tenant",
    category: "SaaS B2B",
    title: "B2B Multi-Tenant Platform",
    description:
      "Isolation de bases de données par sous-domaine, contrôle d'accès granulaire RBAC, audit logs et intégration SAML SSO.",
    tags: ["Next.js 15", "Prisma", "RBAC"],
    rating: "4.8",
    reviews: 98,
    version: "v2.1.0",
    price: "Inclus Pro",
  },
  {
    id: "nexus-enterprise",
    category: "SaaS B2B",
    title: "Nexus Enterprise Engine",
    description:
      "Architecture multi-tenant avec gestion des équipes, rôles RBAC granulaires et routing subdomain dynamique.",
    tags: ["Stripe", "Tailwind v4", "Turborepo"],
    rating: "4.9",
    reviews: 89,
    version: "v1.8.0",
    price: "Inclus Pro",
  },
  {
    id: "orbit-micro-gateway",
    category: "Micro-services",
    title: "Orbit Micro-Gateway",
    description:
      "Passerelle d'API Edge distribuée intégrant limitation de débit Upstash Redis, validation JWT et documentation OpenAPI.",
    tags: ["Edge Runtime", "Upstash", "OpenAPI"],
    rating: "4.7",
    reviews: 73,
    version: "v0.9.0",
    price: "Inclus Pro",
  },
  {
    id: "aura-headless-commerce",
    category: "E-commerce",
    title: "Aura Headless Commerce",
    description:
      "Expérience d'achat ultra-rapide (<100ms) avec rendu dynamique ISR, recherche Algolia et paiement Apple Pay.",
    tags: ["Next.js 15", "Stripe", "Algolia"],
    rating: "4.8",
    reviews: 61,
    version: "v2.0.0",
    price: "Inclus Pro",
  },
  {
    id: "cognitive-agent",
    category: "IA & Copilotes",
    title: "Cognitive Agent Starter",
    description:
      "Copilote autonome avec streaming temps réel, vector database pgvector et orchestration d'agents LangChain.",
    tags: ["AI SDK", "Prisma", "pgvector"],
    rating: "4.9",
    reviews: 115,
    version: "v1.4.0",
    price: "Inclus Pro",
  },
  {
    id: "collab-space-hub",
    category: "SaaS B2B",
    title: "Collab Space Hub",
    description:
      "Isolation par Organisation ID, switch d'équipe instantané, invitations sécurisées et quotas d'abonnements.",
    tags: ["Next.js 15", "Supabase", "Auth"],
    rating: "4.8",
    reviews: 52,
    version: "v1.2.0",
    price: "Inclus Pro",
  },
  {
    id: "vectordoc-rag",
    category: "IA & Copilotes",
    title: "VectorDoc RAG Suite",
    description:
      "Pipeline complet de parsing PDF/Docx, génération d'embeddings asynchrones et recherche sémantique.",
    tags: ["Next.js 15", "Inngest", "pgvector"],
    rating: "4.7",
    reviews: 44,
    version: "v1.0.0",
    price: "Inclus Pro",
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  version: string;
  description: string;
  stack: string[];
  status: string;
  tone: Tone;
  date: string;
}

export const dashboardProjects: ProjectItem[] = [
  {
    id: "pulse-ai-copilot",
    name: "pulse-ai-copilot",
    category: "IA Agentic",
    version: "v1.4",
    description:
      "Moteur d'assistance contextuelle pour développeurs avec embeddings vectoriels et streaming SSE.",
    stack: ["Next.js 15", "Supabase", "LangChain", "Tailwind"],
    status: "Déployé Vercel",
    tone: "success",
    date: "Hier",
  },
  {
    id: "nexus-commerce",
    name: "nexus-commerce-er",
    category: "E-commerce",
    version: "v2.0",
    description:
      "Plateforme e-commerce modulaire à haute performance avec gestion multi-devises et panier persistant.",
    stack: ["Next.js 15", "Stripe Billing", "Prisma ORM"],
    status: "Déployé Vercel",
    tone: "success",
    date: "Il y a 2 jours",
  },
  {
    id: "soloflow-crm",
    name: "soloflow-crm",
    category: "Micro-SaaS",
    version: "v1.1",
    description:
      "CRM ultra-léger pour freelances et solopreneurs avec génération automatique de devis et factures.",
    stack: ["Next.js 15", "Supabase", "Zod", "Shadcn/UI"],
    status: "Local Staging",
    tone: "info",
    date: "Il y a 3 jours",
  },
  {
    id: "synth-voice-api",
    name: "synth-voice-api",
    category: "IA Générative",
    version: "v0.4",
    description:
      "Passerelle API de clonage vocal et synthèse multilingue avec pipeline WebSockets à faible latence.",
    stack: ["FastAPI", "Next.js SDK", "Redis", "Docker"],
    status: "Déployé Vercel",
    tone: "success",
    date: "10 févr. 2025",
  },
  {
    id: "ledger-pay-flow",
    name: "ledger-pay-flow",
    category: "Fintech",
    version: "v0.0.3",
    description:
      "Infrastructure de réconciliation comptable instantanée avec passerelles SEPA instantané.",
    stack: ["Next.js 15", "PostgreSQL"],
    status: "Brouillon",
    tone: "neutral",
    date: "28 janv. 2025",
  },
  {
    id: "argos-b2b",
    name: "argos-b2b",
    category: "SaaS Enterprise",
    version: "v0.9",
    description:
      "Portail client B2B multi-organisations avec authentification SSO/SAML, logs d'audit et gestion des rôles.",
    stack: ["Next.js 15", "Clerk Auth", "Resend", "Turborepo"],
    status: "Staging",
    tone: "warning",
    date: "Il y a 3 jours",
  },
  {
    id: "infra-metrics",
    name: "infra-metrics",
    category: "DevTools",
    version: "v0.1.0",
    description:
      "Tableau de bord de monitoring de coûts Cloud AWS/GCP avec alertes prédictives et rapports.",
    stack: ["Next.js 15", "ClickHouse", "Tremor"],
    status: "Brouillon Local",
    tone: "neutral",
    date: "02 févr. 2025",
  },
];

export interface Invoice {
  date: string;
  reference: string;
  designation: string;
  amount: string;
  status: string;
  method: string;
}

export const invoices: Invoice[] = [
  {
    date: "14/10/2024",
    reference: "INV-2024-B841",
    designation: "Netero Pro All-Access (Licence Lifetime)",
    amount: "299,00 €",
    status: "Payé",
    method: "Visa •••• 4242",
  },
  {
    date: "02/09/2024",
    reference: "INV-2024-7102",
    designation: "Pack +100 Crédits Génération IA",
    amount: "29,00 €",
    status: "Payé",
    method: "Visa •••• 4242",
  },
];

export interface HistoryRun {
  project: string;
  category: string;
  prompt: string;
  stack: string[];
  date: string;
  cluster: string;
  status: string;
  tone: Tone;
  build: string;
  nodes: string;
  credits: number;
}

export const historyRuns: HistoryRun[] = [
  {
    project: "Argos-Portal v1.2",
    category: "DevOps SaaS",
    prompt:
      "Portail d'observabilité multi-tenant pour conteneurs Docker avec ingestion temps réel.",
    stack: ["Next.js 15", "App Router", "ClickHouse"],
    date: "À l'instant (14:38)",
    cluster: "Cluster GPU-A100-FR",
    status: "En cours",
    tone: "warning",
    build: "—",
    nodes: "1 420 AST",
    credits: 4,
  },
  {
    project: "TaskPulse-SaaS",
    category: "SaaS B2B",
    prompt:
      "Génération complète d'un SaaS de gestion de tâches avec Prisma ORM, abonnements Stripe et RBAC.",
    stack: ["Next.js 15", "PostgreSQL", "Stripe"],
    date: "Aujourd'hui à 14:32",
    cluster: "Cluster GPU-A100-FR",
    status: "Succès",
    tone: "success",
    build: "41.2s",
    nodes: "2 180 AST",
    credits: 5,
  },
  {
    project: "Pulse-Copilot v1.4",
    category: "IA Agentic",
    prompt: "Assistant IA génératif connecté aux API OpenAI et Anthropic avec streaming UI.",
    stack: ["Next.js 15", "Tailwind v4", "Redis"],
    date: "Hier à 18:20",
    cluster: "Cluster GPU-A100-FR",
    status: "Succès",
    tone: "success",
    build: "38.6s",
    nodes: "1 860 AST",
    credits: 4,
  },
  {
    project: "Nexus-Commerce v1.0",
    category: "Headless Shop",
    prompt: "Architecture e-commerce headless haute vélocité avec panier persistant Zustand.",
    stack: ["Next.js 15", "Supabase", "Algolia"],
    date: "Il y a 3 jours à 11:05",
    cluster: "Cluster GPU-A100-EU",
    status: "Succès",
    tone: "success",
    build: "52.1s",
    nodes: "2 420 AST",
    credits: 5,
  },
];

export const favoriteBoilerplates = dashboardBoilerplates.slice(0, 5);
