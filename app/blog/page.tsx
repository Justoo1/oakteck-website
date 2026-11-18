import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DraftBadge } from "@/components/draft-badge";
import { posts, publishedPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes from Oakteck on building software for Ghanaian businesses.",
  alternates: { canonical: "/blog" },
  // Index the blog only once it has a published post.
  robots: publishedPosts.length ? undefined : { index: false, follow: true },
};

export default function BlogIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/blog", label: "Insights" }]}
        eyebrow="Insights"
        title="Notes on building software that lasts."
        intro="Practical writing on software for Ghanaian businesses. Coming soon."
      />
      <section aria-label="Posts" className="bg-paper py-16 lg:py-24">
        <ul className="container-page grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="group relative h-full rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center gap-3 text-sm text-muted">
                  {p.draft && <DraftBadge />}
                  {p.date && <time dateTime={p.date}>{p.date}</time>}
                </div>
                <h2 className="mt-4 text-xl font-bold text-ink">
                  <Link href={`/blog/${p.slug}` as Route} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted">{p.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600">
                  Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
