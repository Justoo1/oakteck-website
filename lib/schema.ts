import { siteConfig, absoluteUrl } from "@/site.config";
import { getProduct } from "@/content/products";

const ORG_ID = absoluteUrl("/#organization");
const FOUNDER_ID = absoluteUrl("/#founder");

/** Organization: Oakteck, a registered business name (no Ltd/Inc). */
export function organizationSchema() {
  const { contact, legal } = siteConfig;
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: legal.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.brand.appIcon512),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: contact.email,
    telephone: contact.phone.e164,
    founder: { "@id": FOUNDER_ID },
    address: {
      "@type": "PostalAddress",
      ...(contact.location.streetAddress ? { streetAddress: contact.location.streetAddress } : {}),
      addressLocality: contact.location.city,
      addressCountry: contact.location.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.phone.e164,
        email: contact.email,
        areaServed: "GH",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function founderSchema() {
  const { founder, links } = siteConfig;
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    jobTitle: founder.role,
    image: absoluteUrl(founder.image),
    url: links.portfolio,
    sameAs: [links.portfolio, links.github, links.linkedin],
    worksFor: { "@id": ORG_ID },
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    knowsAbout: ["Python", "FastAPI", "Django", "React", "Next.js", "Odoo", "AI"],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GH",
  };
}

/** Kwanix as a SoftwareApplication. No price: pricing is on request. */
export function kwanixSchema() {
  const p = getProduct("kwanix")!;
  return {
    "@type": "SoftwareApplication",
    "@id": absoluteUrl("/products/kwanix#software"),
    name: p.name,
    description: `${p.oneLine} ${p.problem.body}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: p.category,
    operatingSystem: "Web",
    url: "https://kwanix.com",
    sameAs: [absoluteUrl("/products/kwanix")],
    image: absoluteUrl("/images/kwanix/counter-sale.webp"),
    featureList: p.features.map((f) => f.title),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
