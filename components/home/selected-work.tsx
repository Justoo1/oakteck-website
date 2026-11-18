import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { WorkCard } from "@/components/work-card";
import { featuredWork } from "@/content/work";

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Systems the founder has shipped."
            intro="Integrations, ERP back offices and AI tools, in production for real businesses."
          />
          <Link
            href="/work"
            className="link-underline inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600"
          >
            See all work <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
          {featuredWork.map((w) => (
            <StaggerItem as="li" key={w.slug}>
              <WorkCard item={w} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
