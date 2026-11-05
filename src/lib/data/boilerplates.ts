export interface Boilerplate {
  id: string;
  name: string;
  description: string;
  image: string;
  badge: "FREE" | "PREMIUM";
  rating: number;
  price: string;
  ctaVariant: "primary" | "ghost";
  tags: string[];
}

export const boilerplates: Boilerplate[] = [
  {
    id: "saas-ai-copilot",
    name: "SaaS AI Copilot Starter",
    description:
      "L'ossature idéale pour lancer un micro-SaaS d'IA générative : chat avec streaming tokens, upload de PDF vectorisés et souscription mensuelle Stripe.",
    image: "/images/boilerplate-saas-ai.png",
    badge: "FREE",
    rating: 4.9,
    price: "0 €",
    ctaVariant: "ghost",
    tags: ["Next.js 15", "OpenAI SDK", "Supabase", "Stripe"],
  },
  {
    id: "multi-tenant-b2b",
    name: "Multi-Tenant B2B Enterprise",
    description:
      "Conçu pour les contrats élevés : authentification SAML/SSO via WorkOS, audit log complet, espaces de travail séparés et emails transactionnels Resend.",
    image: "/images/boilerplate-b2b-enterprise.png",
    badge: "PREMIUM",
    rating: 5.0,
    price: "Inclus Pro",
    ctaVariant: "primary",
    tags: ["WorkOS SSO", "Prisma", "PostgreSQL", "Resend"],
  },
  {
    id: "marketplace-digital-goods",
    name: "Marketplace & Digital Goods",
    description:
      "Plateforme marketplace clés en main : division de paiements Stripe Connect, stockage privé sur Cloudflare R2 et gestion des licences instantanée.",
    image: "/images/boilerplate-marketplace.png",
    badge: "PREMIUM",
    rating: 4.95,
    price: "Inclus Pro",
    ctaVariant: "primary",
    tags: ["Stripe Connect", "Cloudflare R2", "Zod Schema", "LemonSqueezy"],
  },
];