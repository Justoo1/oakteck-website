import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Oakteck: Software that helps Ghanaian businesses run and grow.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Software that helps Ghanaian businesses run and grow.", eyebrow: "Oakteck · Accra, Ghana" });
}
