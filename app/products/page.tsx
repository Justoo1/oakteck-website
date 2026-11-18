import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { products } from "@/content/products";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Oakteck's own products: Kwanix for bus ticketing and parcels, FlexiFund for credit unions, WASSCE Analytics for schools, Nkabom for daycares and AgriConnect for agriculture.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/products", label: "Products" }]}
        eyebrow="Our products"
        title="Products built for Ghanaian businesses."
        intro="Software we design, build and run ourselves, for transport, savings, schools, daycares and agriculture. Pricing is on request: tell us about your business and we'll arrange a demo."
      />
      <section aria-label="All products" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <h2 className="sr-only">All products</h2>
          <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <StaggerItem as="li" key={p.slug}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBand
        title="Have a problem none of these solve?"
        body="Most of our products started as one business's problem. Tell us yours."
      />
    </>
  );
}
