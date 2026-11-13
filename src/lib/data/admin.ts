export type AdminTone = "success" | "warning" | "danger" | "info" | "neutral";

export interface AdminKpi {
  label: string;
  value: string;
  hint?: string;
  trend?: "up" | "down" | "flat";
  icon?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  initials: string;
  handle: string;
  role: string;
  email: string;
  plan: string;
  projects: number;
  joined: string;
  status: "Actif" | "Suspendu" | "En attente";
  twoFA: boolean;
  suspended?: boolean;
  gradient: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "user" | "payment" | "generation" | "key" | "subscription";
}

export interface RecentSubscription {
  client: string;
  email: string;
  plan: string;
  amount: string;
  date: string;
  status: "Actif" | "En attente";
}

export interface LicenseRow {
  id: string;
  client: string;
  email: string;
  plan: string;
  seats: string;
  license: string;
  start: string;
  end: string;
  amount: string;
  status: "Actif" | "Expiré" | "Annulé";
}

export interface PaymentRow {
  id: string;
  client: string;
  email: string;
  product: string;
  amount: string;
  method: string;
  date: string;
  status: "Réussi" | "Litige" | "Échoué";
}

export interface AdminBoilerplate {
  id: string;
  title: string;
  repo: string;
  category: string;
  stack: string[];
  version: string;
  tag: string;
  price: string;
  status: "Publié" | "Brouillon" | "Dépublié";
  clones: string;
  thumbnail: string;
}

export interface AiModel {
  id: string;
  name: string;
  engine: string;
  runtime: string;
  inputCost: string;
  outputCost: string;
  status: "En ligne" | "Dégradé" | "Hors ligne";
  uptime: string;
  fallback: string;
  enabled: boolean;
}

export interface AiConsumer {
  user: string;
  email: string;
  org: string;
  plan: string;
  projects: string;
  credits: string;
  perProject: string;
  success: string;
  last: string;
  pipeline: string;
}

export interface AdminProject {
  id: string;
  name: string;
  user: string;
  org: string;
  stack: string;
  status: "Déployé" | "Build" | "Échec";
  date: string;
  credits: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: AdminTone;
  read: boolean;
  category: "Système" | "Paiement" | "Sécurité" | "IA";
}

export interface AdminReport {
  id: string;
  title: string;
  generated: string;
  size: string;
  status: string;
}

export const overviewKpis: AdminKpi[] = [
  { label: "Utilisateurs totaux", value: "14 820", hint: "+12.4 % ce mois", trend: "up", icon: "users" },
  { label: "Actifs (DAU/MAU)", value: "3 410", hint: "68.0 % taux d'activité", trend: "up", icon: "activity" },
  { label: "Boilerplates", value: "24 modèles", hint: "3 en attente de revue", trend: "flat", icon: "layers" },
  { label: "Abonnés premium", value: "1 245", hint: "MRR 48.2k € récurrent", trend: "up", icon: "crown" },
  { label: "Générations IA", value: "48 930", hint: "99.8 % de succès", trend: "up", icon: "sparkles" },
  { label: "Revenus totaux", value: "348 200 €", hint: "+18.5 % YoY", trend: "up", icon: "euro" },
];

export const signupSeries: Record<string, { label: string; inscriptions: number; actifs: number }[]> = {
  "30j": [
    { label: "01 oct", inscriptions: 9100, actifs: 2680 },
    { label: "05 oct", inscriptions: 9480, actifs: 2760 },
    { label: "09 oct", inscriptions: 10020, actifs: 2840 },
    { label: "13 oct", inscriptions: 10560, actifs: 2910 },
    { label: "17 oct", inscriptions: 11180, actifs: 3010 },
    { label: "22 oct", inscriptions: 11890, actifs: 3120 },
    { label: "27 oct", inscriptions: 12400, actifs: 3220 },
    { label: "Aujourd'hui", inscriptions: 13020, actifs: 3410 },
  ],
  "90j": [
    { label: "S1", inscriptions: 7200, actifs: 2150 },
    { label: "S2", inscriptions: 7680, actifs: 2260 },
    { label: "S3", inscriptions: 8240, actifs: 2380 },
    { label: "S4", inscriptions: 8920, actifs: 2490 },
    { label: "S5", inscriptions: 9510, actifs: 2610 },
    { label: "S6", inscriptions: 10040, actifs: 2740 },
    { label: "S7", inscriptions: 10580, actifs: 2860 },
    { label: "S8", inscriptions: 11120, actifs: 2980 },
    { label: "S9", inscriptions: 11760, actifs: 3100 },
    { label: "S10", inscriptions: 12340, actifs: 3220 },
    { label: "S11", inscriptions: 12880, actifs: 3330 },
    { label: "Aujourd'hui", inscriptions: 13020, actifs: 3410 },
  ],
  "12m": [
    { label: "Nov", inscriptions: 6200, actifs: 1820 },
    { label: "Déc", inscriptions: 6810, actifs: 1960 },
    { label: "Jan", inscriptions: 7340, actifs: 2080 },
    { label: "Fév", inscriptions: 7980, actifs: 2210 },
    { label: "Mar", inscriptions: 8640, actifs: 2360 },
    { label: "Avr", inscriptions: 9310, actifs: 2480 },
    { label: "Mai", inscriptions: 10020, actifs: 2620 },
    { label: "Juin", inscriptions: 10680, actifs: 2760 },
    { label: "Juil", inscriptions: 11140, actifs: 2890 },
    { label: "Août", inscriptions: 11720, actifs: 3040 },
    { label: "Sept", inscriptions: 12380, actifs: 3210 },
    { label: "Oct", inscriptions: 13020, actifs: 3410 },
  ],
};

