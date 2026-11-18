# Build brief: Oakteck Technology website

You are building the first public website for **Oakteck Technology**, a registered software business in Ghana founded and owned by **Justice Amankrah**. The site must look modern and premium, use purposeful animation, load fast on Ghanaian mobile networks, and turn visitors (business owners, operations managers, international clients) into enquiries.

Read this whole brief before you start. Where a fact is missing, use a clearly marked placeholder such as `[CLIENT TESTIMONIAL]`. Do not invent facts.

## 0. Project setup (read first)

- **Location:** build the site in the root of this folder (`oakteck-website/`). Everything the owner has supplied is in `docs/`; leave `docs/` in place, since `create-next-app` accepts a `docs/` folder in an otherwise empty directory.
  - `docs/BRIEF.md`: this brief
  - `docs/brand/`: logo files and the founder's headshot
  - `docs/kwanix-videos/`: product demo videos
- Copy what the site serves into `public/` (logos and icons → `public/brand/`, headshot → `public/images/`, compressed video → `public/video/`). Do not serve files straight from `docs/`.
- **Ports:** port 3000 is already used by another project on this machine. Run the dev server on **3200** (`next dev -p 3200`), and put that in the `package.json` scripts.
- **Next.js 16:** route protection and request interception live in `proxy.ts` (exported function `proxy`), not `middleware.ts`. This site likely needs neither; never create `middleware.ts`.
- **Video:** compress the demo videos for the web (H.264 MP4 at about 1–2 Mbps, plus a poster frame). Keep the originals in `docs/`.
- Initialise git with a sensible `.gitignore`. Commit after each major milestone.

---

## 1. Domain and URLs

- **The registered business name is "Oakteck"** (with a K). Spell it that way everywhere: copy, metadata, JSON-LD, alt text. Never write "OakTech".
- **Legal form: sole proprietorship (a registered business name in Ghana), owned by Justice Amankrah.**
  - Never add "Ltd", "Limited", "PLC", "Inc." or "Company"; those words imply an incorporated company.
  - Refer to the business as "Oakteck" in copy. The full registered name, from the certificate, is **Oakteck Technology** (printed "OAKTECK TECHNOLOGY"). Use it in legal lines, the privacy policy and `legalName`; use "Oakteck" in normal copy.
  - Footer legal line: `© {year} Oakteck Technology · Registered business name in Ghana · Reg. No. BN032161222`. Keep the name and number in `site.config.ts` as `legal.name` and `legal.registrationNumber`.
  - The privacy policy names the data controller as "Justice Amankrah, trading as Oakteck Technology (Reg. No. BN032161222)", with the Accra address placeholder.
- **Domain: `oakteckgh.com`.** Site URL: `https://oakteckgh.com`, with `www.oakteckgh.com` redirecting to the bare domain.
  - Set `NEXT_PUBLIC_SITE_URL=https://oakteckgh.com` in `.env.example` and production, and use it for canonical URLs, Open Graph, the sitemap and JSON-LD.
  - Use `http://localhost:3000` locally.
  - As of November 2026 the domain was not yet registered; the owner is registering it.
- **Business email:** use `hello@oakteckgh.com` as the public contact address once the domain's email is set up. Until then, `amankrahjay@gmail.com`. Keep it in one config constant.
- Never use any `oaktech` domain or `oakteck.com` (owned by someone else).
- Founder's portfolio: **https://justice.edtmsys.com**. Link to it from the About and footer sections.
- Flagship product site: **https://kwanix.com** (Kwanix, see section 5).

## 2. Brand

**Logo: final vector artwork is provided in `docs/brand/logo/`.** Use these files; do not redraw or retype the logo.

| File | Use |
|---|---|
| `oakteck-logo-on-dark.svg` | Main logo on navy or dark backgrounds: "OAK" white, "TECK" blue, wood-and-blue oak leaf with circuit veins, wood underline. Header on dark, hero, footer, OG images. |
| `oakteck-logo-on-light.svg` | Same logo with "OAK" in navy, for white or light backgrounds. |
| `oakteck-mark.svg` | The leaf mark alone, transparent background. Small spaces and the loading animation. |
| `oakteck-app-icon.svg` | Leaf on a navy rounded square. Favicon, PWA manifest, social avatars. |
| `*-4000.png`, `*-1600.png`, `oakteck-mark-2000.png` | Transparent PNG exports where SVG isn't accepted. |
| `oakteck-app-icon-1024.png`, `-512.png`, `apple-touch-icon-180.png`, `favicon-48.png` | Icons. Also generate `favicon.ico` from the SVG. |

