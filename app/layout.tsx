import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { cloudflareAnalyticsToken, isCloudflareBuild } from "@/lib/hosting";
import { founderSchema, graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/site.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // Body text paints in the size-matched fallback and swaps in; only the
  // heading font is preloaded, so the first screen competes for less bandwidth.
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name, url: siteConfig.links.portfolio }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

/** Every page on this site must be fully static; the build fails if one isn't. */
export const dynamic = "error";

export const viewport: Viewport = {
  themeColor: siteConfig.brand.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* `js`: enables scroll-reveal hiding only when JS runs, so content is never stuck invisible.
            `hl-go`: starts the hero vein animation once the page has loaded and is idle. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');addEventListener('load',function(){(window.requestIdleCallback||setTimeout)(function(){d.classList.add('hl-go')},{timeout:1500})})",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-white px-4 py-2 font-heading text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
        <JsonLd data={graph(organizationSchema(), founderSchema(), websiteSchema())} />
        {/* Cookieless analytics: Vercel Web Analytics on Vercel, Cloudflare Web Analytics on Cloudflare. */}
        {process.env.VERCEL && <Analytics />}
        {isCloudflareBuild && cloudflareAnalyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
