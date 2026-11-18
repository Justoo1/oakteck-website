# Oakteck website

The public website for **Oakteck Technology** (oakteckgh.com): services, products (Kwanix, Nkabom, FlexiFund, WASSCE Analytics, AgriConnect), selected work, about and contact.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict), Tailwind CSS v4, shadcn/ui (Radix), MDX and Motion. Every page is statically prerendered; the contact form is the only server code.

Open questions and placeholders for the owner are in [`OWNER-TODO.md`](OWNER-TODO.md).

## Setup

Requirements: Node.js 20.9 or newer (developed on 24), npm.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3200
```

Port 3000 is used by another project on the development machine, so dev and `start` run on **3200**.

| Script | What it does |
|---|---|
| `npm run dev` | Development server on port 3200 |
| `npm run build` | Production build (fails if any page stops being fully static) |
| `npm run start` | Serve the production build on port 3200 |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc` |

## Environment variables

Set these in `.env.local` locally and in **Vercel → Project → Settings → Environment Variables** for Production and Preview.

| Variable | Required | Example | Used for |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://oakteckgh.com` (prod), `http://localhost:3200` (local) | Canonical URLs, Open Graph, sitemap, robots, JSON-LD |
| `RESEND_API_KEY` | In production | `re_…` | Sending contact-form emails |
| `CONTACT_TO_EMAIL` | No | `amankrahjay@gmail.com` | Where enquiries are delivered (defaults to the address in `site.config.ts`) |
| `CONTACT_FROM_EMAIL` | No | `Oakteck website <website@oakteckgh.com>` | Sender address (defaults to `onboarding@resend.dev`) |

`NEXT_PUBLIC_SITE_URL` is read at build time, so redeploy after changing it.

### Contact form and Resend

