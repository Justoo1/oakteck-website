import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { work } from "@/content/work";
import { publishedPosts } from "@/content/blog";
import { absoluteUrl } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/products", priority: 0.9 },
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: p.slug === "kwanix" ? 0.9 : 0.8 })),
    { path: "/work", priority: 0.7 },
    ...work.map((w) => ({ path: `/work/${w.slug}`, priority: 0.6 })),
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    // Drafts stay out until published.
    ...(publishedPosts.length ? [{ path: "/blog", priority: 0.5 }] : []),
    ...publishedPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.5 })),
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority }));
}
