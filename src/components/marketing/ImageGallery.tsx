"use client";

import { useState } from "react";
import { Monitor, ImageIcon } from "lucide-react";
import { GalleryItem } from "@/lib/data/boilerplate-details";

export function ImageGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/20">
      {/* Main preview — placeholder jaune */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-[#FFD700]/20 via-surface-container to-[#FFD700]/5 group shadow-xl border border-outline-variant/20">
        {/* Motif radial */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#FFD700 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Icône centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon size={64} className="text-[#FFD700]/40" strokeWidth={1.5} />
        </div>
        {/* Overlay caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent flex items-end p-space-md pointer-events-none">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-space-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              <span className="font-label-md text-label-md text-on-surface font-medium">
                {current.caption}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-container-highest/80 backdrop-blur-md text-on-surface text-label-sm font-code">
              <Monitor size={14} />
              1440x900
            </div>
          </div>
        </div>
      </div>

      {/* Thumbs — placeholders jaunes */}
      <div className="grid grid-cols-3 gap-space-sm">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative aspect-[16/10] rounded-lg overflow-hidden p-0.5 transition-all text-left ${
                isActive
                  ? "bg-[#FFD700]/40 scale-[1.02]"
                  : "bg-surface-container"
              }`}
              type="button"
            >
              <div className="relative w-full h-full rounded overflow-hidden bg-gradient-to-br from-[#FFD700]/15 to-surface-container-highest flex items-center justify-center">
                <ImageIcon size={28} className="text-[#FFD700]/50" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-surface-container-lowest/40 group-hover:bg-transparent transition-colors flex items-end p-2">
                  <span className="font-label-sm text-label-sm text-on-surface drop-shadow-md">
                    {item.thumbLabel}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}