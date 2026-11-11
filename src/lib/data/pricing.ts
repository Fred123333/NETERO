export interface Plan {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  ribbon?: string;
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Community Free",
    price: "0 €",
    priceSuffix: "/ pour toujours",
    description:
      "Pour tester la mécanique et construire de petits prototypes personnels.",
    features: [
      "3 boilerplates open-source complets",
      "CLI basique de scaffolding local",
      "Documentation technique publique",
      "Accès à la communauté Discord",
    ],
    cta: "Cloner le starter gratuit",
  },
  {
    id: "monthly",
    name: "Pro Mensuel",
    price: "29 €",
    priceSuffix: "/ mois",
    description:
      "L'accès complet à tous les boilerplates et au générateur IA, sans engagement.",
    features: [
      "Accès aux 14 boilerplates actuels",
      "Générateur d'applications IA illimité",
      "Modules entreprise (SAML, Stripe Connect)",
      "Mises à jour continues",
      "Support Discord prioritaire",
      "Résiliable à tout moment",
    ],
    cta: "S'abonner au mensuel",
    highlighted: true,
    ribbon: "FLEXIBLE • SANS ENGAGEMENT",
  },
  {
    id: "lifetime",
    name: "Pro All-Access",
    price: "299 €",
    priceSuffix: "/ paiement unique",
    description:
      "Tout ce dont un indépendant ou une équipe a besoin pour dominer son marché.",
    features: [
      "Accès à l'intégralité des 14 boilerplates actuels et à venir",
      "Générateur d'applications IA illimité via CLI & Hub web",
      "Modules entreprise : SAML SSO, Stripe Connect, multi-orgs",
      "Mises à jour de code garanties à vie (Next.js 16, React 19)",
      "Canal privé de support dédié et revues d'architecture",
      "Licence à vie, paiement unique",
    ],
    cta: "Obtenir l'accès à vie",
  },
];