- Wrap the logo in one `<Logo variant="dark" | "light" | "mark" />` component, and inline the SVG so it is crisp and cacheable.
- Minimum sizes: the full logo no smaller than 120 px wide; below that, use the mark.
- Clear space: at least the height of the "O" around the logo.
- **Hero animation:** the SVG has separate layers (the leaf silhouette, the blue half, the black veins with ring nodes, the wood grain, and each letter), so animate the veins drawing in and the nodes lighting up (section 9).
- Put brand files in `public/brand/`.

**Meaning:** the oak stands for strong roots and durable foundations. The circuit veins stand for technology growing out of those roots. Use this idea in the hero animation and the copy.

**Colours** (taken from the logo and the business card):

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#0D1B2A` | Main dark background; the hero and footer |
| `blue-500` | `#1380CC` | Brand blue (logo "TECH"), primary buttons and highlights on dark |
| `blue-600` | `#0F6DB0` | Blue for text and links on light backgrounds (passes AA contrast) |
| `wood-400` | `#C4966C` | Warm accent: rules, small highlights, the leaf |
| `paper` | `#F7F9FB` | Light section background |
| `ink` | `#0D1B2A` | Body text on light backgrounds |
| `muted` | `#4A5868` | Secondary text on light backgrounds (passes AA contrast) |

Use mostly navy and white. Blue is for actions, and wood is used sparingly. No purple gradients and no rainbow gradients.

**Typography:**
- Headings: **Montserrat** 600–800, a geometric sans close to the logo lettering.
- Body: **Inter**.
- Load both with `next/font`.

**Tagline:** "Strong roots. Smart systems."
**Supporting line:** "Software that helps Ghanaian businesses run and grow."

**Voice:** confident, plain and specific. Talk about outcomes (money recorded, hours saved, parcels delivered), not buzzwords. Write for a Ghanaian business owner first and an international buyer second. Use short sentences and no jargon in headlines.

## 3. Audience and goals

**Primary audience:** owners and managers of Ghanaian and African businesses:
- transport and logistics
- schools and daycares
- credit unions and microfinance
- real estate
- retail and e-commerce
- regulated industries such as pharma

**Secondary audience:** international companies looking for a senior engineering partner. The founder has shipped for clients in the US, UAE and Australia.

**Goals, in order:**
1. Book a call or send an enquiry, by contact form or WhatsApp.
2. Understand Kwanix and request a demo.
3. Trust Oakteck enough to hire it, through the founder's background, real projects and the technical depth shown.

## 4. Services

Each service gets a card on Home and a section on `/services`:

1. **Custom software and SaaS:** web platforms built for how the business actually runs, multi-tenant when needed.
2. **Web and mobile apps:** Next.js and React web apps, React Native and PWA mobile apps, offline-first where connectivity is unreliable.
3. **ERP and Odoo:** implementation, custom modules (inventory, payroll, audit trails, org charts) and integration with existing systems.
4. **Payments, SMS and integrations:** Mobile Money and card payments (Paystack), SMS (Arkesel), WhatsApp notifications, and Shopify or WooCommerce to ERP sync.
5. **AI for business:** document question-answering (RAG), data extraction and automation. On-premise models are possible so sensitive data stays in-house.
6. **Cloud, DevOps and modernisation:** moving monoliths to microservices, CI/CD, Docker and Kubernetes, AWS, uptime monitoring.
7. **Product and UI/UX design:** brand identity, design systems and mobile app UI kits.

## 5. Products and work to feature

Show only what is listed here. Where a fact is missing, use a marked placeholder; do not guess.

### Oakteck products

These five are Oakteck's own products. Show them on Home as a "Our products" grid, each with its own page under `/products/<slug>`. Every card carries a status badge.

