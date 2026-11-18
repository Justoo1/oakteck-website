import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { products } from "@/content/products";

export function ProductsGrid() {
  return (
    <section aria-labelledby="products-title" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="products-title"
          eyebrow="Our products"
          title="Products we build and run ourselves."
          intro="Each one started with a real problem in a Ghanaian business. Three are live today; two are in development."
        />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <StaggerItem as="li" key={p.slug}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