export const mrrSeries: Record<string, { label: string; mrr: number }[]> = {
  "6m": [
    { label: "Mai", mrr: 36200 },
    { label: "Juin", mrr: 38400 },
    { label: "Juil", mrr: 40100 },
    { label: "Août", mrr: 42600 },
    { label: "Sept", mrr: 45100 },
    { label: "Oct", mrr: 48250 },
  ],
  "12m": [
    { label: "Nov", mrr: 24800 },
    { label: "Déc", mrr: 26400 },
    { label: "Jan", mrr: 27900 },
    { label: "Fév", mrr: 29400 },
    { label: "Mar", mrr: 31200 },
    { label: "Avr", mrr: 33600 },
    { label: "Mai", mrr: 36200 },
    { label: "Juin", mrr: 38400 },
    { label: "Juil", mrr: 40100 },
    { label: "Août", mrr: 42600 },
    { label: "Sept", mrr: 45100 },
    { label: "Oct", mrr: 48250 },
  ],
  "24m": [
    { label: "T1 24", mrr: 14800 },
    { label: "T2 24", mrr: 18200 },
    { label: "T3 24", mrr: 21400 },
    { label: "T4 24", mrr: 24800 },
    { label: "T1 25", mrr: 27900 },
    { label: "T2 25", mrr: 33600 },
    { label: "T3 25", mrr: 40100 },
    { label: "T4 25", mrr: 48250 },
  ],
};

export const liveEvents: LiveEvent[] = [
  {
    id: "evt-1",
    title: "Nouvel utilisateur inscrit",
    detail: "marc.v@cloudarchitect.io via GitHub OAuth",
    time: "Il y a 2 min",
    kind: "user",
  },
  {
    id: "evt-2",
    title: "Paiement Stripe validé",
    detail: "Licence Pro Lifetime — tx_3N8a…92Z (199 €)",
    time: "Il y a 7 min",
    kind: "payment",
  },
  {
    id: "evt-3",
    title: "Génération Next.js terminée",
    detail: "Template SaaS Multi-tenant — Durée 1.4s",
    time: "Il y a 14 min",
    kind: "generation",
  },
  {
    id: "evt-4",
    title: "Nouvelle clé API générée",
    detail: "Token prc-d-server-ai-core (Scoped Read/Write)",
    time: "Il y a 28 min",
    kind: "key",
  },
  {
    id: "evt-5",
    title: "Souscription Pro All-Access",
    detail: "Organisation enterprise-devs — Renouvellement annuel",
    time: "Il y a 41 min",
    kind: "subscription",
  },
];

export const recentSubscriptions: RecentSubscription[] = [
  {
    client: "Alexandre Laurent",
    email: "a.laurent@synthex.tech",
    plan: "Pro All-Access",
    amount: "299 €",
    date: "Aujourd'hui 14:22",
    status: "Actif",
  },
  {
    client: "Sarah Meyer",
    email: "sarah@nexuskube.io",
    plan: "Mensuel",
    amount: "39 €",
    date: "Aujourd'hui 12:45",
    status: "Actif",
  },
  {
    client: "Eric Dupont",
    email: "eric@dupont-consulting.fr",
    plan: "Pro All-Access",
    amount: "299 €",
    date: "Hier 18:30",
    status: "Actif",
  },
  {
    client: "Karim Benali",
    email: "k.benali@stackflow.co",
    plan: "Mensuel",
    amount: "39 €",
    date: "Hier 16:15",
    status: "Actif",
  },
  {
    client: "Hélène Vaneck",
    email: "h.vaneck@northstar.dev",
    plan: "Pro All-Access",
    amount: "299 €",
    date: "23 oct 11:02",
    status: "Actif",
  },
];