**1. Kwanix: transport ticketing and parcel logistics** · `/products/kwanix` · Status: Live · https://kwanix.com

The flagship. A multi-tenant SaaS for Ghanaian inter-city bus companies. Give it a large spotlight section on Home.

What it does:
- counter and online ticket sales, with a visual seat map and cash or Mobile Money payment
- parcel logging with QR labels and SMS updates
- **scan-to-load protection:** a parcel cannot board a bus going to the wrong town
- OTP-verified parcel pickup
- live GPS fleet map
- branded PDF manifests
- revenue per trip and route, and demand intelligence with pricing suggestions
- passenger SMS reminders and live bus tracking

Tech:
- FastAPI and PostgreSQL, with data isolation enforced in the database (row-level security)
- Next.js frontend

Assets available from the owner:
- four narrated demo videos in `docs/kwanix-videos/` (owner dashboard, counter ticket sale, parcel journey, passenger booking), MP4 1440×900. For the Home spotlight, use a short muted clip cut from `03-parcel-journey.mp4` (the WRONG BUS moment), and offer the full videos on the Kwanix page with captions on.
- a partnership proposal document

Embed one short demo video, muted, playing on scroll into view, with a poster image and lazy loading. Add a "Request a demo" CTA.

**2. Nkabom: daycare management** · `/products/nkabom` · Status: **In development** (code on GitHub) · CTA: "Join the pilot"

SaaS for Ghanaian daycare centres and creches:
- offline-first PWA, which works on unreliable connections and needs no app store
- Mobile Money fee payments
- attendance tracking
- parent-teacher messaging
- children's progress reports

Stack: Next.js, TypeScript, PostgreSQL. Code: github.com/Justoo1/daycare-management-system

**3. FlexiFund: credit union and cooperative savings** · `/products/flexifund` · Status: **Live** · Demo: flexifund.edtmsys.com

Management system for credit unions and cooperative savings schemes:
- member registration
- savings, **susu** and fixed-deposit accounts
- transaction processing
- SMS notifications
- financial reports

Also has its own brand identity and a mobile app UI kit (onboarding, account dashboard, savings goals, loan applications) aimed at underbanked consumers.

