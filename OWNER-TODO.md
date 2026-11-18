# Owner to-do

Everything the site still needs from you. Items marked **(visible)** show as a dashed `[PLACEHOLDER]` on the live pages until you fill them in.

## Before launch

- [ ] **Register `oakteckgh.com` and set up DNS.** Point it at Vercel, add `www.oakteckgh.com` and redirect it to the bare domain. Then set `NEXT_PUBLIC_SITE_URL=https://oakteckgh.com` in Vercel and redeploy. See README → "Change the domain".
- [ ] **Create the `hello@oakteckgh.com` mailbox.** Then change `CONTACT_EMAIL` in `site.config.ts` from `amankrahjay@gmail.com`; it updates the footer, contact page, privacy policy and structured data.
- [ ] **Set up Resend:**
  - Create an API key and add it to Vercel as `RESEND_API_KEY`.
  - Verify `oakteckgh.com` in Resend.
  - Set `CONTACT_FROM_EMAIL` (for example `Oakteck website <website@oakteckgh.com>`) and `CONTACT_TO_EMAIL`.
  - Send a test enquiry from the live site.
- [ ] **Enable Vercel Web Analytics** in the Vercel dashboard.
- [ ] **Run PageSpeed Insights (mobile) on Home and `/products/kwanix` once live.** The brief asks for 95+. Locally, Home's median was 82 (best 97) and Kwanix's 93 (89–94); see README → "Performance and accessibility".

## Facts only you can supply

- [ ] **Office hours (visible).** Shown in the footer and on `/contact`. Set `officeHours` in `site.config.ts`.
- [ ] **Founder quote (visible).** The "A note from the founder" block on Home needs two or three sentences in Justice's own words: `components/home/founder-note.tsx`.
- [ ] **Accra street address.** Decide whether a street address should be shown.
  - If yes, set `streetAddress` in `site.config.ts`. It then appears on `/contact` and in structured data.
  - Either way, fill in the **privacy policy** address placeholder (visible).
- [ ] **About timeline years (visible)** in `app/about/page.tsx`:
  - The year Justice worked as a systems administrator for the Electoral Commission of Ghana.
  - The year Oakteck was founded or registered.
- [ ] **Real testimonials.** Replace the five sample quotes in `content/testimonials.ts` with real ones you have permission to publish, and set `sample: false` on each. The section stays hidden in production until no samples remain.
- [ ] **Client logos.** None are shown. Send any you have written permission to use.
- [ ] **BCSE screenshot (visible).** A screenshot of bcse.edtmsys.com for the FlexiFund page ("Live at BCSE" section). I can capture it if you confirm that's fine with BCSE.
- [ ] **Case study results (visible).** The "Outcome" for MCEES Engine, GMAK Properties, AI CV optimiser and Apothecary Farms (`content/work/*.mdx`). The barcode inventory system already has its "manual errors down 70%".
- [ ] **Kwanix video captions.** The four demo videos are narrated, but no transcript was supplied. Please provide the narration scripts, or `.vtt` caption files, and they'll be switched on by default (README → "Kwanix videos and captions"). I tried a local speech-to-text draft, but its runtime couldn't be downloaded on this machine.

## Please review

- [ ] **Copy I wrote from the brief.** I added framing sentences around the brief's facts. Please check you're happy with:
  - each product's "problem" paragraph (`content/products.ts`);
  - the "problem" lines on Services (`content/services.ts`);
  - the "The problem" / "What was built" wording in each case study;
  - the How-we-work steps and the four values on About.
- [ ] **Privacy policy** (`/privacy`), marked "Draft: to be reviewed":
  - have it reviewed;
  - fill in **[DATE]** (visible) and **[RETENTION PERIOD]** (visible), how long you keep enquiries;
  - confirm the processors listed: Resend, Vercel Web Analytics and WhatsApp.
- [ ] **Public links.** Confirm you're happy linking to each of these:
  - the Nkabom GitHub repo (github.com/Justoo1/daycare-management-system): is it public?
  - the FlexiFund demo (flexifund.edtmsys.com);
  - the WASSCE Analytics sign-in;
  - mcees.edtmsys.com, cv.edtmsys.com, gmakpropertiesgh.com and apothecaryfarms.com.
- [ ] **Kwanix demo data.** The demo videos and the screenshots taken from them show the demo company "GoldCoast Express" with sample names and phone numbers. Please confirm these are fictional.
- [ ] **Blog draft.** `/blog` has one sample post title, "What offline-first software means for Ghanaian businesses", marked as a draft and hidden from search engines. Write it, or delete it from `content/blog.ts` and `content/blog/`.
- [ ] **Colour adjustments for accessibility.** These differ slightly from the brief:
  - buttons use `blue-600` rather than `blue-500` (white on `blue-500` fails AA contrast);
  - WhatsApp buttons use a deeper green.

  See README → "Colour notes".
- [ ] **Work filters.** None of the listed projects is design work, so the "Design" filter on `/work` (and "SaaS") only appears once a project with that tag is added.
