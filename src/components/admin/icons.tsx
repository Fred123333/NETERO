import {
  Activity,
  Bell,
  Clock,
  Cpu,
  CreditCard,
  Crown,
  Download,
  Euro,
  GitBranch,
  Layers,
  Receipt,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  users: Users,
  activity: Activity,
  layers: Layers,
  crown: Crown,
  sparkles: Sparkles,
  euro: Euro,
  credit: CreditCard,
  "user-plus": UserPlus,
  shield: ShieldCheck,
  trending: TrendingUp,
  receipt: Receipt,
  clock: Clock,
  download: Download,
  star: Star,
  cpu: Cpu,
  github: GitBranch,
  rocket: Rocket,
  bell: Bell,
};

export function AdminKpiIcon({ name, size = 14 }: { name?: string; size?: number }) {
  const Icon = (name && map[name]) || Activity;
  return <Icon size={size} />;
}
