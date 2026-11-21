import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesGrid } from "@/components/home/services-grid";
import { KwanixSpotlight } from "@/components/home/kwanix-spotlight";
import { ProductsGrid } from "@/components/home/products-grid";
import { HowWeWork } from "@/components/home/how-we-work";
import { SelectedWork } from "@/components/home/selected-work";
import { Testimonials } from "@/components/testimonials";
import { LiveInProduction } from "@/components/home/live-in-production";
import { hasSampleTestimonials } from "@/content/testimonials";
import { FounderNote } from "@/components/home/founder-note";
import { TechMarquee } from "@/components/home/tech-marquee";
import { CtaBand } from "@/components/home/cta-band";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <KwanixSpotlight />
      <ProductsGrid />
      <HowWeWork />
      <SelectedWork />
      {/* Until real client quotes replace the samples, show products in use instead. */}
      {hasSampleTestimonials && <LiveInProduction />}
      <Testimonials />
      <FounderNote />
      <TechMarquee />
      <CtaBand />
    </>
  );
}