export const healthCards = [
  {
    title: "IA Orchestrator Engine",
    detail: "Latence médiane 240ms • 0 erreurs de runtime",
    stat: "Opérationnel",
    icon: "cpu",
  },
  {
    title: "Dépôts Boilerplates GitHub",
    detail: "24 templates synchronisés • CI/CD Green",
    stat: "Synchronisé",
    icon: "github",
  },
  {
    title: "Politiques de Sécurité",
    detail: "Audits RBAC actifs • SSL TLS 1.3 strict",
    stat: "Conforme",
    icon: "shield",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "alexandre-dupont",
    name: "Alexandre Dupont",
    initials: "AD",
    handle: "@adupont",
    role: "Lead Architect",
    email: "alex@company.com",
    plan: "Pro All-Access",
    projects: 7,
    joined: "14 oct 2024",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#10B981] to-[#0F766E]",
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    initials: "SC",
    handle: "@schen-dev",
    role: "Senior Dev",
    email: "sarah.chen@techscale.io",
    plan: "Enterprise",
    projects: 18,
    joined: "02 nov 2024",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#8E9192] to-[#444748]",
  },
  {
    id: "marc-lefebvre",
    name: "Marc Lefebvre",
    initials: "ML",
    handle: "@mlefebvre",
    role: "Indépendant",
    email: "marc.l@freelance.dev",
    plan: "Free",
    projects: 2,
    joined: "12 jan 2025",
    status: "Actif",
    twoFA: false,
    gradient: "from-[#757778] to-[#353534]",
  },
  {
    id: "kevin-vance",
    name: "Kevin Vance",
    initials: "KV",
    handle: "@kvance",
    role: "CTO",
    email: "kevin@vance-labs.com",
    plan: "Pro All-Access",
    projects: 11,
    joined: "28 déc 2024",
    status: "Suspendu",
    twoFA: true,
    suspended: true,
    gradient: "from-[#F87171] to-[#713D3D]",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    initials: "ER",
    handle: "@erostova",
    role: "Cloud Eng",
    email: "elena.rostova@cloudhub.io",
    plan: "Pro All-Access",
    projects: 5,
    joined: "04 fév 2025",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#34D399] to-[#237A5B]",
  },
  {
    id: "david-miller",
    name: "David Miller",
    initials: "DM",
    handle: "@dmiller",
    role: "Fullstack",
    email: "d.miller@agency.co",
    plan: "Free",
    projects: 1,
    joined: "18 fév 2025",
    status: "Actif",
    twoFA: false,
    gradient: "from-[#9DA0A1] to-[#444748]",
  },
  {
    id: "laura-gomez",
    name: "Laura Gomez",
    initials: "LG",
    handle: "@laura",
    role: "AI Engineer",
    email: "laura@synapse-ai.es",
    plan: "Pro All-Access",
    projects: 9,
    joined: "21 fév 2025",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#34D399] to-[#0F766E]",
  },
  {
    id: "maxime-robert",
    name: "Maxime Robert",
    initials: "MR",
    handle: "@mrobert",
    role: "Solo Founder",
    email: "m.robert@indiecraft.fr",
    plan: "Pro All-Access",
    projects: 4,
    joined: "24 fév 2025",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#6EE7B7] to-[#047857]",
  },
  {
    id: "helene-vaneck",
    name: "Hélène Vaneck",
    initials: "HV",
    handle: "@hvaneck",
    role: "Platform Lead",
    email: "h.vaneck@northstar.dev",
    plan: "Enterprise",
    projects: 22,
    joined: "01 mars 2025",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#C4C7C8] to-[#565758]",
  },
  {
    id: "thomas-garnier",
    name: "Thomas Garnier",
    initials: "TG",
    handle: "@tgarnier",
    role: "Backend Dev",
    email: "thomas.g@fintech-vault.eu",
    plan: "Free",
    projects: 3,
    joined: "08 mars 2025",
    status: "En attente",
    twoFA: false,
    gradient: "from-[#8E9192] to-[#2A2A2A]",
  },
  {
    id: "kevin-vance-bis",
    name: "Nadia Okafor",
    initials: "NO",
    handle: "@nokafor",
    role: "DevOps",
    email: "n.okafor@scaleops.africa",
    plan: "Pro All-Access",
    projects: 6,
    joined: "12 mars 2025",
    status: "Actif",
    twoFA: true,
    gradient: "from-[#34D399] to-[#065F46]",
  },
  {
    id: "julien-petit",
    name: "Julien Petit",
    initials: "JP",
    handle: "@jpetit",
    role: "Freelance",
    email: "julien@atelier-petit.fr",
    plan: "Free",
    projects: 0,
    joined: "19 mars 2025",
    status: "Suspendu",
    twoFA: false,
    suspended: true,
    gradient: "from-[#FCA5A5] to-[#7F1D1D]",
  },
];

export const userDetail = {
  user: adminUsers[0],
  uid: "USR-2024-ALPHA-00812",
  legalName: "Alexandre Dupont",
  organization: "Alpha Inc. — Tenant #8812",
  workspace: "Workspace Pro",
  github: "@alex-dupont",
  systemRole: "LEAD_ARCHITECT",
  twoFA: "TOTP Authenticator (SHA256)",
  lastLogin: "Il y a 14 minutes (16:42 CET)",
  device: "macOS Sonoma / Chrome 129",
  ip: "194.254.12.89",
  tls: "RSA-4096 VALID (Expire 2026)",
  passwordChanged: "18 août 2024",
  created: "12 janvier 2024",
  location: "Paris (75008), France • Faible latence (<4ms)",
  route: "AS24E35 Iliad Entreprises • Paris DC4",
  organizationDetail: "Alpha Inc.",
  credits: "85 / 100 disponibles",
  keys: "3 actifs",
  license: "Licence Lifetime valide",
  security: "2FA TOTP Active",
  verification: "Vérification Matérielle",
  recentCli: [
    { command: "netero pull nextjs-saas", result: "200 OK" },
    { command: "netero verify --jwt", result: "200 OK" },
    { command: "netero deploy --edge", result: "200 OK" },
  ],
};

