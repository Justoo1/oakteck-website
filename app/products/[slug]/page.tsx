import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { StatusBadge } from "@/components/status-badge";
import { DeviceFrame } from "@/components/device-frame";
import { FeatureIllustration } from "@/components/feature-illustration";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { sectorIcons } from "@/components/icons";
import { KwanixVideos } from "@/components/products/kwanix-videos";
import { getProduct, products, type Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name}: ${product.category}`,
    description: `${product.oneLine} ${product.problem.body.split(". ")[0]}.`,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default function ProductPage(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-navy-950" />}>
      <ProductDetails params={props.params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductHero product={product} />
      <Problem product={product} />
      <Features product={product} />
      {product.slug === "kwanix" && <KwanixVideos />}
      {product.slug === "flexifund" && <BcseReference />}
      <Audience product={product} />
      <CtaBand
        title={ctaTitle(product)}
        body={`Pricing for ${product.name} is on request. Tell us about your organisation and we'll take it from there.`}
      />
    </>
  );
}

function ctaTitle(p: Product) {
  if (p.slug === "agriconnect") return "Partner with us on AgriConnect.";
  if (p.slug === "nkabom") return "Run a daycare? Join the Nkabom pilot.";
  if (p.slug === "wassce-analytics") return "See your school's results the day they arrive.";
  if (p.slug === "kwanix") return "See Kwanix with your own routes and fares.";
  return `See ${p.name} in action.`;
}

function ProductHero({ product }: { product: Product }) {
  const Icon = sectorIcons[product.icon];
  const heroImage = product.features.find((f) => f.visual.kind === "image")?.visual;
  return (
    <PageHero
      crumbs={[
        { href: "/products", label: "Products" },
        { href: `/products/${product.slug}`, label: product.name },
      ]}
      eyebrow={
        <span className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2">
            <Icon className="size-4" aria-hidden="true" />
            {product.category}
          </span>
          <StatusBadge status={product.status} tone="dark" />
          {product.statusNote && <span className="normal-case tracking-normal text-mist">{product.statusNote}</span>}
        </span>
      }
      title={product.name}
      intro={product.oneLine}
      aside={
        heroImage && heroImage.kind === "image" ? (
          <DeviceFrame url={product.slug === "kwanix" ? "kwanix.com" : undefined}>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 560px, 100vw"
              preload
              className="block h-auto w-full"
            />
          </DeviceFrame>
        ) : undefined
      }
    >
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link href={product.cta.href as Route}>{product.cta.label}</Link>
        </Button>
        {product.links.map((l) => (
          <Button asChild size="lg" variant="outline-dark" key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ))}
      </div>
      {product.slug === "agriconnect" && <p className="mt-4 text-sm text-mist">Pilot enquiries welcome.</p>}
    </PageHero>
  );
}

function Problem({ product }: { product: Product }) {
  return (
    <section aria-labelledby="problem-title" className="bg-white py-16 lg:py-24">
      <Reveal className="container-page grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
        <p className="eyebrow text-wood-700">The problem</p>
        <div>
          <h2 id="problem-title" className="text-3xl leading-tight font-bold text-ink sm:text-4xl">
            {product.problem.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{product.problem.body}</p>
        </div>
      </Reveal>
    </section>
  );
}

function Features({ product }: { product: Product }) {
  return (
    <section aria-labelledby="features-title" className="bg-paper py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-wood-700">What it does</p>
          <h2 id="features-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Features
          </h2>
        </Reveal>
        <ol className="mt-12 space-y-16 lg:space-y-24">
          {product.features.map((f, i) => (
            <li key={f.title}>
              <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={cn(i % 2 === 1 && "lg:order-2")}>
                  <span className="font-mono text-sm text-wood-700">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-2xl font-bold text-ink">{f.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{f.body}</p>
                </div>
                <div className={cn(i % 2 === 1 && "lg:order-1")}>
                  {f.visual.kind === "image" ? (
                    <DeviceFrame>
                      <Image
                        src={f.visual.src}
                        alt={f.visual.alt}
                        width={1440}
                        height={900}
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="block h-auto w-full"
                      />
                    </DeviceFrame>
                  ) : (
                    <FeatureIllustration name={f.visual.name} />
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BcseReference() {
  return (
    <section aria-labelledby="bcse-title" className="bg-white py-16 lg:py-24">
      <Reveal className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-heading text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
            Live at BCSE
          </span>
          <h2 id="bcse-title" className="mt-4 text-3xl font-bold text-ink">
            In production at Bethel COP Susu Enterprise.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Bethel COP Susu Enterprise (BCSE), a susu and savings enterprise, runs its member-facing website and back
            office on FlexiFund: savings, fixed deposits, personal loans, susu collections, Mobile Money and share
            capital.
          </p>
          <a
            href="https://bcse.edtmsys.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600"
          >
            Visit bcse.edtmsys.com <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <DeviceFrame url="bcse.edtmsys.com">
          <div className="flex aspect-[16/10] items-center justify-center bg-paper p-6 text-center text-sm text-muted">
            <Placeholder>[BCSE SCREENSHOT: capture of bcse.edtmsys.com home page]</Placeholder>
          </div>
        </DeviceFrame>
      </Reveal>
    </section>
  );
}

function Audience({ product }: { product: Product }) {
  return (
    <section aria-labelledby="audience-title" className="bg-white py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow text-wood-700">Who it&apos;s for</p>
          <h2 id="audience-title" className="mt-3 text-3xl font-bold text-ink">
            Built for
          </h2>
          <ul className="mt-6 space-y-3">
            {product.audience.map((a) => (
              <li key={a} className="flex gap-3 text-lg text-ink">
                <Check className="mt-1 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow text-wood-700">Under the hood</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">Technology</h2>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${product.name} technology`}>
            {product.stack.map((t) => (
              <li key={t} className="rounded-lg bg-paper px-3 py-1.5 font-mono text-sm text-ink ring-1 ring-line">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-line p-4">
            <StatusBadge status={product.status} />
            <p className="text-sm text-muted">
              {product.status === "live"
                ? `${product.name} is live and in use today.`
                : `${product.name} is in development.${product.statusNote ? ` ${product.statusNote}.` : ""}`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
