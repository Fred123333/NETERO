import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BackToTop } from "@/components/shared/BackToTop";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <ScrollReveal />
      <Header />
      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-16rem)]">{children}</main>
      <BackToTop />
      <Footer />
    </div>
  );
}