"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const WHITE = "#FFFFFF";
const EMERALD = "#10B981";
const GRAY = "#8E9192";
const DARK_GRAY = "#444748";
const GRID = "#2A2A2A";

interface TooltipEntry {
  name?: string | number;
  value?: string | number;
  color?: string;
  dataKey?: string | number;
}

function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  formatter?: (value: number, name?: string) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#141414] px-3 py-2 shadow-xl">
      <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const value = typeof entry.value === "number" ? entry.value : Number(entry.value ?? 0);
          return (
            <div key={`${entry.name}-${index}`} className="flex items-center gap-2 text-[11px]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color ?? WHITE }}
              />
              <span className="text-on-surface-variant">{entry.name}</span>
              <span className="ml-auto font-semibold text-on-surface">
                {formatter ? formatter(value, entry.name ? String(entry.name) : undefined) : value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const axisProps = {
  tick: { fill: "#9B9D9E", fontSize: 9 },
  axisLine: false,
  tickLine: false,
};

const euro = (value: number) => `${Math.round(value / 1000)}k €`;
const numberFr = (value: number) =>
  value.toLocaleString("fr-FR", { maximumFractionDigits: 0 });

function ChartFrame({ height, children }: { height: number; children: React.ReactNode }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}

export function LegendDot({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-on-surface-variant">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
      {value && <span className="font-semibold text-on-surface">{value}</span>}
    </span>
  );
}

export function SignupsChart({
  data,
  height = 230,
}: {
  data: { label: string; inscriptions: number; actifs: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="fillWhiteSignups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={WHITE} stopOpacity={0.22} />
            <stop offset="100%" stopColor={WHITE} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillEmeraldSignups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={EMERALD} stopOpacity={0.28} />
            <stop offset="100%" stopColor={EMERALD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} tickFormatter={numberFr} width={44} />
        <Tooltip
          content={<ChartTooltip formatter={(value) => value.toLocaleString("fr-FR")} />}
          cursor={{ stroke: "rgba(255,255,255,0.15)" }}
        />
        <Area
          type="monotone"
          dataKey="inscriptions"
          name="Total inscriptions"
          stroke={WHITE}
          strokeWidth={2}
          fill="url(#fillWhiteSignups)"
          dot={false}
          activeDot={{ r: 4, fill: WHITE, stroke: "#171717", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="actifs"
          name="Utilisateurs actifs (DAU)"
          stroke={EMERALD}
          strokeWidth={2}
          fill="url(#fillEmeraldSignups)"
          dot={false}
          activeDot={{ r: 4, fill: EMERALD, stroke: "#171717", strokeWidth: 2 }}
        />
      </AreaChart>
    </ChartFrame>
  );
}

export function MrrChart({
  data,
  height = 230,
}: {
  data: { label: string; mrr: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 6, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="fillMrr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={WHITE} stopOpacity={0.24} />
            <stop offset="100%" stopColor={WHITE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} tickFormatter={euro} width={44} />
        <Tooltip
          content={<ChartTooltip formatter={(value) => `${value.toLocaleString("fr-FR")} €`} />}
          cursor={{ stroke: "rgba(255,255,255,0.15)" }}
        />
        <Area
          type="monotone"
          dataKey="mrr"
          name="MRR"
          stroke={WHITE}
          strokeWidth={2}
          fill="url(#fillMrr)"
          dot={false}
          activeDot={{ r: 4, fill: WHITE, stroke: "#171717", strokeWidth: 2 }}
        />
      </AreaChart>
    </ChartFrame>
  );
}

export function RevenueVolumeChart({
  data,
  height = 280,
}: {
  data: { label: string; mrr: number; volume: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 6, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={WHITE} stopOpacity={0.2} />
            <stop offset="100%" stopColor={WHITE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} tickFormatter={euro} width={44} />
        <Tooltip
          content={
            <ChartTooltip
              formatter={(value, name) =>
                name === "Volume licences"
                  ? `${value.toLocaleString("fr-FR")} licences`
                  : `${value.toLocaleString("fr-FR")} €`
              }
            />
          }
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar dataKey="volume" name="Volume licences" fill="#3A3939" radius={[3, 3, 0, 0]} barSize={18} />
        <Area
          type="monotone"
          dataKey="mrr"
          name="MRR"
          stroke={WHITE}
          strokeWidth={2}
          fill="url(#fillRevenue)"
          dot={false}
          activeDot={{ r: 4, fill: WHITE, stroke: "#171717", strokeWidth: 2 }}
        />
      </ComposedChart>
    </ChartFrame>
  );
}

export function ClonesBarChart({
  data,
  height = 190,
}: {
  data: { label: string; clones: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.clones));
  return (
    <ChartFrame height={height}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={4} />
        <YAxis {...axisProps} width={38} />
        <Tooltip
          content={<ChartTooltip formatter={(value) => `${value.toLocaleString("fr-FR")} clones`} />}
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar dataKey="clones" name="Clones" radius={[4, 4, 0, 0]} barSize={26}>
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.clones === max ? EMERALD : WHITE} fillOpacity={entry.clones === max ? 1 : 0.82} />
          ))}
        </Bar>
      </BarChart>
    </ChartFrame>
  );
}

export function UsersEvolutionChart({
  data,
  height = 240,
}: {
  data: { label: string; cumules: number; actifs: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="fillCumules" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={WHITE} stopOpacity={0.2} />
            <stop offset="100%" stopColor={WHITE} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillActifs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={EMERALD} stopOpacity={0.25} />
            <stop offset="100%" stopColor={EMERALD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} tickFormatter={numberFr} width={44} />
        <Tooltip
          content={<ChartTooltip formatter={(value) => value.toLocaleString("fr-FR")} />}
          cursor={{ stroke: "rgba(255,255,255,0.15)" }}
        />
        <Area
          type="monotone"
          dataKey="cumules"
          name="Inscriptions cumulées"
          stroke={WHITE}
          strokeWidth={2}
          fill="url(#fillCumules)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="actifs"
          name="Actifs hebdomadaires"
          stroke={EMERALD}
          strokeWidth={2}
          fill="url(#fillActifs)"
          dot={false}
        />
      </AreaChart>
    </ChartFrame>
  );
}

export function FormulaDonut({
  data,
  total,
  height = 220,
}: {
  data: { name: string; value: number; percent: string; color: string }[];
  total: string;
  height?: number;
}) {
  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="66%"
            outerRadius="92%"
            paddingAngle={2}
            stroke="#201F1F"
            strokeWidth={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={<ChartTooltip formatter={(value) => value.toLocaleString("fr-FR")} />}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] uppercase tracking-wide text-on-surface-variant">Total comptes</span>
        <span className="mt-0.5 text-[22px] font-bold text-on-surface">{total}</span>
      </div>
    </div>
  );
}

export function RevenueProjectionChart({
  height = 220,
}: {
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <LineChart data={revenueProjectionData} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} tickFormatter={euro} width={44} />
        <Tooltip
          content={<ChartTooltip formatter={(value) => `${value.toLocaleString("fr-FR")} €`} />}
          cursor={{ stroke: "rgba(255,255,255,0.15)" }}
        />
        <Line
          type="monotone"
          dataKey="reel"
          name="Revenu réel"
          stroke={WHITE}
          strokeWidth={2}
          dot={{ r: 2.5, fill: WHITE }}
          activeDot={{ r: 4 }}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="projection"
          name="Projection"
          stroke={GRAY}
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
        />
      </LineChart>
    </ChartFrame>
  );
}

const revenueProjectionData = [
  { label: "Sep", reel: 34800, projection: 36200 },
  { label: "Oct", reel: 38200, projection: 39800 },
  { label: "Nov", reel: 42100, projection: 43600 },
  { label: "Déc", reel: 48250, projection: 47100 },
  { label: "Jan", reel: undefined, projection: 50800 },
  { label: "Fév", reel: undefined, projection: 54200 },
  { label: "Mar", reel: undefined, projection: 58100 },
];

export function GeneratorMixChart({
  data,
  height = 220,
}: {
  data: { name: string; jobs: number; clones: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 12, left: 4, bottom: 0 }}
        barGap={2}
      >
        <CartesianGrid stroke={GRID} strokeDasharray="3 4" horizontal={false} />
        <XAxis type="number" {...axisProps} tickFormatter={numberFr} />
        <YAxis
          type="category"
          dataKey="name"
          {...axisProps}
          width={150}
          tick={{ fill: "#C4C7C8", fontSize: 9 }}
        />
        <Tooltip
          content={<ChartTooltip formatter={(value) => value.toLocaleString("fr-FR")} />}
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar dataKey="jobs" name="Inférences IA" fill={WHITE} radius={[0, 3, 3, 0]} barSize={8} />
        <Bar dataKey="clones" name="Clones" fill={DARK_GRAY} radius={[0, 3, 3, 0]} barSize={8} />
      </BarChart>
    </ChartFrame>
  );
}

export function Sparkline({
  data,
  color = EMERALD,
  height = 36,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const points = data
    .map((value, index) => `${(index / Math.max(1, data.length - 1)) * 100},${100 - value}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
