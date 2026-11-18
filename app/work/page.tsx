import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/home/cta-band";
import { WorkFilter } from "@/components/work/work-filter";
import { activeWorkTags, work } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Oakteck's founder: e-commerce to ERP sync, Odoo-backed real estate, AI CV review, barcode inventory and marketing sites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/work", label: "Work" }]}
        eyebrow="Selected work"
        title="Systems in production."
        intro="Projects shipped by Oakteck's founder, Justice Amankrah. Each is labelled as a founder's project: these are not Oakteck products."
      />
      <section aria-label="Case studies" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <WorkFilter items={work} tags={activeWorkTags} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
