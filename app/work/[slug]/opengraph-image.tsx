import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getWork, work } from "@/content/work";

export const alt = "Oakteck case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export const dynamic = "force-static";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  return renderOg({ title: w?.title ?? "Selected work", eyebrow: w?.label });
}
