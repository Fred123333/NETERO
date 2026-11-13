import { notFound } from "next/navigation";
import { adminUsers } from "@/lib/data/admin";
import { AdminUserDetailScreen } from "@/components/admin/screens/user-detail";

export const metadata = {
  title: "Fiche utilisateur — Administration NETERO",
};

export function generateStaticParams() {
  return adminUsers.map((user) => ({ id: user.id }));
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!adminUsers.some((user) => user.id === id)) notFound();
  return <AdminUserDetailScreen userId={id} />;
}
