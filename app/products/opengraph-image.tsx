import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Products built for Ghanaian businesses.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Products built for Ghanaian businesses.", eyebrow: "Products" });
}
