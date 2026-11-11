export interface TemplateTag {
  icon: string;
  label: string;
}

export interface Template {
  name: string;
  description: string;
  tags: TemplateTag[];
  image: string;
  category: string;
  popular: boolean;
  slug: string;
  demoUrl: string;
  badge?: string;
  badgeType?: "primary" | "secondary" | "neutral";
  categoryLabel?: string;
  rating?: number | string;
  reviews?: number | string;
  price?: string;
  priceLabel?: string;
}

export const templates: Template[] = [
  {
    name: "BookShelf",
    description:
      "Votre bibliothèque numérique Des e-books de qualité, accessibles instantanément. Lecture simplifiée, contenu exceptionnel.",
    tags: [
      { icon: "code", label: "NextJs" },
      { icon: "style", label: "Tailwind CSS" },
      { icon: "sparkles", label: "Lucide React" },
    ],
    image: "/images/1.png",
    category: "E-commerce",
    popular: true,
    slug: "bookshelf",
    demoUrl: "https://bookshelf-seven-sooty.vercel.app/",
    badge: "Populaire",
    badgeType: "primary",
    categoryLabel: "E-commerce",
    rating: 4.9,
    reviews: 248,
    price: "149€",
    priceLabel: "Licence",
  },
  {
    name: "Stratégie Réseaux Sociaux",
    description:
      "Campagne complète de gestion et création de contenu pour une marque de luxe, augmentant l'engagement de 300%.",
    tags: [
      { icon: "share", label: "Social Media" },
      { icon: "file-text", label: "Content" },
      { icon: "bar-chart", label: "Analytics" },
    ],
    image: "/images/2.jpg",
    category: "Marketing Digital",
    popular: false,
    slug: "strategie-reseaux-sociaux",
    demoUrl: "#",
    badge: "Nouveau",
    badgeType: "secondary",
    categoryLabel: "Marketing Digital",
    rating: 4.7,
    reviews: 96,
    price: "0€",
    priceLabel: "Free",
  },
  {
    name: "SynergERP",
    description:
      "Système de gestion intégré pour une PME avec automatisation des processus clés et reporting en temps réel.",
    tags: [
      { icon: "layers", label: "ERP" },
      { icon: "settings", label: "Automation" },
      { icon: "layout-dashboard", label: "Dashboard" },
    ],
    image: "/images/3.jpg",
    category: "Automatisation",
    popular: false,
    slug: "synergerp",
    demoUrl: "#",
    categoryLabel: "Automatisation",
    rating: 4.8,
    reviews: 112,
    price: "199€",
    priceLabel: "Licence",
  },
  {
    name: "Application Mobile",
    description:
      "Application mobile native pour la gestion de services à domicile avec géolocalisation et paiement intégré.",
    tags: [
      { icon: "smartphone", label: "React Native" },
      { icon: "mobile", label: "Mobile" },
      { icon: "map-pin", label: "GPS" },
    ],
    image: "/images/4.jpg",
    category: "Développement",
    popular: false,
    slug: "application-mobile",
    demoUrl: "#",
    categoryLabel: "Développement",
    rating: 4.6,
    reviews: 78,
    price: "249€",
    priceLabel: "Licence",
  },
  {
    name: "GlobalSolution & Services",
    description:
      "Site web moderne et responsive pour une entreprise de logistique et transport avec animations fluides et design.",
    tags: [
      { icon: "code", label: "Next.js" },
      { icon: "monitor", label: "Responsive" },
      { icon: "play", label: "Animation" },
    ],
    image: "/images/5.png",
    category: "Web Design",
    popular: false,
    slug: "globalsolution-services",
    demoUrl: "#",
    categoryLabel: "Web Design",
    rating: 4.9,
    reviews: 201,
    price: "129€",
    priceLabel: "Licence",
  },
  {
    name: "Lukia",
    description:
      "Chatbot intelligent pour le service client avec traitement du langage naturel et intégration CRM.",
    tags: [
      { icon: "bot", label: "AI" },
      { icon: "message-square", label: "NLP" },
      { icon: "bot", label: "Chatbot" },
    ],
    image: "/images/6.png",
    category: "IA",
    popular: true,
    slug: "lukia",
    demoUrl: "#",
    badge: "Populaire",
    badgeType: "primary",
    categoryLabel: "IA",
    rating: 5.0,
    reviews: 319,
    price: "179€",
    priceLabel: "Licence",
  },
  {
    name: "Marketplace B2B",
    description:
      "Plateforme de mise en relation entre fournisseurs et acheteurs avec système de notation et paiement sécurisé.",
    tags: [
      { icon: "store", label: "Marketplace" },
      { icon: "briefcase", label: "B2B" },
      { icon: "credit-card", label: "Payment" },
    ],
    image: "/images/7.jpg",
    category: "E-commerce",
    popular: false,
    slug: "marketplace-b2b",
    demoUrl: "#",
    badge: "Premium",
    badgeType: "secondary",
    categoryLabel: "E-commerce",
    rating: 4.8,
    reviews: 143,
    price: "199€",
    priceLabel: "Licence",
  },
  {
    name: "Campagne SEO",
    description:
      "Optimisation complète du référencement naturel pour un site e-commerce, augmentant le trafic de 250%.",
    tags: [
      { icon: "search", label: "SEO" },
      { icon: "bar-chart", label: "Analytics" },
      { icon: "file-text", label: "Content" },
    ],
    image: "/images/8.jpg",
    category: "Marketing Digital",
    popular: false,
    slug: "campagne-seo",
    demoUrl: "#",
    categoryLabel: "Marketing Digital",
    rating: 4.7,
    reviews: 88,
    price: "0€",
    priceLabel: "Free",
  },
  {
    name: "Système CRM",
    description:
      "Solution CRM personnalisée pour la gestion de la relation client avec automatisation des ventes.",
    tags: [
      { icon: "users", label: "CRM" },
      { icon: "trending-up", label: "Sales" },
      { icon: "settings", label: "Automation" },
    ],
    image: "/images/9.jpg",
    category: "Automatisation",
    popular: false,
    slug: "systeme-crm",
    demoUrl: "#",
    badge: "Bundle",
    badgeType: "secondary",
    categoryLabel: "Automatisation",
    rating: 4.9,
    reviews: 167,
    price: "299€",
    priceLabel: "Licence",
  },
];
