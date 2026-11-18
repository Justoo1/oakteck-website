import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/site.config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of search results (Vercel previews, or any build with NOINDEX=1).
  if ((process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") || process.env.NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
