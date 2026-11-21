import type { Route } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "@/components/app-link";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { StatusBadge } from "@/components/status-badge";
import { sectorIcons } from "@/components/icons";
import { getProduct, type Product } from "@/content/products";

/**
 * Proof from products already in use, shown in place of testimonials until
 * real client quotes replace the samples (see content/testimonials.ts).
 * Facts only: from docs/BRIEF.md section 5.
 */
const items: { slug: Product["slug"]; text: string; link: { label: string; href: string } }[] = [
  {
    slug: "kwanix",
    text: "Ticket sales, parcels with scan-to-load protection and live fleet tracking for Ghanaian inter-city bus companies.",
    link: { label: "kwanix.com", href: "https://kwanix.com" },
  },
  {
    slug: "flexifund",
    text: "Bethel COP Susu Enterprise (BCSE) runs its member website and back office on FlexiFund: savings, fixed deposits, personal loans, susu collections, Mobile Money and share capital.",
    link: { label: "bcse.edtmsys.com", href: "https://bcse.edtmsys.com" },
  },
  {
    slug: "wassce-analytics",
    text: "Senior high schools upload their WASSCE results and see grades, subject performance and university qualification for every student.",
    link: { label: "School sign-in", href: "https://wassceanalytics.ghsch.com" },
  },
];

export function LiveInProduction() {
  return (
    <section aria-labelledby="live-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="live-title"
          eyebrow="Live today"
          title="Live in production."
          intro="Three Oakteck products are live today, including FlexiFund in production at Bethel COP Susu Enterprise."
        />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item) => {
            const product = getProduct(item.slug)!;
            const Icon = sectorIcons[product.icon];
            return (
              <StaggerItem as="li" key={item.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy-950 text-blue-400">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <StatusBadge status={product.status} />
                      {product.statusNote && <span className="text-xs text-muted">{product.statusNote}</span>}
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{product.name}</h3>
                  <p className="mt-1 text-sm font-medium text-wood-700">{product.category}</p>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{item.text}</p>
                  <div className="mt-6 flex flex-col items-start gap-2 font-heading text-sm font-semibold">
                    <Link
                      href={`/products/${product.slug}` as Route}
                      className="link-underline inline-flex items-center gap-1.5 text-blue-600"
                    >
                      About {product.name} <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-muted hover:text-ink"
                    >
                      {item.link.label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
