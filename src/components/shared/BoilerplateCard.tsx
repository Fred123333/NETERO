import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Boilerplate } from "@/lib/data/boilerplates";
import { cn } from "@/lib/utils";

export function BoilerplateCard({ bp }: { bp: Boilerplate }) {
  const isFree = bp.badge === "FREE";
  const isPremium = !isFree;
  const href = `/boilerplates/${bp.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-surface-container shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary-container hover:bg-surface-container-high hover:shadow-2xl"
    >
      <div className="relative h-48 w-full overflow-hidden bg-surface-container-highest">
        <Image
          src={bp.image}
          alt={bp.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3">
<span
  className={cn(
    "rounded-full px-1.5 py-px text-[14px] font-semibold uppercase leading-none tracking-wider",
    isFree
      ? "bg-surface-container-lowest/70 text-on-surface backdrop-blur-md"
      : "bg-primary-container text-on-primary",
  )}
>
  {isFree ? "OPEN-SOURCE / FREE" : "PREMIUM"}
</span>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-surface-container-lowest/70 px-2 py-0.5 font-label-sm font-semibold text-on-surface backdrop-blur-md">
          <Star size={15} fill="currentColor" />
          <span>{bp.rating}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-space-lg">
        <div>
          <h3 className="line-clamp-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            {bp.name}
          </h3>
          <p className="mt-space-sm line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">
            {bp.description}
          </p>
          <div className="mt-space-md flex flex-wrap gap-1.5">
            {bp.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-surface-container-high px-2 py-0.5 font-code text-code-snippet font-medium text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-space-lg flex items-center justify-between pt-space-md">
          <span
            className={cn(
              "font-headline-sm text-headline-sm font-bold",
              isPremium ? "text-primary-text" : "text-on-surface",
            )}
          >
            {bp.price}
          </span>
          <span
            className={cn(
              "rounded-full border-2 border-outline-variant/40 px-space-md py-2 font-label-md text-label-md font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95",
              bp.ctaVariant === "primary"
                ? "bg-primary-container font-semibold text-on-primary group-hover:bg-primary-fixed-dim"
                : "bg-surface-container-high text-on-surface-variant hover:text-on-surface",
            )}
          >
            Voir détails
          </span>
        </div>
      </div>
    </Link>
  );
}
