import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon?: LucideIcon;
  label: string;
  variant?: "default" | "primary" | "outline";
  className?: string;
}

export function SectionBadge({ icon: Icon, label, variant = "default", className }: Props) {
  const variants = {
    default: "bg-surface-container-highest text-secondary-fixed-dim",
    primary: "bg-[var(--primary-container)] text-[var(--on-primary-container)]",
    outline: "border border-outline-variant text-on-surface-variant",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5  font-label-sm text-label-sm font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon size={13} />}
      {label}
    </span>
  );
}