import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DraftBadge } from "@/components/draft-badge";
import { getPost, posts } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: true } : undefined,
  };
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-navy-950" />}>
      <Post params={props.params} />
    </Suspense>
  );
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
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
