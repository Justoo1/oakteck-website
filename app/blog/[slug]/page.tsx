import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/app-link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DraftBadge } from "@/components/draft-badge";
import { getPost, posts } from "@/content/blog";

/** Only the slugs from generateStaticParams exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.summary, path: `/blog/${post.slug}`, noindex: post.draft });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/blog", label: "Insights" },
          { href: `/blog/${post.slug}`, label: post.draft ? "Draft" : post.title },
        ]}
        eyebrow={post.draft ? <DraftBadge /> : "Insights"}
        title={post.title}
      />
      <article className="bg-white py-14 lg:py-20">
        <div className="container-page max-w-3xl">
          <Body />
          <Link href="/blog" className="link-underline mt-12 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600">
            <ArrowLeft className="size-4" aria-hidden="true" /> All insights
          </Link>
        </div>
      </article>
    </>
  );
}
