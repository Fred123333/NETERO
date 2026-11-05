import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "@/styles/tailwind.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}