**In production at Bethel COP Susu Enterprise (BCSE)** (https://bcse.edtmsys.com), a susu and savings enterprise. Its member-facing website and back office run on FlexiFund: savings, fixed deposits, personal loans, susu collections, Mobile Money and share capital. Show it as a "Live at BCSE" badge with a link, and a screenshot of their site on the FlexiFund page. The owner supplied this as a public client reference. **Do not reuse BCSE's own marketing figures** (members, savings totals) as Oakteck statistics.

Stack: Python, PostgreSQL. Do not publish the demo login credentials.

**4. WASSCE Analytics: results intelligence for senior high schools** · `/products/wassce-analytics` · Status: **Live** · https://wassceanalytics.ghsch.com

Multi-tenant SaaS for Ghanaian senior high schools:
- each school uploads its WAEC (WASSCE) results as PDF or Excel
- the platform parses them automatically
- dashboards show grade distributions, subject performance, year-on-year comparisons and **university qualification tracking** per student
- each school gets its own subdomain and isolated data

Stack: Next.js, FastAPI parsing service with Celery workers, PostgreSQL with schema-per-school isolation, Redis, S3-compatible storage. The live app opens on a school sign-in page. Link "Sign in" there, and add a "Book a demo for your school" CTA for new schools.

**5. AgriConnect: Ghana's agricultural value chain on one platform** · `/products/agriconnect` · Status: **In development**

Connects farmers, landowners, investors, mechanics, transport drivers, warehouse owners, B2B buyers, Agric Extension Officers, District Chief Executives and the Ministry of Food and Agriculture. Modules:
- **land:** list, search and secure land by lease, purchase or work-and-pay
- **equipment:** hire and repair dispatch, with escalation when repairs run late
- **warehousing:** match produce to storage, including government-subsidised approval chains
- **transport:** on-demand freight dispatch with live GPS tracking
- **B2B marketplace:** sell stored produce

Its key idea is **sponsorship**: independent, government-sponsored and investor-sponsored farming cycles each get the right approvals, payment rail and visibility.

Channels:
- Flutter mobile app with offline sync
- web portal
- **USSD menus for feature phones**

Integrates Mobile Money (Paystack), Arkesel SMS/OTP/USSD, Ghana Card verification and Ghana.GOV payments.

Stack: FastAPI modular monolith, PostgreSQL + PostGIS, Redis/Celery, Next.js, Flutter.

Status: the foundation phase is complete and further phases are in progress. Show "In development". Its CTA is "Partner with us / pilot enquiries", not "Request a demo".

### Selected work by the founder

Show these on `/work` as case-study cards (short MDX pages), labelled **"Founder's project"**. They are not Oakteck products. The owner may relabel any of them as an Oakteck client project later.

| Project | One line | Stack | Link |
|---|---|---|---|
| MCEES Engine: e-commerce to ERP sync | Async middleware that syncs Shopify and WooCommerce into Odoo; Redis locks prevent overselling stock; 6-view operations dashboard | FastAPI, Celery, Redis, PostgreSQL, Next.js | mcees.edtmsys.com |
| GMAK Properties | Real-estate marketing site with listings and search, plus an Odoo backend for leads, contracts and properties | Next.js, Tailwind, Odoo | gmakpropertiesgh.com |
| AI CV optimiser | Upload a CV and a job description; AI returns specific improvements | FastAPI, React, OpenAI API | cv.edtmsys.com |
| Barcode inventory system | Multi-warehouse barcode stock tracking tied into ERP; manual errors down 70% | Django, React, PostgreSQL | (none) |
| Apothecary Farms (US) | Marketing site with store locator; content managed in Sanity CMS | Next.js, Sanity | apothecaryfarms.com |

**Testimonials: build the section with these SAMPLE quotes. The owner will replace them with real ones.**

- Store them in `content/testimonials.ts`. Every entry has `sample: true`.
- **The section must not render in production while any testimonial has `sample: true`.** In development and preview builds it renders with a small "Sample" badge on each card.
- Never attach a real person's or company's name to a sample quote.

| Quote (sample) | Attribution (sample) | Product |
|---|---|---|
| "Before Kwanix we closed every evening guessing what the counters had collected. Now I see every ticket and parcel, station by station, before the last bus leaves." | Operations Manager, inter-city bus company | Kwanix |
| "Our members check their susu and savings balances themselves now, and month-end reports take minutes, not days." | Manager, savings and loans enterprise | FlexiFund |
| "We used to rebuild our WASSCE results in spreadsheets every year. Now we see which students qualify for university the same day the results arrive." | Assistant Headmaster (Academics), senior high school | WASSCE Analytics |
| "Justice understood our operations before he wrote a line of code. The system just fits how we work." | Managing Director, Accra-based SME | Custom software |
| "Fast, honest and reliable. Oakteck shipped what they promised, and they still pick up the phone." | Founder, e-commerce brand | Integrations |

Client logos: none yet. Do not show any logo without written permission. BCSE may be shown as a product reference (see FlexiFund).

### Founder's experience: About page only, not Oakteck case studies

These were built while the founder was employed elsewhere. Describe them as the founder's experience. **Do not present them as Oakteck client work** or name the employer's clients.
- Led the migration of 20+ Odoo applications to FastAPI microservices: deployments 40% faster, internal latency down 25%.
- Built an AI document system with on-premise LLMs: data processing 85% more efficient.
- Ran CI/CD across US, Australia and UAE branches with zero-downtime releases.
- Led a team of 5 engineers across three continents.

## 6. Founder: About page

- **Justice Amankrah**, Founder & CEO, Software Engineer, based in Accra.
- Senior full-stack engineer with 7+ years of experience. Shipped production systems for clients in Africa, the US, UAE and Australia.
- Specialises in Python (FastAPI, Django) and React / Next.js, and builds practical AI into real operations.
- Career path:
  - Electoral Commission of Ghana: systems administrator during national voter registration
  - Lead engineer and team lead, 2023 to present
- BSc Computer Science (2021). Certifications include AWS Solutions Architect Associate and CCNA.
- Founder stats, as stated on the portfolio and attributed to the founder, not the company: **7+ years**, **11+ projects shipped**, **34+ technologies**, **99.9% uptime** on managed systems.
- Links: portfolio https://justice.edtmsys.com · GitHub https://github.com/Justoo1 · LinkedIn https://www.linkedin.com/in/justiceamankrah/

Photo: `docs/brand/justice-amankrah-headshot.jpg` (600×600, plain white background, navy top). Show it in a rounded frame on About and beside the founder note on Home. Alt text: "Justice Amankrah, founder of Oakteck".

## 7. Contact details

- **Phone and WhatsApp:** +233 54 913 2837. Add click-to-call (`tel:+233549132837`) and click-to-chat (`https://wa.me/233549132837`).
- **Email:** amankrahjay@gmail.com. Switch to `hello@oakteckgh.com` once the domain's mailbox is set up; keep the address in one config constant.
- **Location:** Accra, Ghana.

**Contact form:**
- Fields: name, company, phone or email, "what do you need?" (select a service), message, and preferred contact method (WhatsApp, call or email).
- Send with **Resend** from a server action. Add a honeypot field and rate limiting.
- Show a success state.

Add a floating WhatsApp button on mobile.

## 8. Sitemap and page content

1. **Home** (`/`)
   - **Hero:** tagline as the H1, the supporting line, two buttons ("Start a project" and "See Kwanix"), and the animated oak/circuit visual (section 9).
   - **Trust strip:** what Oakteck builds for (sectors), as an icon row. No fake logos.
   - **Services:** 7 cards with a hover lift and an icon.
   - **Kwanix spotlight:** product screenshot or video, 4 outcome bullets, and a demo button.
   - **Our products:** 5 cards (Kwanix, Nkabom, FlexiFund, WASSCE Analytics, AgriConnect), each with a sector icon, one line, a status badge and a link.
   - **How we work:** 4 steps (Discover → Design → Build → Support), drawn as a connected line that animates as you scroll.
   - **Selected work:** 3 cards from the founder's projects, linking to `/work`.
   - **Founder note:** a short quote from Justice and a link to About.
   - **Tech we use:** a slow, pausable marquee of stack logos (Python, FastAPI, Django, Next.js, React, TypeScript, PostgreSQL, Redis, Docker, AWS, Odoo, LangChain).
   - **Final CTA band:** "Let's build something that lasts."
2. **Services** (`/services`): each service with problem → what we build → typical stack → example.
3. **Products** (`/products`, plus one page per product): an overview grid, then a page each for Kwanix, Nkabom, FlexiFund, WASSCE Analytics and AgriConnect. Each page has the problem, the features (alternating text and screenshot or illustration), who it's for, a status badge and a CTA. Kwanix gets the embedded video. Pricing is given on request, so don't put prices on the site.
4. **Work** (`/work`, `/work/[slug]`): filterable case studies in MDX (filters: SaaS, ERP, AI, Web, Design).
5. **About** (`/about`): the Oakteck story (the meaning of the oak), the founder bio and timeline, and values (Reliability · Local insight · Craft · Honesty).
6. **Contact** (`/contact`): form, WhatsApp, phone, email, location and office hours.
7. **Insights** (`/blog`, optional): an MDX blog scaffold with one sample post title, clearly marked as a draft.
8. **Legal:** a privacy policy page (data controller: "Justice Amankrah, trading as Oakteck Technology"; it covers the contact form, analytics and email), plus a cookie notice only if analytics sets cookies. Mark the policy text "Draft: to be reviewed".

## 9. Animation and interaction

Animation should feel smooth and deliberate, never distracting.

- **Library:** Motion (`motion/react`) for component animation. Use plain CSS where it's enough. Add GSAP ScrollTrigger only if a scroll sequence truly needs it.
- **Hero signature:** an inline SVG of the oak leaf.
  - The circuit veins draw themselves (stroke-dashoffset), then the end nodes light up in sequence in blue.
  - Thin "roots" extend down into the page as subtle lines that later lead into the How-we-work timeline.
  - Mouse movement adds a gentle parallax on desktop only.
- **Scroll reveals:** headings and cards fade up 16–24 px with a 60–80 ms stagger. They run once, not on every scroll.
- **Number counters:** count up when visible (founder stats on About only).
- **Kwanix section:** the product screenshot sits in a device frame with slight 3D tilt or parallax on scroll; the video plays when visible.
- **Micro-interactions:** buttons get a subtle press scale; links get an animated underline in wood colour; cards lift with a soft shadow.
- **Page transitions:** a short fade/slide between routes (View Transitions API, or Motion `AnimatePresence`).
- **Reduced motion:** honour `prefers-reduced-motion`. Turn off parallax, draw-on effects and the marquee, and show final states instead.
- **Performance:** animate only `transform` and `opacity`. No scroll-jacking. Don't animate layout.

## 10. Technical requirements

- **Framework:** Next.js 16 (App Router), TypeScript in strict mode, Tailwind CSS v4, shadcn/ui primitives, MDX for case studies and blog posts.
- **Config:** brand, contact details and links live in one typed `site.config.ts`. A second brand (the owner plans a future company called FullAxis) should be able to reuse the codebase by swapping the config and theme tokens.
- **SEO:**
  - per-page `metadata`
  - `sitemap.ts` and `robots.ts`
  - Open Graph images via `next/og` (navy background, logo, page title)
  - JSON-LD: `Organization` (Oakteck: `name`, `legalName` from config, `founder` → the Person, logo, url, contactPoint with telephone, address in Accra, Ghana; no `Ltd`), `Person` (the founder), and `SoftwareApplication` (Kwanix)
- **Performance** (many visitors are on mobile data):
  - Lighthouse 95+ on mobile
  - LCP under 2.5 s on 4G, CLS under 0.1
  - `next/image` with AVIF/WebP
  - videos lazy-loaded with poster frames
  - fonts self-hosted through `next/font`
  - a total JS budget for the home page of about 200 KB gzipped
- **Accessibility:**
  - WCAG 2.2 AA
  - semantic landmarks, visible focus states, labelled form fields
  - AA colour contrast (use `blue-600` for text on light backgrounds, not `blue-500`)
  - fully keyboard-navigable menus
- **Responsive:** design mobile-first, from 360 px phones up to 1440 px desktops. The mobile nav is a sheet menu, with the WhatsApp button kept within reach.
- **Dark and light:** the brand is dark-led (navy hero and footer) with light content sections. A theme toggle is not required.
- **Analytics:** Vercel Analytics or Plausible, which avoids a cookie banner.
- **Deployment:** Vercel. Document the environment variables (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`) in `README.md` and `.env.example`.

## 11. Do not

- Use stock photos of handshakes, generic "AI brain" art, emoji as icons, or lorem ipsum.
- Invent client names, logos, testimonials, awards, team size or statistics.
- Present employer work as Oakteck client work (see section 5).
- Publish any credentials, API keys or demo passwords.
- Use any `oaktech` domain, `oakteck.com`, or the spelling "OakTech" anywhere. The domain is `oakteckgh.com`.
- Ship the old "OAKTECH" logo artwork.

## 12. Deliverables and acceptance

- [ ] A working Next.js project with all pages in section 8, real copy from this brief, and placeholders only where facts are missing.
- [ ] The hero oak/circuit SVG animation, scroll reveals, the process timeline and the micro-interactions, all with reduced-motion fallbacks.
- [ ] A contact form that sends through Resend (and works locally with a test key), plus WhatsApp and phone links.
- [ ] SEO metadata, sitemap, robots, OG images and JSON-LD.
- [ ] A Lighthouse report (mobile) of 95+ for Performance, Accessibility, Best Practices and SEO on Home and Kwanix.
- [ ] A `README.md` covering setup, environment variables, how to add a case study (MDX) and how to change the domain.
- [ ] A short `OWNER-TODO.md` listing every placeholder and open question: domain registration and DNS for `oakteckgh.com`, the `hello@oakteckgh.com` mailbox, real testimonials (replacing the samples) and client logos, and an Accra street address if one should be shown.
