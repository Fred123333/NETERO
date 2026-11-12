import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Tableau de bord — NETERO",
  description: "Votre espace de travail NETERO : projets, boilerplates et générations IA.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
