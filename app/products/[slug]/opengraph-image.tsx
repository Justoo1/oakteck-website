import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getProduct, products } from "@/content/products";

export const alt = "Oakteck product";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-static";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return renderOg({ title: p ? `${p.name}: ${p.category}` : "Oakteck products", eyebrow: p ? "Oakteck product" : undefined });
}
