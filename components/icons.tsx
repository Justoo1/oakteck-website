import {
  Baby,
  Boxes,
  Building2,
  Bus,
  Cloud,
  GraduationCap,
  Landmark,
  Layers,
  PenTool,
  PiggyBank,
  Pill,
  School,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Sprout,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { githubIcon, whatsappIcon, type BrandIconData } from "@/components/brand/brand-icons";
import type { SectorIcon } from "@/content/products";
import type { ServiceIcon } from "@/content/services";

export const sectorIcons: Record<SectorIcon, LucideIcon> = {
  bus: Bus,
  baby: Baby,
  "piggy-bank": PiggyBank,
  "graduation-cap": GraduationCap,
  sprout: Sprout,
};

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  layers: Layers,
  smartphone: Smartphone,
  boxes: Boxes,
  wallet: Wallet,
  sparkles: Sparkles,
  cloud: Cloud,
  "pen-tool": PenTool,
};

export const industryIcons = {
  bus: Bus,
  school: School,
  landmark: Landmark,
  building: Building2,
  "shopping-bag": ShoppingBag,
  pill: Pill,
} satisfies Record<string, LucideIcon>;

/** Renders a Simple Icons (CC0) brand glyph. */
export function BrandGlyph({ icon, className }: { icon: BrandIconData; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return <BrandGlyph icon={whatsappIcon} className={className} />;
}

export function GitHubIcon({ className }: { className?: string }) {
  return <BrandGlyph icon={githubIcon} className={className} />;
}
