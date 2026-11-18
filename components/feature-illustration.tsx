import {
  ChartColumn,
  ClipboardCheck,
  FileUp,
  GraduationCap,
  HandCoins,
  Map,
  MessagesSquare,
  MonitorSmartphone,
  PiggyBank,
  ShieldCheck,
  Smartphone,
  Tractor,
  Truck,
  Users,
  Wallet,
  Warehouse,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  offline: WifiOff,
  payments: Wallet,
  attendance: ClipboardCheck,
  messages: MessagesSquare,
  members: Users,
  savings: PiggyBank,
  reports: ChartColumn,
  mobile: Smartphone,
  upload: FileUp,
  qualification: GraduationCap,
  isolation: ShieldCheck,
  land: Map,
  equipment: Tractor,
  warehouse: Warehouse,
  transport: Truck,
  sponsorship: HandCoins,
  channels: MonitorSmartphone,
};

/**
 * Brand illustration for features without a supplied screenshot: the
 * feature's icon on navy, wired into the oak leaf's circuit-and-node motif.
 * Deliberately abstract, so it never passes for a real product screen.
 */
export function FeatureIllustration({ name }: { name: string }) {
  const Icon = icons[name] ?? ShieldCheck;
  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-2xl bg-navy-950 ring-1 ring-navy-800">
      <div aria-hidden="true" className="absolute -top-10 -right-10 -z-10 size-64 rounded-full bg-blue-500/15 blur-3xl" />
      <svg aria-hidden="true" viewBox="0 0 320 200" className="absolute inset-0 size-full" fill="none">
        <g stroke="#C4966C" strokeOpacity="0.45" strokeWidth="1.2">
          <path d="M160 100 H232 L262 70 H300" />
          <path d="M160 100 H222 L250 128 H292" />
          <path d="M160 100 H96 L70 72 H24" />
          <path d="M160 100 H104 L80 138 H34" />
          <path d="M160 100 V168 L184 190" strokeOpacity="0.3" />
        </g>
        <g fill="#0D1B2A" stroke="#1380CC" strokeWidth="2">
          <circle cx="300" cy="70" r="5" />
          <circle cx="292" cy="128" r="5" />
          <circle cx="24" cy="72" r="5" />
          <circle cx="34" cy="138" r="5" />
        </g>
        <g fill="#4FA8E8">
          <circle cx="300" cy="70" r="1.8" />
          <circle cx="292" cy="128" r="1.8" />
          <circle cx="24" cy="72" r="1.8" />
          <circle cx="34" cy="138" r="1.8" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-2xl bg-navy-900 text-blue-400 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10 sm:size-24">
          <Icon className="size-9 sm:size-10" strokeWidth={1.6} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
