/**
 * Which host this build targets (see next.config.ts). Read at build time.
 */
export const isCloudflareBuild = process.env.DEPLOY_TARGET === "cloudflare";

export const hosting = isCloudflareBuild
  ? { provider: "Cloudflare", analytics: "Cloudflare Web Analytics" }
  : { provider: "Vercel", analytics: "Vercel Web Analytics" };

/** Cloudflare Web Analytics site token (dashboard → Analytics & Logs → Web Analytics). */
export const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;
