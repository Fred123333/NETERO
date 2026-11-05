import Link from "next/link";
import { MoveRight } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { BoilerplateCard } from "@/components/shared/BoilerplateCard";
import { boilerplates } from "@/lib/data/boilerplates";

export function BoilerplatesSection() {
  return (
    <section id="boilerplates" className="w-full px-gutter py-space-xl bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
          <div>
            <h2 className="text-primary text-lg">Catalogue Élite</h2>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
              Boilerplates Prêts au Déploiement
            </h2>
            <p className="font-body-md text-body-md text-secondary-fixed-dim mt-space-sm max-w-xl">
              Sélectionnés et mis à jour de manière continue selon les dernières versions de Next.js
              et de l&apos;écosystème React.
            </p>
          </div>
          <div className="mt-space-md md:mt-0">
            <Link
              href="/boilerplates"
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary-container hover:underline"
            >
              <span>Voir tout le catalogue (14 templates)</span>
              <MoveRight size={18} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {boilerplates.map((bp) => (
            <BoilerplateCard key={bp.id} bp={bp} />
          ))}
        </div>
      </div>
    </section>
  );
}