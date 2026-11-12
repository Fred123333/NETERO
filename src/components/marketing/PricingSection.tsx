import { Check } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { plans } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="tarifs" className="w-full px-gutter py-space-xl bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <SectionBadge label="Tarification Transparente" className="bg-transparent text-[#FFD700]" />
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Investissez une fois. Expédiez pour toujours.
          </h2>
          <p className="font-body-md text-body-md text-secondary-fixed-dim mt-space-sm">
            Zéro abonnement récurrent imposé. Choisissez la formule qui correspond à votre rythme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "p-space-xl rounded-2xl flex flex-col justify-between relative",
                plan.highlighted
                  ? "bg-surface-container-high shadow-2xl border-2 border-[#FFD700]/40"
                  : "bg-surface-container shadow-xl"
              )}
            >
              {plan.ribbon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-3 py-1 bg-[#FFD700] text-[#171717] font-label-sm text-label-sm font-bold rounded-full shadow-md">
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
                      "px-2 py-0.5 rounded font-label-sm text-label-sm",
                      plan.highlighted
                        ? "bg-[#FFD700]/20 text-[#FFD700] font-semibold"
                        : plan.id === "lifetime"
                        ? "bg-[#FFD700]/10 text-[#FFD700]"
                        : "bg-surface-container-highest text-secondary-fixed-dim"
                    )}
                  >
                    {plan.id === "free" ? "Gratuit" : plan.id === "monthly" ? "Mensuel" : "À vie"}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary-fixed-dim mt-space-xs">
                  {plan.description}
                </p>
                <div className="my-space-lg">
                  <span
                    className={cn(
                      "text-headline-lg font-bold",
                      plan.highlighted || plan.id === "lifetime"
                        ? "text-[#FFD700]"
                        : "text-on-surface"
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
                    <li key={f} className="flex items-start gap-space-xs">
                      <Check size={18} className="text-[#FFD700] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-space-xl">
                <button
                  className={cn(
                    "w-full py-3.5 rounded-lg font-label-md text-label-md transition-all",
                    plan.highlighted
                      ? "bg-[#FFD700] hover:bg-[#e9c400] text-[#171717] font-bold shadow-lg active:scale-95"
                      : plan.id === "lifetime"
                      ? "bg-surface-container-highest hover:bg-[#FFD700] hover:text-[#171717] text-on-surface font-semibold"
                      : "bg-surface-container-highest hover:bg-surface-bright text-on-surface font-semibold"
                  )}
                >
                  {plan.cta}
                </button>
                {plan.highlighted && (
                  <div className="text-center mt-2 font-body-sm text-body-sm text-secondary-fixed-dim">
                    Garantie satisfait ou remboursé 14 jours.
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