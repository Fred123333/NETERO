"use client";

import { ArrowDownRight, ArrowUpRight, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminTone } from "@/lib/data/admin";

export const adminToneClasses: Record<AdminTone, string> = {
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  danger: "border-red-500/25 bg-red-500/10 text-red-300",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  neutral: "border-white/10 bg-white/[0.04] text-on-surface-variant",
};

export function AdminBadge({
  tone = "neutral",
  children,
  dot = false,
  className,
}: {
  tone?: AdminTone;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        adminToneClasses[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
  badge,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
          {eyebrow}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-on-surface">{title}</h1>
          {badge}
        </div>
        {description && (
          <p className="mt-1.5 max-w-[820px] text-[12px] leading-relaxed text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminKpiCard({
  label,
  value,
  hint,
  trend,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4",
        accent
          ? "border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-[#201F1F]"
          : "border-white/10 bg-[#201F1F]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-on-surface-variant">
          {label}
        </p>
        {icon && (
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
              accent ? "bg-emerald-500/15 text-emerald-300" : "bg-white/[0.06] text-on-surface-variant"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-[24px] font-bold leading-none tracking-tight text-on-surface">{value}</p>
      {hint && (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-[11px]",
            trend === "up"
              ? "text-emerald-400"
              : trend === "down"
                ? "text-red-300"
                : "text-on-surface-variant"
          )}
        >
          {trend && <TrendIcon size={12} />}
          <span className="text-on-surface-variant">{hint}</span>
        </p>
      )}
    </div>
  );
}

export function AdminPanel({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className={cn("rounded-xl border border-white/10 bg-[#201F1F]", className)}>
      {children}
    </div>
  );
}

export function AdminPanelHeader({
  title,
  description,
  action,
  icon,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3 px-4 py-3.5 sm:px-5", className)}>
      <div className="flex min-w-0 items-start gap-2.5">
        {icon && <span className="mt-0.5 text-emerald-400">{icon}</span>}
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold leading-tight text-on-surface">{title}</h2>
          {description && (
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function AdminSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold text-on-surface">{children}</h2>
  );
}

export function AdminButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "h-8 px-2.5 text-[11px]" : "h-9 px-3.5 text-[12px]",
        variant === "primary" && "bg-white text-[#171717] hover:bg-white/90",
        variant === "secondary" &&
          "border border-white/10 bg-[#201F1F] text-on-surface hover:border-white/20 hover:bg-[#2A2A2A]",
        variant === "ghost" && "text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface",
        variant === "danger" && "border border-red-500/25 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-white/10 bg-[#1C1B1B] px-3 text-[12px] text-on-surface placeholder:text-on-surface-variant/70 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/30",
        className
      )}
      {...props}
    />
  );
}

export function AdminSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 rounded-lg border border-white/10 bg-[#1C1B1B] px-2.5 text-[11px] text-on-surface-variant focus:border-emerald-500/40 focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function AdminTabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
            value === tab.value
              ? "border-white/15 bg-white/10 text-on-surface"
              : "border-transparent text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function AdminTableShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("overflow-x-auto", className)}>{children}</div>;
}

export function AdminTh({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-3 py-2.5 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant",
        className
      )}
    >
      {children}
    </th>
  );
}

export function AdminTd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-3 py-3 align-middle text-[11px] text-on-surface", className)}>{children}</td>;
}

export function AdminModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#201F1F] p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-on-surface">{title}</h3>
            {description && <p className="mt-1 text-[11px] text-on-surface-variant">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
          >
            <X size={15} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-5 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant">
      {children}
    </span>
  );
}

export function AdminProgress({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "white" | "red" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500",
          tone === "emerald" && "bg-emerald-400",
          tone === "white" && "bg-white",
          tone === "red" && "bg-red-400"
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
