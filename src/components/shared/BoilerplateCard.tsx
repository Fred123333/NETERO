import Image from "next/image";
import { Star } from "lucide-react";
import { Boilerplate } from "@/lib/data/boilerplates";
import { cn } from "@/lib/utils";

export function BoilerplateCard({ bp }: { bp: Boilerplate }) {
  const isFree = bp.badge === "FREE";
  return (
    <div className="bg-surface-container rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:bg-surface-container-high transition-colors">
      <div className="relative h-48 w-full overflow-hidden bg-surface-container-highest">
        <Image
          src={bp.image}
          alt={bp.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold",
              isFree
                ? "bg-surface-container-highest/90 backdrop-blur-md text-secondary-fixed-dim"
                : "bg-primary-container text-on-primary-container"
            )}
          >
            {isFree ? "OPEN-SOURCE / FREE" : "PREMIUM"}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface-container-highest/80 backdrop-blur-md px-2 py-0.5 rounded text-primary-container font-label-sm text-label-sm font-semibold">
          <Star size={15} fill="currentColor" />
          <span>{bp.rating}</span>
        </div>
      </div>

      <div className="p-space-lg flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{bp.name}</h3>
          <p className="font-body-sm text-body-sm text-secondary mt-space-sm line-clamp-3">
            {bp.description}
          </p>
          <div className="mt-space-md flex flex-wrap gap-1.5">
            {bp.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-surface-container-highest rounded font-code text-code-snippet text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-space-lg pt-space-md flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {bp.price}
          </span>
          <button
            className={cn(
              "px-space-md py-2 rounded-full font-label-md text-label-md font-medium transition-colors",
              bp.ctaVariant === "primary"
                ? "bg-primary-container text-on-primary font-semibold hover:bg-primary-fixed-dim"
                : "bg-surface-container-highest hover:bg-surface-bright text-on-surface"
            )}
          >
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}