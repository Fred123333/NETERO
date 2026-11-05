export interface Plan {
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
    name: "Community Free",
    price: "0 €",
    priceSuffix: "/ pour toujours",
    description: "Pour tester la mécanique et construire de petits prototypes personnels.",
    features: [
      "3 boilerplates open-source complets",
      "CLI basique de scaffolding local",
      "Documentation technique publique",
      "Accès à la communauté Discord",
    ],
    cta: "Cloner le starter gratuit",
  },
  {
    name: "Pro All-Access",
    price: "299 €",
    priceSuffix: "/ paiement unique",
    description: "Tout ce dont un indépendant ou une équipe a besoin pour dominer son marché.",
    features: [
      "Accès à l'intégralité des 14 boilerplates actuels et à venir",
      "Générateur d'applications IA illimité via CLI & Hub web",
      "Modules entreprise : SAML SSO, Stripe Connect, multi-orgs",
      "Mises à jour de code garanties à vie (Next.js 16, React 19)",
      "Canal privé de support dédié et revues d'architecture",
    ],
    cta: "Obtenir l'accès à vie maintenant",
    highlighted: true,
    ribbon: "RECOMMANDÉ • OFFRE À VIE",
  },
];