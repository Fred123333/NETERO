"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { CatalogueCard } from "./CatalogueCard";
import {
  catalogueAccess,
  catalogueBoilerplates,
  catalogueCategories,
  catalogueStacks,
  type CatalogueAccess,
  type CatalogueCategory,
} from "@/lib/data/catalogue";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "popular", label: "Plus populaires" },
  { value: "rating", label: "Mieux notés" },
  { value: "price", label: "Prix croissant" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const stats = [
  { value: "24", label: "Boilerplates dispo", accent: false },
  { value: "12,450+", label: "Déploiements", accent: true },
  { value: "100%", label: "TypeScript Strict", accent: false },
];

function priceValue(price: string) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export function CataloguePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"Tous" | CatalogueCategory>("Tous");
  const [access, setAccess] = useState<"Tous" | CatalogueAccess | "Bundles">("Tous");
  const [selectedStacks, setSelectedStacks] = useState<string[]>(["Next.js 15"]);
  const [sort, setSort] = useState<SortValue>("popular");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = catalogueBoilerplates.filter((item) => {
      if (category !== "Tous" && item.category !== category) return false;

      if (access !== "Tous") {
        if (access === "Bundles" ? item.access !== "Bundle" : item.access !== access) return false;
      }

      if (selectedStacks.length > 0 && !selectedStacks.every((stack) => item.stacks.includes(stack))) {
        return false;
      }

      if (!query) return true;

      const haystack = [
        item.name,
        item.description,
        item.category,
        ...item.stacks,
        ...item.tags.map((tag) => tag.label),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });

    return results.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return priceValue(a.price) - priceValue(b.price);
      return b.popularity - a.popularity;
    });
  }, [access, category, search, selectedStacks, sort]);

  const resultsTotal =
    filtered.length === catalogueBoilerplates.length ? 24 : filtered.length;
  const displayedCount = Math.min(filtered.length, 6);

  function toggleStack(stack: string) {
    setSelectedStacks((current) =>
      current.includes(stack) ? current.filter((item) => item !== stack) : [...current, stack]
    );
  }

  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-7xl px-gutter pb-16 pt-9">
        <div className="flex flex-col gap-space-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-175">
            <span className="inline-flex items-center gap-2 rounded border border-outline-variant/40 px-3 py-1.5 font-label-sm text-[11px] font-medium uppercase tracking-[0.08em] text-secondary-fixed-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
              Production-ready Next.js repositories
            </span>

            <h1 className="mt-space-md font-headline-lg text-headline-lg font-bold tracking-[-0.02em] text-on-surface">
              Catalogue des Boilerplates FullStack
              <span
                aria-hidden="true"
                className="ml-5 hidden h-7 w-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.5),rgba(255,215,0,0.04)_72%)] align-middle blur-[2px] sm:inline-block"
              />
            </h1>

            <p className="mt-space-sm max-w-172.5 font-body-lg text-body-lg text-on-surface-variant">
              Explorez notre collection de templates Next.js 15 pré-configurés, testés et prêts
              pour la production avec intégrations IA natives.
            </p>
          </div>

          <div className="shrink-0 self-start rounded-xl border border-outline-variant/40 bg-surface-container px-5 py-3 lg:self-center">
            <div className="flex items-center divide-x divide-outline-variant/40">
              {stats.map((stat, index) => (
                <div key={stat.label} className={cn("px-5", index === 0 && "pl-0", index === 2 && "pr-0")}>
                  <div
                    className={cn(
                      "text-[20px] font-bold leading-6",
                      stat.accent ? "text-primary-container" : "text-on-surface"
                    )}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-0.5 whitespace-nowrap text-[11px] text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-space-xl">
          <div className="flex flex-col gap-space-md lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher par nom, technologie, cas d'usage..."
                className="h-12 w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest pl-12 pr-20 text-[14px] text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary-container"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 inline-flex h-7 min-w-8 -translate-y-1/2 items-center justify-center rounded bg-surface-container-high px-2 font-sans text-[12px] font-medium text-on-surface">
                ⌘K
              </kbd>
            </div>

            <div className="flex items-center gap-space-md">
              <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.08em] text-on-surface-variant">
                Trier par:
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortValue)}
                  className="h-12 w-43 cursor-pointer appearance-none rounded-lg border border-outline-variant/40 bg-surface-container-lowest pl-4 pr-10 text-[14px] text-on-surface outline-none transition-colors focus:border-primary-container"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
              </div>
            </div>
          </div>

          <div className="mt-space-lg flex flex-col gap-space-md xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {catalogueCategories.map((item) => {
                const active = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={active}
                    className={cn(
                      "h-9 rounded-lg px-4 text-[14px] transition-colors duration-200",
                      active
                        ? "border border-primary-container bg-transparent font-medium text-primary-container"
                        : "bg-surface-container-low text-secondary-fixed-dim hover:bg-surface-container-high hover:text-on-surface"
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="inline-flex w-fit items-center gap-1 rounded-lg border border-outline-variant/40 p-1">
              {catalogueAccess.map((item) => {
                const active = access === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAccess(item)}
                    aria-pressed={active}
                    className={cn(
                      "h-8 rounded-md px-3 text-[13px] transition-colors duration-200",
                      active
                        ? "bg-surface-container-high font-medium text-on-surface"
                        : "text-secondary-fixed-dim hover:text-on-surface"
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-space-lg flex flex-wrap items-center gap-3">
            <span className="text-[13px] text-on-surface-variant">Stacks :</span>
            {catalogueStacks.map((stack) => {
              const selected = selectedStacks.includes(stack);
              return (
                <button
                  key={stack}
                  type="button"
                  onClick={() => toggleStack(stack)}
                  aria-pressed={selected}
                  className="inline-flex h-8 items-center gap-2 rounded-md border border-outline-variant/40 px-2.5 text-[13px] text-secondary-fixed-dim transition-colors duration-200 hover:bg-surface-container-low hover:text-on-surface"
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-xs border transition-colors",
                      selected
                        ? "bg-primary-container border-primary-container"
                        : "bg-transparent border-outline-variant"
                    )}
                  />
                  {stack}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-space-xl grid grid-cols-1 gap-space-lg md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <CatalogueCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-space-xl rounded-xl border border-outline-variant/40 bg-surface-container-low px-6 py-16 text-center">
            <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Aucun boilerplate trouvé
            </p>
            <p className="mt-2 text-[14px] text-on-surface-variant">
              Modifiez vos filtres ou votre recherche pour découvrir d&apos;autres templates.
            </p>
          </div>
        )}

        <div className="mt-space-xl flex flex-col gap-space-md border-t border-outline-variant/30 pt-space-lg sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-on-surface-variant">
            Affichage de {filtered.length === 0 ? 0 : 1} à {displayedCount} sur{" "}
            <span className="font-medium text-on-surface">{resultsTotal}</span> résultats
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Page précédente"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-surface-container-high text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                aria-current={page === 1 ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md text-[14px] transition-colors",
                  page === 1
                    ? "bg-primary-container font-semibold text-[#171717]"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                )}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1 rounded-md bg-surface-container-high px-3 text-[14px] text-on-surface transition-colors hover:bg-surface-container-highest"
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}