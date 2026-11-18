/**
 * Insights (blog) posts. Bodies live in content/blog/<slug>.mdx.
 * Drafts are marked on the page, kept out of the sitemap and set to noindex.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string | null;
  draft: boolean;
};

export const posts: Post[] = [
  {
    slug: "offline-first-for-ghanaian-businesses",
    title: "What offline-first software means for Ghanaian businesses",
    summary: "Sample post title. The article has not been written yet.",
    date: null,
    draft: true,
  },
];

export const publishedPosts = posts.filter((p) => !p.draft);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
