import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name}: ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.supportingLine,
    start_url: "/",
    display: "standalone",
    background_color: "#0D1B2A",
    theme_color: siteConfig.brand.themeColor,
    icons: [
      { src: "/brand/oakteck-app-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/oakteck-app-icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