export const subscriptionKpis: AdminKpi[] = [
  { label: "Abonnements actifs", value: "1 245", hint: "Toutes formules", trend: "up", icon: "credit" },
  { label: "Nouveaux ce mois", value: "148", hint: "vs 112 le mois dernier", trend: "up", icon: "user-plus" },
  { label: "Taux de rétention", value: "96.8 %", hint: "Stable", trend: "flat", icon: "shield" },
  { label: "Churn rate", value: "1.2 %", hint: "-0.4 % MoM", trend: "down", icon: "trending" },
];

export const licenses: LicenseRow[] = [
  {
    id: "lic-8841",
    client: "Alexandre Dupont",
    email: "alex.dupont@craftdev.io",
    plan: "Pro All-Access Lifetime",
    seats: "1 siège",
    license: "LIFETIME-GUI",
    start: "14 oct 2024",
    end: "Illimité (à vie)",
    amount: "299 €",
    status: "Actif",
  },
  {
    id: "lic-8842",
    client: "Sarah Chen",
    email: "schen@techscale.global",
    plan: "Entreprise Multi-sièges",
    seats: "10 sièges",
    license: "SUB-ENT-9012",
    start: "02 nov 2024",
    end: "02 nov 2025",
    amount: "599 €",
    status: "Actif",
  },
  {
    id: "lic-8843",
    client: "Maxime Robert",
    email: "m.robert@indiecraft.fr",
    plan: "Pro Solo",
    seats: "1 projet dédié",
    license: "SOLO-102",
    start: "19 jan 2025",
    end: "Illimité",
    amount: "29 €",
    status: "Actif",
  },
  {
    id: "lic-8844",
    client: "Kevin Vance",
    email: "kevin.vance@vancemedia.co",
    plan: "Pro All-Access",
    seats: "1 siège",
    license: "LIFETIME-7711",
    start: "28 déc 2024",
    end: "19 jan 2025",
    amount: "299 €",
    status: "Expiré",
  },
  {
    id: "lic-8845",
    client: "Laura Gomez",
    email: "laura@synapse-ai.es",
    plan: "IA Pro Mensuel",
    seats: "1 siège",
    license: "MONTH-3329",
    start: "01 fév 2025",
    end: "01 mars 2025",
    amount: "29 €/m",
    status: "Actif",
  },
  {
    id: "lic-8846",
    client: "Studio Pulse Inc.",
    email: "billing@studiopulse.agency",
    plan: "Entreprise Multi-sièges",
    seats: "10 sièges",
    license: "SUB-ENT-2201",
    start: "10 déc 2023",
    end: "10 déc 2024",
    amount: "599 €",
    status: "Annulé",
  },
];

export const licenseInspection = {
  holder: "Alexandre Dupont",
  email: "alex.dupont@craftdev.io",
  verified: "Titulaire vérifié",
  stripe: "Stripe Customer OK",
  activationKey: "RSA-4096",
  hash: "SHA256 : 7fga1c4b82dee6S3e1E",
  machines: "2 / 3 actifs",
  gateway: "Stripe Checkout",
  heartbeat: "Il y a 14 min",
  aiGeneration: "Illimité",
  cli: [
    { command: "netero pull nestjs-saas", result: "200 OK" },
    { command: "netero verify --jwt", result: "200 OK" },
    { command: "IA CodeGen Engine v2.4", result: "1 420 tkn" },
  ],
};

export const paymentKpis: AdminKpi[] = [
  { label: "Revenus totaux", value: "348 200 €", hint: "+18.5 % YoY", trend: "up", icon: "euro" },
  { label: "Revenus mensuels (MRR)", value: "48 250 €", hint: "+14.2 % ce mois", trend: "up", icon: "trending" },
  { label: "Volume transactions", value: "2 140", hint: "2 121 réussis • 19 échoués", trend: "up", icon: "receipt" },
  { label: "Taux de succès", value: "99.1 %", hint: "2 121 réussis", trend: "up", icon: "shield" },
];

