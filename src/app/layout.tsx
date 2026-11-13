import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // ← Ajout de l'import
import "@/styles/tailwind.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NETERO — Boilerplates Next.js & Générateur IA",
  description:
    "La plateforme tout-en-un pour développeurs combinant des architectures Next.js 15 FullStack prêtes pour la production et un agent IA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("dark", inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* Script 1 — restauration du thème (next/script, beforeInteractive) */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('netero-theme');if(t==='light'||t==='dark'){var d=document.documentElement;d.classList.remove('dark','light');d.classList.add(t);d.style.colorScheme=t;}}catch(e){}})();`,
          }}
        />

        {/* Script 2 — nettoyage des attributs/classes injectés par extensions */}
        <Script
          id="extension-cleanup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof MutationObserver === "undefined") return;
                var ATTRS = ["data-reveal-observed","data-aos","data-scroll","bis_skin_checked","data-gr-ext-installed","data-lt-installed"];
                var CLASSES = ["is-visible","aos-animate"];
                function clean(el){
                  if(!el || el.nodeType !== 1) return;
                  for(var i=0;i<ATTRS.length;i++){ if(el.hasAttribute(ATTRS[i])) el.removeAttribute(ATTRS[i]); }
                  for(var j=0;j<CLASSES.length;j++){ if(el.classList && el.classList.contains(CLASSES[j])) el.classList.remove(CLASSES[j]); }
                }
                var obs = new MutationObserver(function(muts){
                  for(var i=0;i<muts.length;i++){
                    var m = muts[i];
                    if(m.type === "attributes") clean(m.target);
                    if(m.type === "childList") m.addedNodes.forEach(clean);
                  }
                });
                obs.observe(document.documentElement, {
                  attributes: true,
                  subtree: true,
                  childList: true,
                  attributeFilter: ATTRS
                });
                setTimeout(function(){ obs.disconnect(); }, 5000);
              })();
            `,
          }}
        />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}