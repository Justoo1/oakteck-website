import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/app-link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/home/cta-band";
import { getWork, work } from "@/content/work";

/** Only the slugs from generateStaticParams exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return pageMetadata({ title: item.title, description: item.summary, path: `/work/${item.slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  const { default: Body } = await import(`@/content/work/${item.slug}.mdx`);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/work", label: "Work" },
          { href: `/work/${item.slug}`, label: item.title },
        ]}
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            {item.label}
            {item.region && <span className="text-mist normal-case tracking-normal">· {item.region}</span>}
          </span>
        }
        title={item.title}
        intro={item.summary}
      >
        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-8 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-400"
          >
            {item.link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </PageHero>

      <article className="bg-white py-14 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl [&>h2:first-child]:mt-0">
            <Body />
          </div>
          <aside className="h-fit space-y-6 rounded-2xl bg-paper p-6 ring-1 ring-line lg:sticky lg:top-24">
            <div>
              <h2 className="eyebrow text-wood-700">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((t) => (
                  <li key={t} className="rounded-md bg-white px-2 py-0.5 font-mono text-[0.78rem] text-ink ring-1 ring-line">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-wood-700">Type</h2>
              <p className="mt-2 text-sm text-ink">{item.tags.join(" · ")}</p>
            </div>
            <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
              A project by Oakteck&apos;s founder, Justice Amankrah. It is not an Oakteck product.
            </p>
          </aside>
        </div>
        <div className="container-page mt-12">
          <Link href="/work" className="link-underline inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600">
            <ArrowLeft className="size-4" aria-hidden="true" /> All work
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