export const revenueSeries: Record<string, { label: string; mrr: number; volume: number }[]> = {
  mois: [
    { label: "Mar", mrr: 19800, volume: 124 },
    { label: "Avr", mrr: 21400, volume: 138 },
    { label: "Mai", mrr: 23200, volume: 156 },
    { label: "Juin", mrr: 26100, volume: 171 },
    { label: "Juil", mrr: 28900, volume: 188 },
    { label: "Août", mrr: 31600, volume: 204 },
    { label: "Sep", mrr: 34800, volume: 226 },
    { label: "Oct", mrr: 38200, volume: 248 },
    { label: "Nov", mrr: 42100, volume: 271 },
    { label: "Déc", mrr: 48250, volume: 312 },
  ],
  trimestre: [
    { label: "T1", mrr: 18700, volume: 116 },
    { label: "T2", mrr: 23500, volume: 155 },
    { label: "T3", mrr: 29800, volume: 197 },
    { label: "T4", mrr: 48250, volume: 312 },
  ],
  annee: [
    { label: "2021", mrr: 8400, volume: 52 },
    { label: "2022", mrr: 14900, volume: 96 },
    { label: "2023", mrr: 24400, volume: 164 },
    { label: "2024", mrr: 34800, volume: 238 },
    { label: "2025", mrr: 48250, volume: 312 },
  ],
  tout: [
    { label: "2020", mrr: 3200, volume: 24 },
    { label: "2021", mrr: 8400, volume: 52 },
    { label: "2022", mrr: 14900, volume: 96 },
    { label: "2023", mrr: 24400, volume: 164 },
    { label: "2024", mrr: 34800, volume: 238 },
    { label: "2025", mrr: 48250, volume: 312 },
  ],
};

export const payments: PaymentRow[] = [
  {
    id: "tx_1P8k99s2",
    client: "Alexandre Dupont",
    email: "alex@company.com",
    product: "Pro All-Access Lifetime",
    amount: "299,00 €",
    method: "Visa 4242",
    date: "Aujourd'hui 14:22",
    status: "Réussi",
  },
  {
    id: "tx_1P8j54x1",
    client: "Techscale SAS",
    email: "sarah.chen@techscale.io",
    product: "Entreprise (10 sièges)",
    amount: "599,00 €",
    method: "SEPA Instant",
    date: "Hier 18:30",
    status: "Réussi",
  },
  {
    id: "tx_1P8h12b8",
    client: "Maxime Robert",
    email: "m.robert@indiecraft.fr",
    product: "Boilerplate Solo",
    amount: "149,00 €",
    method: "Mastercard 1099",
    date: "Hier 11:15",
    status: "Réussi",
  },
  {
    id: "tx_1P8f99e3",
    client: "Kevin Vance",
    email: "kevin@vance-labs.com",
    product: "Pro All-Access Lifetime",
    amount: "299,00 €",
    method: "Visa 8821",
    date: "28 déc 2024",
    status: "Litige",
  },
  {
    id: "tx_1P8c44a7",
    client: "Laura Gomez",
    email: "laura@synapse-ai.es",
    product: "Pack crédits IA (+100)",
    amount: "29,00 €",
    method: "Apple Pay",
    date: "24 déc 2024",
    status: "Réussi",
  },
  {
    id: "tx_1P8a01z9",
    client: "DevAgency UK",
    email: "billing@devagency.co.uk",
    product: "Pack Crédits IA (+500)",
    amount: "129,00 €",
    method: "Visa 3341",
    date: "20 déc 2024",
    status: "Réussi",
  },
  {
    id: "tx_1P8a02f4",
    client: "Nadia Okafor",
    email: "n.okafor@scaleops.africa",
    product: "Pro All-Access Mensuel",
    amount: "39,00 €",
    method: "Visa 5521",
    date: "18 déc 2024",
    status: "Réussi",
  },
  {
    id: "tx_1P89zz1c",
    client: "Studio Pulse",
    email: "billing@studiopulse.agency",
    product: "Entreprise (10 sièges)",
    amount: "599,00 €",
    method: "Virement",
    date: "16 déc 2024",
    status: "Échoué",
  },
];

export const adminBoilerplates: AdminBoilerplate[] = [
  {
    id: "saas-ai-copilot",
    title: "SaaS AI Copilot Starter",
    repo: "github.com/netero.org/saas-ai-copilot",
    category: "IA & Copilotes",
    stack: ["Next.js 15", "pgvector", "LangChain"],
    version: "v2.1",
    tag: "LATEST",
    price: "299 € / Inclus",
    status: "Publié",
    clones: "4 120 clones",
    thumbnail: "/images/catalogue/saas-ai-matrix.png",
  },
  {
    id: "b2b-multi-tenant",
    title: "B2B Multi-Tenant Platform",
    repo: "github.com/netero.org/b2b-enterprise-core",
    category: "SaaS B2B",
    stack: ["Next.js 15", "Prisma", "RLS", "WorkOS"],
    version: "v2.1",
    tag: "MAJOR",
    price: "Inclus Pro",
    status: "Publié",
    clones: "3 850 clones",
    thumbnail: "/images/catalogue/b2b-enterprise.png",
  },
  {
    id: "aura-headless-commerce",
    title: "Aura Headless Commerce",
    repo: "github.com/netero.org/aura-commerce",
    category: "E-commerce",
    stack: ["Next.js 15", "Algolia", "Stripe"],
    version: "v1.8",
    tag: "STABLE",
    price: "129 € Licence unique",
    status: "Publié",
    clones: "1 940 clones",
    thumbnail: "/images/boilerplate-marketplace.png",
  },
  {
    id: "orbit-micro-gateway",
    title: "Orbit Micro-Gateway",
    repo: "github.com/netero.org/orbit-gateway",
    category: "Micro-services",
    stack: ["Upstash", "Redis", "Edge"],
    version: "v1.2",
    tag: "CORE",
    price: "Gratuit Open Source",
    status: "Publié",
    clones: "1 650 clones",
    thumbnail: "/images/catalogue/micro-saas.png",
  },
  {
    id: "devtools-docs-blog",
    title: "DevTools Docs & Blog",
    repo: "github.com/netero.org/devtools-docs",
    category: "Documentation",
    stack: ["MDX", "Shiki", "Algolia"],
    version: "v2.4",
    tag: "ARCHIVED",
    price: "Gratuit Public",
    status: "Dépublié",
    clones: "890 clones",
    thumbnail: "/images/catalogue/devtools-docs.png",
  },
  {
    id: "autonomous-agent",
    title: "Autonomous Agent Ops",
    repo: "github.com/netero.org/autonomous-agent",
    category: "IA & Copilotes",
    stack: ["Next.js 15", "Inngest", "OpenAI"],
    version: "v0.9",
    tag: "BETA",
    price: "Inclus Pro",
    status: "Brouillon",
    clones: "0 clone",
    thumbnail: "/images/catalogue/autonomous-agent.png",
  },
];

