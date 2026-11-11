export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface px-gutter py-space-xl">
      {children}
    </div>
  );
}