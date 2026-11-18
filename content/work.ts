/**
 * Selected work by the founder (docs/BRIEF.md section 5). These are labelled
 * "Founder's project": they are not Oakteck products. Each has a short MDX
 * case study in content/work/<slug>.mdx.
 *
 * To relabel one as an Oakteck client project later, change `label`.
 */

export const workTags = ["SaaS", "ERP", "AI", "Web", "Design"] as const;
export type WorkTag = (typeof workTags)[number];

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  tags: WorkTag[];
  link?: { label: string; href: string };
  label: "Founder's project" | "Oakteck client project";
  region?: string;
};

export const work: WorkItem[] = [
  {
    slug: "mcees-engine",
    title: "MCEES Engine: e-commerce to ERP sync",
    summary:
      "Async middleware that syncs Shopify and WooCommerce into Odoo. Redis locks prevent overselling stock, and a six-view operations dashboard shows what is happening.",
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "Next.js"],
    tags: ["ERP", "Web"],
    link: { label: "mcees.edtmsys.com", href: "https://mcees.edtmsys.com" },
    label: "Founder's project",
  },
  {
    slug: "gmak-properties",
    title: "GMAK Properties",
    summary:
      "A real-estate marketing site with listings and search, plus an Odoo backend for leads, contracts and properties.",
    stack: ["Next.js", "Tailwind", "Odoo"],
    tags: ["Web", "ERP"],
    link: { label: "gmakpropertiesgh.com", href: "https://gmakpropertiesgh.com" },
    label: "Founder's project",
  },
  {
    slug: "ai-cv-optimiser",
    title: "AI CV optimiser",
    summary: "Upload a CV and a job description, and AI returns specific improvements.",
    stack: ["FastAPI", "React", "OpenAI API"],
    tags: ["AI", "Web"],
    link: { label: "cv.edtmsys.com", href: "https://cv.edtmsys.com" },
    label: "Founder's project",
  },
  {
    slug: "barcode-inventory",
    title: "Barcode inventory system",
    summary: "Multi-warehouse barcode stock tracking tied into ERP. Manual errors down 70%.",
    stack: ["Django", "React", "PostgreSQL"],
    tags: ["ERP"],
    label: "Founder's project",
  },
  {
    slug: "apothecary-farms",
    title: "Apothecary Farms",
    summary: "A marketing site with a store locator, with content managed in Sanity CMS.",
    stack: ["Next.js", "Sanity"],
    tags: ["Web"],
    link: { label: "apothecaryfarms.com", href: "https://apothecaryfarms.com" },
    label: "Founder's project",
    region: "US",
  },
];

export const featuredWork = ["mcees-engine", "gmak-properties", "ai-cv-optimiser"]
  .map((slug) => work.find((w) => w.slug === slug))
  .filter((w): w is WorkItem => Boolean(w));

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}

/** Only filters that have at least one project are shown. */
export const activeWorkTags = workTags.filter((t) => work.some((w) => w.tags.includes(t)));