export const boilerplateKpis: AdminKpi[] = [
  { label: "Boilerplates publiés", value: "24", hint: "modèles en production", trend: "up", icon: "layers" },
  { label: "En cours de révision", value: "3", hint: "modèles en pipeline QA", trend: "flat", icon: "clock" },
  { label: "Total téléchargements", value: "12 450+", hint: "+18.4 % ce mois", trend: "up", icon: "download" },
  { label: "Note moyenne", value: "4.92 / 5", hint: "612 avis certifiés", trend: "up", icon: "star" },
];

export const weeklyClones = [
  { label: "Lun", clones: 820 },
  { label: "Mar", clones: 940 },
  { label: "Mer", clones: 1120 },
  { label: "Jeu", clones: 1050 },
  { label: "Ven", clones: 1240 },
  { label: "Sam", clones: 780 },
  { label: "Dim", clones: 690 },
];

export const aiKpis: AdminKpi[] = [
  { label: "Total générations", value: "48 930", hint: "+14.2 % depuis le lancement", trend: "up", icon: "sparkles" },
  { label: "Taux de succès pipeline", value: "99.8 %", hint: "0 erreur (dernières 24 h)", trend: "up", icon: "shield" },
  { label: "Latence médiane", value: "38.6s", hint: "p95 : 52.1s", trend: "flat", icon: "clock" },
  { label: "Tokens & crédits", value: "1.42M", hint: "Moyenne 4.2 crédits / projet", trend: "up", icon: "cpu" },
];

export const aiModels: AiModel[] = [
  {
    id: "claude-sonnet",
    name: "Claude 3.5 Sonnet",
    engine: "Netero-Engine v2.4",
    runtime: "anthropic.claude-3-5-sonnet-20241022",
    inputCost: "$0.0030 / in",
    outputCost: "$0.0150 / out",
    status: "En ligne",
    uptime: "99.9 %",
    fallback: "Claude 3 Haiku (AZ-Paris-02)",
    enabled: true,
  },
  {
    id: "openai-o1",
    name: "OpenAI o1-preview",
    engine: "Netero-Engine v2.4-Reasoner",
    runtime: "openai.o1-preview-20240912",
    inputCost: "$0.0150 / in",
    outputCost: "$0.0600 / out",
    status: "En ligne",
    uptime: "99.82 %",
    fallback: "GPT-4o (Snapshot 2024-08)",
    enabled: true,
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek-Coder-V2 Lite",
    engine: "Netero-Engine v2.2-Edge",
    runtime: "deepseek-coder-v2-lite",
    inputCost: "$0.0004 / compute",
    outputCost: "brut",
    status: "En ligne",
    uptime: "100 %",
    fallback: "Claude 3.5 Sonnet",
    enabled: true,
  },
];

export const aiConsumers: AiConsumer[] = [
  {
    user: "Alexandre Leroy",
    email: "alexandre.leroy@qwantur.io",
    org: "Qwantur Enterprise",
    plan: "Plan Custom",
    projects: "142 projets",
    credits: "612 crédits",
    perProject: "4.3 cr/projet",
    success: "100 %",
    last: "Il y a 6 min",
    pipeline: "NextJS-Clean-v2",
  },
  {
    user: "Sophie Martin",
    email: "sophie.martin@solux-ai.com",
    org: "Solux Labs",
    plan: "Plan Pro",
    projects: "89 projets",
    credits: "378 crédits",
    perProject: "4.2 cr/projet",
    success: "98.8 %",
    last: "Il y a 18 min",
    pipeline: "Fastify-Microservice",
  },
  {
    user: "M. Benali",
    email: "m.benali@hyperstack.dev",
    org: "Hyperstack Devs",
    plan: "Plan Pro",
    projects: "64 projets",
    credits: "260 crédits",
    perProject: "4.0 cr/projet",
    success: "100 %",
    last: "Il y a 44 min",
    pipeline: "SvelteKit-Edge-Full",
  },
  {
    user: "Thomas Garnier",
    email: "thomas.g@fintech-vault.eu",
    org: "Vault Fin",
    plan: "Plan Custom",
    projects: "51 projets",
    credits: "218 crédits",
    perProject: "4.2 cr/projet",
    success: "98.0 %",
    last: "Il y a 2 h",
    pipeline: "GO-GRPC-Backend",
  },
];

