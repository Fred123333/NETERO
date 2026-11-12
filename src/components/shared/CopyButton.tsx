"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyButton({
  text,
  label = "Installation CLI rapide :",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
        {label ? <span className="font-mono">{label}</span> : <span />}
        <span
          className={`text-[#FFD700] font-semibold transition-opacity ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Copié !
        </span>
      </div>
      <div className="flex items-center justify-between bg-surface-container-lowest p-2 rounded border border-outline-variant/30 font-code text-code-snippet">
        <span className="text-on-surface truncate text-[12px]">{text}</span>
        <button
          onClick={copy}
          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors shrink-0 ml-2"
          title="Copier la commande"
          type="button"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}