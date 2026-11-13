import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Administration — NETERO",
  description: "Console d'administration NETERO : utilisateurs, abonnements, paiements, boilerplates et moteur IA.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
