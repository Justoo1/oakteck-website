import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Strong roots. Smart systems.";
export const size = ogSize;
export const contentType = ogContentType;

export const dynamic = "force-static";

export default function Image() {
  return renderOg({ title: "Strong roots. Smart systems.", eyebrow: "About Oakteck" });
}
