import { Suspense } from "react";
import { AdminUsersScreen } from "@/components/admin/screens/users";

export const metadata = {
  title: "Utilisateurs — Administration NETERO",
};

async function UsersContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialQuery = typeof params.q === "string" ? params.q : "";
  return <AdminUsersScreen initialQuery={initialQuery} />;
}

function UsersFallback() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <div className="h-20 animate-pulse rounded-xl bg-white/[0.03]" />
      <div className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-xl bg-white/[0.03]" />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-xl bg-white/[0.03]" />
    </div>
  );
}

export default function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<UsersFallback />}>
      <UsersContent searchParams={searchParams} />
    </Suspense>
  );
}
