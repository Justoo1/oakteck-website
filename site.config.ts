/**
 * Single source of truth for brand, legal, contact and link details.
 *
 * To reuse this codebase for another brand (e.g. FullAxis), swap this file and
 * the colour tokens in `app/theme.css`, then replace the files in `public/brand/`.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200").replace(/\/$/, "");

/**
 * Public contact address. Mail to it is forwarded to the owner's inbox by
 * Cloudflare Email Routing.
 */
const CONTACT_EMAIL = "hello@oakteckgh.com";

export const siteConfig = {
  name: "Oakteck",
  url: siteUrl,
  locale: "en_GH",

  legal: {
    /** Full registered name, exactly as on the certificate. Use only in legal lines. */
    name: "Oakteck Technology",
    registrationNumber: "BN032161222",
    form: "Registered business name in Ghana",
    owner: "Justice Amankrah",
  },

  tagline: "Strong roots. Smart systems.",
  supportingLine: "Software that helps Ghanaian businesses run and grow.",
  description:
    "Oakteck builds custom software, SaaS products, ERP systems and mobile apps for Ghanaian and African businesses, from ticketing and parcel logistics to school results and savings.",

  contact: {
    email: CONTACT_EMAIL,
    phone: {
      display: "+233 54 913 2837",
      tel: "tel:+233549132837",
      e164: "+233549132837",
    },
    whatsapp: {
      href: "https://wa.me/233549132837",
      defaultMessage: "Hello Oakteck, I'd like to talk about a project.",
    },
    location: {
      city: "Accra",
      country: "Ghana",
      countryCode: "GH",
      /** Leave null until the owner confirms a street address should be shown. */
      streetAddress: null as string | null,
    },
    /** Ghana time (GMT, no daylight saving). */
    officeHours: "Mon–Sat, 8 AM – 5 PM (GMT)",
  },

  founder: {
    name: "Justice Amankrah",
    role: "Founder & CEO",
    jobTitle: "Software Engineer",
    image: "/images/justice-amankrah.jpg",
    imageAlt: "Justice Amankrah, founder of Oakteck",
  },

  links: {
    portfolio: "https://justice.edtmsys.com",
    github: "https://github.com/Justoo1",
    linkedin: "https://www.linkedin.com/in/justiceamankrah/",
    kwanix: "https://kwanix.com",
  },

  nav: [
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ],

  brand: {
    logoOnDark: "/brand/oakteck-logo-on-dark.svg",
    logoOnLight: "/brand/oakteck-logo-on-light.svg",
    mark: "/brand/oakteck-mark.svg",
    appIcon512: "/brand/oakteck-app-icon-512.png",
    themeColor: "#0D1B2A",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  return `${siteConfig.contact.whatsapp.href}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
