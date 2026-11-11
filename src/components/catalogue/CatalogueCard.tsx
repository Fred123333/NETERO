import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Briefcase,
  Cloud,
  CodeXml,
  CreditCard,
  Database,
  FileCode,
  Layers,
  LayoutGrid,
  Network,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CatalogueBoilerplate, CatalogueTagIcon } from "@/lib/data/catalogue";

const tagIcons: Record<CatalogueTagIcon, LucideIcon> = {
  code: CodeXml,
  briefcase: Briefcase,
  database: Database,
  card: CreditCard,
  cloud: Cloud,
  grid: LayoutGrid,
  cart: ShoppingCart,
  wind: Wind,
  shield: ShieldCheck,
  network: Network,
  zap: Zap,
  boxes: Boxes,
  file: FileCode,
  search: Search,
  layers: Layers,
};

export function CatalogueCard({ item }: { item: CatalogueBoilerplate }) {
  return (
    <Link
      href={`/boilerplates/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
    >
      <div className="relative aspect-349/163 w-full overflow-hidden bg-surface">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 390px"
        />
      </div>

      <div className="flex flex-1 flex-col p-space-lg">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{item.name}</h3>
        <p className="mt-space-sm line-clamp-2 text-[14px] leading-5 text-on-surface-variant">
          {item.description}
        </p>

        <div className="mt-space-md flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const Icon = tagIcons[tag.icon];
            return (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1 rounded bg-surface-container-high px-1.5 py-1 text-[11px] font-medium leading-4 text-secondary-fixed-dim"
              >
                <Icon size={12} strokeWidth={1.8} className="shrink-0 text-secondary-fixed-dim" />
                {tag.label}
              </span>
            );
          })}
        </div>

        <div className="mt-auto pt-space-xl">
          <div className="flex items-center justify-between gap-4 border-t border-surface-container-highest pt-space-md">
            <div>
              <div className="flex items-center gap-1.5">
                <Star size={15} className="fill-primary-container text-primary-container" />
                <span className="font-label-md text-label-md font-medium text-on-surface">
                  {item.rating}
                </span>
                <span className="text-[12px] text-on-surface-variant">({item.reviews})</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[20px] font-bold leading-6 text-on-surface">{item.price}</span>
                <span className="text-[13px] text-on-surface-variant">{item.priceLabel}</span>
              </div>
            </div>

            <span className="inline-flex h-10 shrink-0 items-center rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 font-label-md text-label-md font-medium text-on-surface transition-colors duration-300 group-hover:bg-surface-container-highest">
              Voir détails
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}