export const statsKpis: AdminKpi[] = [
  { label: "Utilisateurs inscrits", value: "14 820", hint: "+12.4 % • 640 ce mois", trend: "up", icon: "users" },
  { label: "Conversion Free → Pro", value: "8.4 %", hint: "Activation code 64.2 %", trend: "up", icon: "trending" },
  { label: "Churn annuel", value: "1.2 %", hint: "Rétention à 12 m : 98.8 %", trend: "down", icon: "shield" },
  { label: "Déploiements réussis", value: "98.9 %", hint: "Build fail rate 1.1 %", trend: "up", icon: "rocket" },
];

export const usersEvolution: Record<string, { label: string; cumules: number; actifs: number }[]> = {
  "90j": signupSeries["90j"].map((d) => ({ label: d.label, cumules: d.inscriptions, actifs: d.actifs })),
  "180j": [
    { label: "Mai", cumules: 6200, actifs: 1820 },
    { label: "Juin", cumules: 6810, actifs: 1960 },
    { label: "Juil", cumules: 7340, actifs: 2080 },
    { label: "Août", cumules: 7980, actifs: 2210 },
    { label: "Sept", cumules: 8640, actifs: 2360 },
    { label: "Oct", cumules: 9310, actifs: 2480 },
    { label: "Nov", cumules: 10020, actifs: 2620 },
    { label: "Déc", cumules: 10680, actifs: 2760 },
    { label: "Jan", cumules: 11140, actifs: 2890 },
    { label: "Fév", cumules: 11720, actifs: 3040 },
    { label: "Mar", cumules: 12380, actifs: 3210 },
    { label: "Avr", cumules: 13020, actifs: 3410 },
  ],
  "365j": [
    { label: "Jan", cumules: 4200, actifs: 1240 },
    { label: "Fév", cumules: 4780, actifs: 1360 },
    { label: "Mar", cumules: 5340, actifs: 1480 },
    { label: "Avr", cumules: 6080, actifs: 1610 },
    { label: "Mai", cumules: 6810, actifs: 1760 },
    { label: "Juin", cumules: 7460, actifs: 1900 },
    { label: "Juil", cumules: 8140, actifs: 2040 },
    { label: "Août", cumules: 8920, actifs: 2210 },
    { label: "Sept", cumules: 9860, actifs: 2480 },
    { label: "Oct", cumules: 10820, actifs: 2760 },
    { label: "Nov", cumules: 11880, actifs: 3040 },
    { label: "Déc", cumules: 13020, actifs: 3410 },
  ],
};

export const formulaDistribution = [
  { name: "Free Starter", value: 6818, percent: "46 %", color: "#FFFFFF" },
  { name: "Pro All-Access", value: 5631, percent: "38 %", color: "#8E9192" },
  { name: "Entreprise Custom", value: 2371, percent: "16 %", color: "#444748" },
];

export const revenueProjection = [
  { label: "Sep", reel: 34800, projection: 36200 },
  { label: "Oct", reel: 38200, projection: 39800 },
  { label: "Nov", reel: 42100, projection: 43600 },
  { label: "Déc", reel: 48250, projection: 47100 },
  { label: "Jan", reel: null, projection: 50800 },
  { label: "Fév", reel: null, projection: 54200 },
  { label: "Mar", reel: null, projection: 58100 },
];

export const generatorMix = [
  { name: "Next.js Supabase Enterprise", jobs: 3840, clones: 2120 },
  { name: "Python AI Agent API", jobs: 4210, clones: 1890 },
  { name: "Tauri Desktop Rust Core", jobs: 1940, clones: 1650 },
  { name: "Go High-Throughput Auth Gateway", jobs: 2110, clones: 2400 },
];

export const statsSummary = [
  { label: "Moyenne journalière", value: "+162 inscriptions" },
  { label: "DAU / MAU Ratio", value: "41.8 %" },
  { label: "Taux d'engagement", value: "89.4 %" },
  { label: "ARPU moyen", value: "49.20 € / mois" },
  { label: "LTV estimée", value: "1 180 €" },
];

export const opsMetrics = [
  { label: "Temps de compilation IA moyen", value: "3.4 secondes", icon: "clock" },
  { label: "Consommation LLM (tokens)", value: "48.2M tokens / mois", icon: "cpu" },
  { label: "Disponibilité pipeline CI/CD", value: "99.98 % SLA actif", icon: "shield" },
];

