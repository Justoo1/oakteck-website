import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Let's talk about your business.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Let's talk about your business.", eyebrow: "Contact" });
}
