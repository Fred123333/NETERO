"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer le mode sombre ou clair"
      className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary-fixed-dim hover:text-on-surface hover:bg-surface-bright transition-colors"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}