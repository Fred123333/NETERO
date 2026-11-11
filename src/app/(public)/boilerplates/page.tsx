import type { Metadata } from "next";
import { CataloguePage } from "@/components/catalogue/CataloguePage";

export const metadata: Metadata = {
  title: "Catalogue des Boilerplates — NETERO",
  description:
    "Explorez notre collection de templates Next.js 15 pré-configurés, testés et prêts pour la production avec intégrations IA natives.",
};

export default function BoilerplatesPage() {
  return <CataloguePage />;
}
