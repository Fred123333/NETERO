import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingAssistant } from "@/components/shared/FloatingAssistant";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BackToTop } from "@/components/shared/BackToTop";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.documentElement.classList.add('reveal-ready');" +
            "setTimeout(function(){if(!document.documentElement.hasAttribute('data-reveal-active')){document.documentElement.classList.remove('reveal-ready');}},2000);",
        }}
      />
      <ScrollReveal />
      <Header />
      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-16rem)]">{children}</main>
      <FloatingAssistant />
      <BackToTop />
      <Footer />
    </div>
  );
}