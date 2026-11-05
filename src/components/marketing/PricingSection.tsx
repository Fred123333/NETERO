import { Check } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { plans } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="tarifs" className="w-full px-gutter py-space-xl bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <h2 className="text-primary text-lg">Tarification Transparente</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Investissez une fois. Expédiez pour toujours.
          </h2>
          <p className="font-body-md text-body-md text-secondary-fixed-dim mt-space-sm">
            Zéro abonnement récurrent pour les développeurs autonomes. Détenez votre code de façon
            perpétuelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "p-space-xl rounded-2xl flex flex-col justify-between relative",
                plan.highlighted ? "bg-surface-container-high shadow-2xl" : "bg-surface-container shadow-xl"
              )}
            >
              {plan.ribbon && (
                <div className="absolute -top-3 right-6">
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold rounded-full shadow-md">
                    {plan.ribbon}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {plan.name}
                  </span>
                  <span
                    className={cn(
                      " font-label-sm text-label-sm",
                      plan.highlighted
                        ? " text-primary-container font-semibold"
                        : " text-secondary-fixed-dim"
                    )}
                  >
                    {plan.highlighted ? "Licence à vie" : "Gratuit"}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary-fixed-dim mt-space-xs">
                  {plan.description}
                </p>
                <div className="my-space-lg">
                  <span
                    className={cn(
                      "text-headline-lg font-bold",
                      plan.highlighted ? "text-primary-container" : "text-on-surface"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span className="text-secondary-fixed-dim font-body-sm text-body-sm">
                    {" "}
                    {plan.priceSuffix}
                  </span>
                </div>
                <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-space-xs">
                      <Check size={18} className="text-primary-container shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-space-xl">
                <button
                  className={cn(
                    "w-full py-3.5 rounded-full font-label-md text-label-md transition-all",
                    plan.highlighted
                      ? "bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-bold shadow-lg active:scale-95"
                      : "bg-surface-container-highest hover:bg-surface-bright text-on-surface font-semibold"
                  )}
                >
                  {plan.cta}
                </button>
                {plan.highlighted && (
                  <div className="text-center mt-2 font-body-sm text-body-sm text-secondary-fixed-dim">
                    Garantie satisfait ou remboursé 14 jours sans condition.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
