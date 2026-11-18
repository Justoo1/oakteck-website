import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Custom software, ERP, payments, AI and apps.";
export const size = ogSize;
export const contentType = ogContentType;

export const dynamic = "force-static";

export default function Image() {
  return renderOg({ title: "Custom software, ERP, payments, AI and apps.", eyebrow: "Services" });
}
