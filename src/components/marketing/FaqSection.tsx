"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <section className="w-full px-gutter py-space-xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-space-xl">
          <h2 className="text-primary-text text-xl">Réponses Claires</h2>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Questions Fréquentes
          </h2>
        </div>
        <Accordion className="space-y-space-md">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low shadow-sm transition-colors hover:bg-surface-container"
            >
              <AccordionTrigger className="px-space-lg py-space-md font-label-md text-label-md font-semibold text-on-surface hover:no-underline aria-expanded:bg-surface-container aria-expanded:text-primary-text">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-space-lg pb-space-md font-body-md text-body-md text-on-surface-variant">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}