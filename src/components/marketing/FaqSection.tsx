"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { faqItems } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <section className="w-full px-gutter py-space-xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-space-xl">
          <h2 className="text-primary text-xl">Réponses Claires</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Questions Fréquentes
          </h2>
        </div>
        <Accordion className="space-y-space-md">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-surface-container rounded-xl overflow-hidden shadow-sm border-0"
            >
              <AccordionTrigger className="px-space-lg py-space-md hover:no-underline font-label-md text-label-md font-semibold text-on-surface">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-space-lg pb-space-md font-body-md text-body-md text-secondary-fixed-dim">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}