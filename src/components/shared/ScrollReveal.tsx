"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "section, [data-reveal]";

function ScrollRevealInner() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;
    document.documentElement.classList.add("reveal-ready");
    document.documentElement.setAttribute("data-reveal-active", "true");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const scan = () => {
      const elements = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
      elements.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        if (reduceMotion) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    const timer = setTimeout(scan, 50);

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export function ScrollReveal() {
  return (
    <Suspense fallback={null}>
      <ScrollRevealInner />
    </Suspense>
  );
}