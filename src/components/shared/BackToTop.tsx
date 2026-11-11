"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Remonter en haut de la page"
      className={cn(
        "fixed bottom-space-lg right-space-lg z-50 w-14 h-14 rounded-full",
        "bg-surface-container-highest text-on-surface shadow-[0_12px_32px_-4px_rgba(0,0,0,0.7)]",
        "flex items-center justify-center transition-all duration-300 cursor-pointer",
        "hover:bg-yellow-400 hover:text-black hover:-translate-y-1 hover:scale-110 active:scale-95",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp size={22} />
    </button>
  );
}
