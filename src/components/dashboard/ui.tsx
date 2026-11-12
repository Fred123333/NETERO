import { cn } from "@/lib/utils";

export type Tone = "success" | "warning" | "info" | "neutral" | "danger";

const toneClasses: Record<Tone, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  warning: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/25",
  info: "bg-sky-500/10 text-sky-400 border-sky-500/25",
  neutral: "bg-surface-container-high text-on-surface-variant border-outline-variant/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/25",
};

export function StatusPill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-label-sm text-[10px] font-semibold",
        toneClasses[tone],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="font-label-sm text-label-sm font-semibold uppercase tracking-wide text-[#FFD700]">
          {eyebrow}
        </p>
        <h1 className="mt-1 font-headline-lg text-[26px] font-bold tracking-tight text-on-surface sm:text-headline-lg">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-3xl font-body-md text-body-md text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border border-outline-variant/20 bg-surface-container",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-outline-variant/20 px-5 py-4">
      <div className="flex items-start gap-2.5">
        {icon && <span className="mt-0.5 text-[#FFD700]">{icon}</span>}
        <div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title}</h2>
          {description && (
            <p className="mt-0.5 font-body-sm text-[12px] text-on-surface-variant">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 sm:p-5",
        accent
          ? "border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-surface-container"
          : "border-outline-variant/20 bg-surface-container"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant">
          {label}
        </span>
        {icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              accent
                ? "bg-[#FFD700]/15 text-[#FFD700]"
                : "bg-surface-container-high text-on-surface-variant"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 font-headline-lg text-3xl font-bold text-on-surface">{value}</div>
      {hint && <div className="mt-1 font-body-sm text-[11px] text-on-surface-variant">{hint}</div>}
    </div>
  );
}

export function Bar({ value, className }: { value: number; className?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
      <div
        className={cn("h-full rounded-full bg-[#FFD700]", className)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-5 py-8 text-center font-body-sm text-body-sm text-on-surface-variant">
      {children}
    </p>
  );
}
