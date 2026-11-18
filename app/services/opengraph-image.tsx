import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Custom software, ERP, payments, AI and apps.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Custom software, ERP, payments, AI and apps.", eyebrow: "Services" });
}
