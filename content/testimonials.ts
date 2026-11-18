/**
 * SAMPLE testimonials from docs/BRIEF.md. The owner will replace them with real ones.
 *
 * Rules:
 * - Every sample keeps `sample: true`.
 * - Never attach a real person's or company's name to a sample quote.
 * - While ANY entry has `sample: true`, the section does not render in
 *   production (see `showTestimonials`). It renders with a "Sample" badge in
 *   development and Vercel preview builds.
 */

export type Testimonial = {
  quote: string;
  attribution: string;
  product: string;
  sample: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Before Kwanix we closed every evening guessing what the counters had collected. Now I see every ticket and parcel, station by station, before the last bus leaves.",
    attribution: "Operations Manager, inter-city bus company",
    product: "Kwanix",
    sample: true,
  },
  {
    quote:
      "Our members check their susu and savings balances themselves now, and month-end reports take minutes, not days.",
    attribution: "Manager, savings and loans enterprise",
    product: "FlexiFund",
    sample: true,
  },
  {
    quote:
      "We used to rebuild our WASSCE results in spreadsheets every year. Now we see which students qualify for university the same day the results arrive.",
    attribution: "Assistant Headmaster (Academics), senior high school",
    product: "WASSCE Analytics",
    sample: true,
  },
  {
    quote: "Justice understood our operations before he wrote a line of code. The system just fits how we work.",
    attribution: "Managing Director, Accra-based SME",
    product: "Custom software",
    sample: true,
  },
  {
    quote: "Fast, honest and reliable. Oakteck shipped what they promised, and they still pick up the phone.",
    attribution: "Founder, e-commerce brand",
    product: "Integrations",
    sample: true,
  },
];

const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

/** False in production while any testimonial is still a sample. */
export const showTestimonials = !(isProduction && testimonials.some((t) => t.sample));