export const adminReports: AdminReport[] = [
  {
    id: "report-janvier",
    title: "Rapport d'activité mensuel — Janvier 2025",
    generated: "Généré le 01/02/2025 • 00:00",
    size: "Taille : 3.2 MB",
    status: "Validé",
  },
  {
    id: "report-tva-q4",
    title: "Audit fiscal et TVA trimestriel Q4 2024",
    generated: "Généré le 05/01/2025 • 14:22",
    size: "Taille : 8.7 MB",
    status: "Vérifié Stripe Tax",
  },
  {
    id: "report-soc2",
    title: "Rapport de sécurité et conformité SOC2",
    generated: "Généré le 18/12/2024 • 10:15",
    size: "Taille : 14.1 MB",
    status: "Certification Type II",
  },
];

export const adminProjects: AdminProject[] = [
  {
    id: "taskpulse-saas",
    name: "TaskPulse-SaaS",
    user: "Alexandre Dupont",
    org: "Alpha Inc.",
    stack: "Next.js 15 • Prisma • Stripe",
    status: "Déployé",
    date: "Aujourd'hui 14:32",
    credits: 5,
  },
  {
    id: "pulse-copilot",
    name: "Pulse-Copilot v1.4",
    user: "Laura Gomez",
    org: "Synapse AI",
    stack: "Next.js 15 • AI SDK • pgvector",
    status: "Déployé",
    date: "Hier 18:20",
    credits: 4,
  },
  {
    id: "nexus-commerce",
    name: "Nexus-Commerce",
    user: "Sarah Chen",
    org: "Techscale SAS",
    stack: "Next.js 15 • Supabase • Algolia",
    status: "Déployé",
    date: "Il y a 3 jours",
    credits: 5,
  },
  {
    id: "argos-portal",
    name: "Argos-Portal v1.2",
    user: "Kevin Vance",
    org: "Vance Labs",
    stack: "Next.js 15 • ClickHouse",
    status: "Build",
    date: "À l'instant (14:38)",
    credits: 4,
  },
  {
    id: "soloflow-crm",
    name: "SoloFlow-CRM",
    user: "Maxime Robert",
    org: "Indiecraft",
    stack: "Next.js 15 • Supabase • Zod",
    status: "Déployé",
    date: "Il y a 4 jours",
    credits: 3,
  },
  {
    id: "fintech-vault",
    name: "Fintech-Vault API",
    user: "Thomas Garnier",
    org: "Vault Fin",
    stack: "Next.js 15 • gRPC • Postgres",
    status: "Échec",
    date: "Il y a 5 jours",
    credits: 6,
  },
];

export const adminNotifications: AdminNotification[] = [
  {
    id: "notif-1",
    title: "Pic de générations IA détecté",
    detail: "Le cluster AI00-FR a dépassé 120 req/min pendant 4 minutes. Aucun impact sur le SLO.",
    time: "Il y a 8 min",
    tone: "warning",
    read: false,
    category: "IA",
  },
  {
    id: "notif-2",
    title: "Nouveau paiement Entreprise",
    detail: "Techscale SAS a renouvelé 10 sièges pour 599,00 € via SEPA Instant.",
    time: "Il y a 26 min",
    tone: "success",
    read: false,
    category: "Paiement",
  },
  {
    id: "notif-3",
    title: "Tentative de connexion bloquée",
    detail: "5 échecs 2FA consécutifs sur le compte kevin@vance-labs.com. Compte temporairement verrouillé.",
    time: "Il y a 1 h",
    tone: "danger",
    read: false,
    category: "Sécurité",
  },
  {
    id: "notif-4",
    title: "Synchronisation GitHub terminée",
    detail: "27 dépôts synchronisés, 3 nouveaux tags LTS détectés sur les boilerplates.",
    time: "Il y a 2 h",
    tone: "info",
    read: true,
    category: "Système",
  },
  {
    id: "notif-5",
    title: "Boilerplate en attente de revue",
    detail: "Autonomous Agent Ops v0.9 attend une validation manuelle avant publication.",
    time: "Il y a 3 h",
    tone: "warning",
    read: true,
    category: "Système",
  },
  {
    id: "notif-6",
    title: "Rapport SOC2 disponible",
    detail: "Le rapport de conformité Type II a été régénéré et est prêt au téléchargement.",
    time: "Hier",
    tone: "success",
    read: true,
    category: "Sécurité",
  },
  {
    id: "notif-7",
    title: "Churn anormal sur le plan Pro",
    detail: "Le taux de churn mensuel est passé à 1.2 % (+0.4 point). Analyse recommandée.",
    time: "Hier",
    tone: "danger",
    read: true,
    category: "Paiement",
  },
  {
    id: "notif-8",
    title: "Mise à jour du moteur v2.4",
    detail: "Le fallback Claude 3 Haiku a été activé sur la région AZ-Paris-02.",
    time: "Il y a 2 jours",
    tone: "info",
    read: true,
    category: "IA",
  },
];

export const notificationKpis: AdminKpi[] = [
  { label: "Non lues", value: "3", hint: "À traiter", trend: "flat", icon: "bell" },
  { label: "Alertes critiques", value: "2", hint: "Sécurité & paiement", trend: "down", icon: "shield" },
  { label: "Sur 7 jours", value: "18", hint: "6 en moyenne / jour", trend: "flat", icon: "activity" },
];
