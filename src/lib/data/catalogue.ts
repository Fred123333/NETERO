export type CatalogueTagIcon =
  | "code"
  | "briefcase"
  | "database"
  | "card"
  | "cloud"
  | "grid"
  | "cart"
  | "wind"
  | "shield"
  | "network"
  | "zap"
  | "boxes"
  | "file"
  | "search"
  | "layers";

export interface CatalogueTag {
  label: string;
  icon: CatalogueTagIcon;
}

export type CatalogueCategory =
  | "SaaS B2B"
  | "IA & Copilotes"
  | "E-commerce"
  | "Mobile-first"
  | "Micro-services";

export type CatalogueAccess = "Gratuit" | "Premium" | "Bundle";

export interface CatalogueBoilerplate {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: CatalogueTag[];
  rating: number;
  reviews: number;
  price: string;
  priceLabel: string;
  category: CatalogueCategory;
  access: CatalogueAccess;
  stacks: string[];
  popularity: number;
}

export const catalogueCategories: Array<"Tous" | CatalogueCategory> = [
  "Tous",
  "SaaS B2B",
  "IA & Copilotes",
  "E-commerce",
  "Mobile-first",
  "Micro-services",
];

export const catalogueAccess: Array<"Tous" | CatalogueAccess | "Bundles"> = [
  "Tous",
  "Gratuit",
  "Premium",
  "Bundles",
];

export const catalogueStacks = [
  "Next.js 15",
  "Supabase",
  "Prisma",
  "Tailwind CSS",
  "Stripe",
  "LangChain",
  "PostgreSQL",
];

export const catalogueBoilerplates: CatalogueBoilerplate[] = [
  {
    id: "saas-ai-matrix-starter",
    name: "SaaS AI Matrix Starter",
    description:
      "Template de référence pour micro-SaaS d'intelligence artificielle : streaming LLM tokens, mémoire sémantique et facturation à l'usage.",
    image: "/images/catalogue/saas-ai-matrix.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "OpenAI API", icon: "briefcase" },
      { label: "Supabase", icon: "database" },
      { label: "Stripe", icon: "card" },
    ],
    rating: 4.9,
    reviews: 248,
    price: "0€",
    priceLabel: "Free",
    category: "IA & Copilotes",
    access: "Gratuit",
    stacks: ["Next.js 15", "Supabase", "Stripe"],
    popularity: 98,
  },
  {
    id: "b2b-enterprise-multi-tenant",
    name: "B2B Enterprise Multi-Tenant",
    description:
      "Architecture multitenant prête pour les PME et grands comptes : sous-domaines automatisés, RBAC granulaire et facturation par siège.",
    image: "/images/catalogue/b2b-enterprise.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "Prisma", icon: "database" },
      { label: "PostgreSQL", icon: "database" },
      { label: "Auth.js", icon: "shield" },
    ],
    rating: 4.95,
    reviews: 94,
    price: "149€",
    priceLabel: "Licence",
    category: "SaaS B2B",
    access: "Premium",
    stacks: ["Next.js 15", "Prisma", "PostgreSQL"],
    popularity: 95,
  },
  {
    id: "digital-goods-marketplace",
    name: "Digital Goods Marketplace",
    description:
      "Plateforme de vente de produits digitaux & licences logicielles : Stripe Connect, stockage Cloudflare R2 et liens de téléchargement sécurisés.",
    image: "/images/catalogue/digital-goods.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "Stripe Connect", icon: "card" },
      { label: "Cloudflare R2", icon: "cloud" },
      { label: "Shadcn UI", icon: "grid" },
    ],
    rating: 4.8,
    reviews: 112,
    price: "129€",
    priceLabel: "Licence",
    category: "E-commerce",
    access: "Premium",
    stacks: ["Next.js 15", "Stripe"],
    popularity: 92,
  },
  {
    id: "micro-saas-quickstart-solo",
    name: "Micro-SaaS Quickstart Solo",
    description:
      "Conçu pour les indie hackers désirant expédier un MVP en un week-end : base SQLite distribuée, intégration paiements et déploiement en un clic.",
    image: "/images/catalogue/micro-saas.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "SQLite / Turso", icon: "database" },
      { label: "Lemonsqueezy", icon: "cart" },
      { label: "Tailwind", icon: "wind" },
    ],
    rating: 4.7,
    reviews: 319,
    price: "0€",
    priceLabel: "Free",
    category: "SaaS B2B",
    access: "Gratuit",
    stacks: ["Next.js 15", "Tailwind CSS"],
    popularity: 90,
  },
  {
    id: "autonomous-agent-platform",
    name: "Autonomous Agent Platform",
    description:
      "Orchestration complète d'agents autonomes avec pont Python FastAPI asynchrone, indexation vectorielle Pinecone et supervision des graphes.",
    image: "/images/catalogue/autonomous-agent.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "LangGraph", icon: "network" },
      { label: "FastAPI", icon: "zap" },
      { label: "Pinecone", icon: "boxes" },
    ],
    rating: 5.0,
    reviews: 38,
    price: "179€",
    priceLabel: "Licence",
    category: "IA & Copilotes",
    access: "Premium",
    stacks: ["Next.js 15", "LangChain"],
    popularity: 88,
  },
  {
    id: "devtools-docs-blog-engine",
    name: "DevTools Docs & Blog Engine",
    description:
      "Le socle optimal pour vos documentations techniques d'API : rendu MDX ultra-rapide, recherche Algolia instantanée et référencement optimisé.",
    image: "/images/catalogue/devtools-docs.png",
    tags: [
      { label: "Next.js 15", icon: "code" },
      { label: "MDX", icon: "file" },
      { label: "Algolia", icon: "search" },
      { label: "Contentlayer", icon: "layers" },
    ],
    rating: 4.85,
    reviews: 160,
    price: "0€",
    priceLabel: "Free",
    category: "Micro-services",
    access: "Gratuit",
    stacks: ["Next.js 15"],
    popularity: 85,
  },
];
