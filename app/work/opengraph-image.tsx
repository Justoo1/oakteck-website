import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Systems in production.";
export const size = ogSize;
export const contentType = ogContentType;

export const dynamic = "force-static";

export default function Image() {
  return renderOg({ title: "Systems in production.", eyebrow: "Selected work" });
}
