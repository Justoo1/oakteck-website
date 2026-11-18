# Oakteck website

The public website for **Oakteck Technology** (oakteckgh.com): services, products (Kwanix, Nkabom, FlexiFund, WASSCE Analytics, AgriConnect), selected work, about and contact.

Built with Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui (Radix), MDX and Motion. Every page is prerendered at build time; the contact form endpoint (`/api/contact`) is the only server code.

It can be hosted on **Cloudflare** (free plan, static export plus a small Worker) or **Vercel**, from the same code: see [Hosting](#hosting).

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
| `npm run build` | Production build for Vercel or any Node.js host (fails if any page stops being fully static) |
| `npm run start` | Serve that build on port 3200 |
| `npm run build:cloudflare` | Static export to `out/` for Cloudflare (pre-sizes images first) |
| `npm run preview:cloudflare` | Build for Cloudflare and run it locally in the Workers runtime on port 3202 |
| `npm run deploy:cloudflare` | Build for Cloudflare and deploy with Wrangler |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc` |

## Environment variables

Locally, set these in `.env.local` (Next.js) and `.dev.vars` (Cloudflare preview; copy `.dev.vars.example`). For hosting, see [Hosting](#hosting) for where each one goes.

| Variable | Required | Example | Used for |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://oakteckgh.com` (prod), `http://localhost:3200` (local) | Canonical URLs, Open Graph, sitemap, robots, JSON-LD |
| `RESEND_API_KEY` | In production | `re_…` | Sending contact-form emails |
| `CONTACT_TO_EMAIL` | No | `amankrahjay@gmail.com` | Where enquiries are delivered (defaults to the address in `site.config.ts`) |
| `CONTACT_FROM_EMAIL` | No | `Oakteck website <website@oakteckgh.com>` | Sender address (defaults to `onboarding@resend.dev`) |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Cloudflare only | `0123…` | Cloudflare Web Analytics site token (cookieless) |
| `NOINDEX` | No | `1` | Tells search engines not to index this build (for preview deployments) |

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` and `NOINDEX` are read at build time, so rebuild after changing them.

### Contact form and Resend

- The form posts to `POST /api/contact`, which validates with Zod and sends with the [Resend](https://resend.com) API. The logic lives in `lib/contact/handle-enquiry.ts` and is shared by both hosts:
  - **Vercel / Node.js:** `app/api/contact/route.vercel.ts` (a route handler).
  - **Cloudflare:** `worker/index.ts` (a Worker).
- **Locally without a key:** the enquiry is logged to the terminal and the form shows a success state with a "development mode" note. In production a missing key shows an error that points visitors to WhatsApp.
- **Without JavaScript:** the form needs JavaScript to send. Visitors without it can still use the WhatsApp, phone and email links beside it.
- **With a test key:** until a domain is verified in Resend, mail can only be sent from `onboarding@resend.dev` and only to the email address of the Resend account owner. Set `CONTACT_TO_EMAIL` to that address to test.
- **For production:** verify `oakteckgh.com` in Resend (add its DNS records), then set `CONTACT_FROM_EMAIL` to an address on that domain.
- **Spam protection:**
  - A hidden honeypot field.
  - A minimum fill time of 2.5 seconds.
  - A limit of 5 sent messages per IP per 10 minutes. The limiter is in memory, so it applies per Vercel function instance or per Cloudflare Worker isolate. For a shared limit, swap in Cloudflare's Rate Limiting binding or `@upstash/ratelimit` behind `lib/rate-limit.ts`.
  - Posts from other websites are rejected (Origin check).
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
lib/contact/            Contact-form handling shared by both hosts
app/api/contact/        POST /api/contact route handler (Vercel / Node.js build only)
worker/                 Cloudflare Worker: serves /api/contact in front of the static export
wrangler.jsonc          Cloudflare Worker and static-assets config
scripts/                Generators for logo data, sprites, brand icons; Cloudflare image and header steps
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

`content/testimonials.ts` holds **sample** quotes from the brief, each with `sample: true`. While any entry is a sample, the section **does not render in production** (`VERCEL_ENV=production`, or `NODE_ENV=production` off Vercel). It renders with a "Sample" badge in development (`npm run dev`) and in Vercel preview deployments. Cloudflare builds are always production builds, so there they stay hidden. Replace the samples with real, permissioned quotes and set `sample: false` on each to publish the section.

### Products and services

Edit `content/products.ts` and `content/services.ts`. Product pages, cards, the footer and Open Graph images all read from these. Kwanix feature screenshots are frames taken from the demo videos (`public/images/kwanix/`).

### Kwanix videos and captions

- Originals stay in `docs/kwanix-videos/`.
- The served copies in `public/video/` are stream-copied with `+faststart`, with no re-encode. The originals are already H.264 at about 0.35–0.56 Mbps, below the brief's 1–2 Mbps target, so re-encoding would only make them bigger.
- The Home spotlight plays a 12-second muted cut (99–111 s of the parcel journey, the WRONG BUS moment) at 1152×720, about 140 KB.
- On the Kwanix page the four videos are click-to-play: nothing downloads until a visitor presses play.
- **Captions:** the videos have burned-in on-screen captions, but no narration transcript was supplied. To add captions, put a WebVTT file in `public/video/` and set `captions: "/video/<file>.vtt"` on the video in `content/kwanix-videos.ts`. The track is then switched on by default.

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

Measured on the Node.js production build (`next build && next start`; the Cloudflare static export serves the same HTML and JavaScript) with Lighthouse 13 mobile emulation (simulated 4G, 4× CPU slowdown), three runs each, on a WSL2 laptop. Reports are in `lighthouse/`.

| Page | Performance (median, range) | LCP | CLS | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|---|
| Home | 82 (80–97) | 1.2 s | 0.005 | 100 | 100 | 100 |
| Kwanix | 93 (89–94) | 1.0 s | 0 | 100 | 100 | 100 |

**Performance vs the 95+ target:**

- The remaining gap is Total Blocking Time: the React and Next.js runtime plus hydration, about 200 KB of JS gzipped on Home.
- On this machine the result swings with the host's CPU benchmark: the same build scored 80 and 97.
- **Re-measure on PageSpeed Insights after deploying.** On Cloudflare the pages are plain static files served from the edge, so time to first byte should be at least as good as in these tests.
- If Home is still under 95 there, the next levers are:
  - Moving the Kwanix spotlight tilt and the timeline line to CSS scroll-driven animations, which removes Motion from Home.
  - Trimming the Home page's length.

**Accessibility:** axe-core reports 0 violations (WCAG 2.2 AA and best-practice rules) on 12 pages at 390 px and 1280 px.

**Other choices made for visitors on mobile data:**

- Links prefetch on hover, touch or focus rather than whenever they are visible.
- The mobile menu's code loads on first use.
- Images are resized and compressed: AVIF/WebP through `next/image` on Vercel, WebP pre-sized at build on Cloudflare.
- Fonts are self-hosted through `next/font`.

## Hosting

The same code builds for two hosts. Nothing in the code changes between them; the build command and settings do.

| | Cloudflare (current choice) | Vercel |
|---|---|---|
| Build command | `npm run build:cloudflare` | `npm run build` |
| Output | Static files in `out/` + a small Worker for `/api/contact` | Next.js server |
| Contact endpoint | `worker/index.ts` | `app/api/contact/route.vercel.ts` |
| Images | WebP pre-sized at build (`scripts/build-images.mjs`) | `next/image` optimisation (AVIF/WebP) |
| `www` → bare domain | Cloudflare Redirect Rule | `redirects()` in `next.config.ts` |
| Analytics | Cloudflare Web Analytics | Vercel Web Analytics |
| Cost for this site | Free plan: allows commercial use; static files are unmetered; the Worker only runs for form posts (100,000 requests/day free) | Pro plan needed: Hobby is "personal or non-commercial use" only |

The build switch is the `DEPLOY_TARGET=cloudflare` environment variable, which `build:cloudflare` sets for you (see `next.config.ts`).

### Deploy to Cloudflare

You need a Cloudflare account (free plan) and the site in a GitHub or GitLab repository.

**1. Create the Worker from the repository.** In the Cloudflare dashboard go to **Workers & Pages → Create → Import a repository**, pick the repository, and set:

| Setting | Value |
|---|---|
| Project name | `oakteck-website` (must match `name` in `wrangler.jsonc`) |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npx wrangler deploy` |
| Build variables | `NEXT_PUBLIC_SITE_URL` = `https://oakteckgh.com` (see the note below), optionally `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` |

Every push to the production branch then builds and deploys automatically.

**2. Add the contact-form settings to the Worker** under **Settings → Variables and Secrets**:

- `RESEND_API_KEY`, as a **secret**;
- `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`, as plain text.

**3. Check it on the `workers.dev` address** Cloudflare gives you (`oakteck-website.<your-subdomain>.workers.dev`). Send yourself a test enquiry.

> **Before the domain is live:** canonical links, the sitemap and Open Graph tags all point at `NEXT_PUBLIC_SITE_URL`. Until `oakteckgh.com` works, either build with the `workers.dev` address and `NOINDEX=1`, or accept that social previews won't load yet. Switch to `https://oakteckgh.com` (and remove `NOINDEX`) once the domain is connected.

**4. Connect the domain:**

1. Add `oakteckgh.com` to Cloudflare as a site (free plan), then change the domain's nameservers at your registrar to the two Cloudflare gives you.
2. Open the Worker's **Settings → Domains & Routes**, choose **Add → Custom domain**, and add `oakteckgh.com`.
3. Create the `www` redirect: in the domain's **Rules → Redirect Rules**, use the template **"Redirect from WWW to root"**. That template also asks for a proxied DNS record for `www`, which it explains.
4. Rebuild with `NEXT_PUBLIC_SITE_URL=https://oakteckgh.com`.

**5. Set up Resend on the domain.** Add Resend's DNS records in Cloudflare DNS (Resend can do this automatically for Cloudflare). Then set `CONTACT_FROM_EMAIL` to an `@oakteckgh.com` address.

**6. Turn on analytics (optional).** Go to **Analytics & Logs → Web Analytics → Add a site**. Copy the site token into the `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` build variable and rebuild. It's cookieless, so no cookie banner is needed.

**Deploying from your own machine instead of Git:**

```bash
npx wrangler login                          # opens the browser once
npx wrangler secret put RESEND_API_KEY      # paste the key when asked
NEXT_PUBLIC_SITE_URL=https://oakteckgh.com npm run deploy:cloudflare
```

**Testing the Cloudflare build locally:**

```bash
cp .dev.vars.example .dev.vars
npm run preview:cloudflare                  # http://localhost:3202
```

This uses the real Workers runtime, and enquiries are logged to the terminal unless `RESEND_API_KEY` is set in `.dev.vars`.

**How it stays inside the free plan:**

- Pages, images, video and Open Graph cards are static assets, served before the Worker runs (`run_worker_first: ["/api/*"]` in `wrangler.jsonc`). They use no Worker requests or CPU.
- Only contact-form posts reach the Worker, and each uses a tiny amount of CPU.
- Static assets are limited to 25 MiB per file; the largest video is 7.7 MB.
- `scripts/cloudflare-postbuild.mjs` writes `out/_headers`. It sets cache lifetimes, and declares the extensionless Open Graph images as `image/png`.

### Switch back to Vercel later

1. **Import the repository in Vercel.** Keep the default build command (`npm run build`) and **don't** set `DEPLOY_TARGET`.
2. **Add the environment variables:** `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. You can leave out `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`.
3. **Add the domains:** in Vercel → Domains, add `oakteckgh.com` and `www.oakteckgh.com`, with `www` redirecting to the bare domain.
4. **Repoint DNS.** In Cloudflare DNS, point the records at Vercel as Vercel instructs, and set them to **DNS only** (grey cloud). Then remove the Worker's custom domain and the Redirect Rule. Alternatively, move DNS to another provider.
5. **Enable Web Analytics** in the Vercel dashboard. The `<Analytics />` component only renders on Vercel.

Vercel preview deployments are kept out of search engines by `app/robots.ts`, and they show the sample testimonials so you can review them.

### Change the domain

1. **Rebuild with the new origin.** Set `NEXT_PUBLIC_SITE_URL` to the new origin on your host (a Cloudflare build variable or a Vercel environment variable), then rebuild.
2. **Update the `www` redirect** on whichever host you use:
   - Cloudflare: the Redirect Rule.
   - Vercel: `has.value` and `destination` in `next.config.ts`.
3. **Update Resend.** Verify the new domain in Resend and update `CONTACT_FROM_EMAIL`.
4. **Update the contact address.** When the domain mailbox exists, change `CONTACT_EMAIL` in `site.config.ts` (for example to `hello@oakteckgh.com`). It's used everywhere: footer, contact page, privacy policy and JSON-LD.

Never use any `oaktech` domain or `oakteck.com`, which belongs to someone else.

## Licences

- Montserrat (`assets/fonts/`, used for Open Graph images): SIL Open Font License; see `assets/fonts/OFL.txt`.
- Brand glyphs: Simple Icons, CC0.
- Brand artwork, headshot and videos: © Oakteck Technology.