- The form posts to a server action (`app/contact/actions.ts`) that validates with Zod and sends with [Resend](https://resend.com).
- **Locally without a key:** the enquiry is logged to the terminal and the form shows a success state with a "development mode" note. In production a missing key shows an error that points visitors to WhatsApp.
- **With a test key:** until a domain is verified in Resend, mail can only be sent from `onboarding@resend.dev` and only to the email address of the Resend account owner. Set `CONTACT_TO_EMAIL` to that address to test.
- **For production:** verify `oakteckgh.com` in Resend (add its DNS records), then set `CONTACT_FROM_EMAIL` to an address on that domain.
- **Spam protection:**
  - A hidden honeypot field.
  - A minimum fill time of 2.5 seconds.
  - A limit of 5 sent messages per IP per 10 minutes. The limiter is in memory, so on Vercel it applies per function instance. For a shared limit, swap in `@upstash/ratelimit` behind `lib/rate-limit.ts`.
- **Prefilled enquiries:** product pages link to `/contact?product=Kwanix&intent=demo`, which preselects "What do you need?".

## Project structure

```
site.config.ts          Brand, legal name and number, contact details, links, nav (single source of truth)
app/theme.css           Brand colour tokens and fonts (swap to re-theme)
app/                    Routes; each section has its own opengraph-image.tsx
content/                Copy and data: products, services, work, testimonials, blog, Kwanix videos
content/work/*.mdx      Case study bodies
content/blog/*.mdx      Blog post bodies
components/brand/       <Logo>, generated logo and icon data
components/home/        Home page sections, including the animated hero leaf
components/motion/      Scroll reveals, scroll tilt, counters
scripts/                Generators for logo data, sprites and brand icons
docs/                   Owner-supplied brief, brand files and original videos (not served)
public/                 Files the site serves (brand, images, compressed video)
lighthouse/             Mobile Lighthouse reports (Home, Kwanix)
```

## Editing content

All copy comes from `docs/BRIEF.md`. Where a fact was missing, the site shows a visible dashed `[PLACEHOLDER]` (the `<Placeholder>` component). Search the code for `<Placeholder>` to find them all; each one is listed in `OWNER-TODO.md`.

### Add a case study (MDX)

1. Add an entry to `work` in `content/work.ts`:
   ```ts
   {
     slug: "new-project",
     title: "New project: what it does",
     summary: "One or two sentences for the card and meta description.",
     stack: ["FastAPI", "Next.js"],
     tags: ["SaaS"],                 // any of: SaaS, ERP, AI, Web, Design
     link: { label: "example.com", href: "https://example.com" }, // optional
     label: "Oakteck client project", // or "Founder's project"
   },
   ```
2. Create `content/work/new-project.mdx` with the body. Use `##` headings (The problem, What was built, Outcome). You can use `<Placeholder>[…]</Placeholder>` inside MDX.
3. That's it: the card, the `/work/new-project` page, its Open Graph image and the sitemap entry are generated. Filters only show tags that have at least one project, so adding a "Design" project makes the Design filter appear.

To show a different project on Home, edit `featuredWork` in `content/work.ts`. To relabel a founder's project as Oakteck client work, change its `label`, but only with the client's permission and if the work was done by Oakteck.

### Blog (Insights)

Posts are listed in `content/blog.ts` with bodies in `content/blog/<slug>.mdx`. Drafts (`draft: true`) show a "Draft" badge, are set to `noindex` and are left out of the sitemap. The blog index itself is `noindex` until at least one post is published.

### Testimonials

`content/testimonials.ts` holds **sample** quotes from the brief, each with `sample: true`. While any entry is a sample, the section **does not render in production** (`VERCEL_ENV=production`, or `NODE_ENV=production` off Vercel). It renders with a "Sample" badge in development and Vercel preview deployments. Replace the samples with real, permissioned quotes and set `sample: false` on each to publish the section.

### Products and services

Edit `content/products.ts` and `content/services.ts`. Product pages, cards, the footer and Open Graph images all read from these. Kwanix feature screenshots are frames taken from the demo videos (`public/images/kwanix/`).

### Kwanix videos and captions

- Originals stay in `docs/kwanix-videos/`.
- The served copies in `public/video/` are stream-copied with `+faststart`, with no re-encode. The originals are already H.264 at about 0.35–0.56 Mbps, below the brief's 1–2 Mbps target, so re-encoding would only make them bigger.
- The Home spotlight plays a 12-second muted cut (99–111 s of the parcel journey, the WRONG BUS moment) at 1152×720, about 140 KB.
- On the Kwanix page the four videos are click-to-play: nothing downloads until a visitor presses play.
- **Captions:** the videos have burned-in on-screen captions, but no narration transcript was supplied. To add captions, put a WebVTT file in `public/video/` and set `captions: "/video/<file>.vtt"` on the video in `content/kwanix-videos.ts`. The track is then switched on by default.

## Change the domain

1. Set `NEXT_PUBLIC_SITE_URL` to the new origin in Vercel (Production) and redeploy.
2. In `next.config.ts`, update the `www` → bare-domain redirect (`has.value` and `destination`).
3. In Vercel → Domains, add the bare domain and `www`, and set `www` to redirect to the bare domain.
4. In Resend, verify the new domain and update `CONTACT_FROM_EMAIL`.
5. When the domain mailbox exists, change `CONTACT_EMAIL` in `site.config.ts` (for example to `hello@oakteckgh.com`). It is used everywhere: footer, contact page, privacy policy and JSON-LD.

Never use any `oaktech` domain or `oakteck.com`, which belongs to someone else.

## Brand assets

The logo is never redrawn. `scripts/extract-logo.mjs` reads the supplied SVGs in `docs/brand/logo/` and generates:

- `components/brand/logo-data.ts`: the leaf geometry used by the animated hero.
- `public/brand/oakteck-logo-sprite.svg`: a cached sprite used by `<Logo>`, so the logo stays an inline, crisp `<svg>` without repeating its paths in every page.
- `public/brand/oakteck-grain-*.svg`: the wood-grain overlays, as cached files.

`scripts/extract-icons.mjs` copies the brand glyphs used (WhatsApp, GitHub and the tech marquee) from Simple Icons (CC0). Run either script with `node scripts/<name>.mjs` after changing the source files.

Use `<Logo variant="dark" | "light" | "mark" />`. The full logo should be at least 120 px wide; below that, use the mark.

### Colour notes

The palette follows the brief, with these accessibility adjustments:

- **Buttons:** white text on `blue-500` is only 4.2:1 (AA needs 4.5:1), so buttons use `blue-600`. `blue-500` stays in the logo and highlights.
- **Text on navy:** blue text uses a lighter `blue-400` (6.7:1).
- **Wood text on light backgrounds:** uses a darker `wood-700`.
- **WhatsApp buttons:** use a deeper green (`#0E7A40`), because white on WhatsApp's own green fails contrast.

## Reuse for another brand (e.g. FullAxis)

1. Replace `site.config.ts` (name, legal, contact, links, nav).
2. Replace the tokens in `app/theme.css`.
3. Replace the files in `public/brand/` and `docs/brand/logo/`, then run `node scripts/extract-logo.mjs`.
4. Replace the content files in `content/`.

Component code does not hard-code the brand.

## Animation

- **Hero leaf:** the supplied leaf artwork, with its circuit veins revealed by an SVG mask of traced centrelines animated with `stroke-dashoffset`. The nodes then light up in sequence and thin roots grow down into the page.
  - It is pure CSS (`components/home/hero-leaf.css`).
  - The draw-in starts once the page has loaded and is idle, so it never competes with loading.
  - Desktop gets a gentle pointer parallax.
- **Scroll reveals:** a CSS hidden state, plus one IntersectionObserver that plays the reveal with the Web Animations API (`components/motion/`). Each reveal runs once.
- **Motion** (`motion/react`) drives the scroll-linked Kwanix tilt, the How-we-work line and the About counters.
- **Page transitions:** use React's `<ViewTransition>` (`app/template.tsx`).
- **`prefers-reduced-motion`:** turns off the draw-on, parallax, tilt, reveals and marquee, and shows final states instead. The Kwanix clip shows controls instead of autoplaying.

## Performance and accessibility

Measured on the production build (`next build && next start`) with Lighthouse 13 mobile emulation (simulated 4G, 4× CPU slowdown), three runs each, on a WSL2 laptop. Reports are in `lighthouse/`.

| Page | Performance (median, range) | LCP | CLS | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|---|
| Home | 82 (80–97) | 1.2 s | 0.005 | 100 | 100 | 100 |
| Kwanix | 93 (89–94) | 1.0 s | 0 | 100 | 100 | 100 |

**Performance vs the 95+ target:**

- The remaining gap is Total Blocking Time: the React and Next.js runtime plus hydration, about 200 KB of JS gzipped on Home.
- On this machine the result swings with the host's CPU benchmark: the same build scored 80 and 97.
- **Re-measure on PageSpeed Insights after deploying to Vercel.**
- If Home is still under 95 there, the next levers are:
  - Moving the Kwanix spotlight tilt and the timeline line to CSS scroll-driven animations, which removes Motion from Home.
  - Trimming the Home page's length.

**Accessibility:** axe-core reports 0 violations (WCAG 2.2 AA and best-practice rules) on 12 pages at 390 px and 1280 px.

**Other choices made for visitors on mobile data:**

- Links prefetch on hover, touch or focus rather than whenever they are visible.
- The mobile menu's code loads on first use.
- Images are AVIF/WebP via `next/image`.
- Fonts are self-hosted through `next/font`.

## Deployment (Vercel)

1. Import the repository in Vercel; the framework preset is detected.
2. Add the environment variables above.
3. Add the domains (see "Change the domain").
4. Enable Web Analytics in the Vercel dashboard. It is cookieless, which is why there is no cookie banner; the `<Analytics />` component only renders on Vercel.

Preview deployments are kept out of search engines by `app/robots.ts`, and they show the sample testimonials so you can review them.

## Licences

- Montserrat (`assets/fonts/`, used for Open Graph images): SIL Open Font License; see `assets/fonts/OFL.txt`.
- Brand glyphs: Simple Icons, CC0.
- Brand artwork, headshot and videos: © Oakteck Technology.
