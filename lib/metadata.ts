import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

/**
 * Per-page metadata with consistent canonical, Open Graph and Twitter tags.
 * (A page's `openGraph` replaces the root one rather than merging, so every
 * page goes through here.) OG images come from the opengraph-image files.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
