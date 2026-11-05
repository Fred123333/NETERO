"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "section, [data-reveal]";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;

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
      elements.forEach((el, index) => {
        if (el.classList.contains("is-visible")) return;
        el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;

        if (reduceMotion) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    scan();

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
