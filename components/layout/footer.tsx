import Link from "@/components/app-link";
import type { Route } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons";
import { products } from "@/content/products";
import { siteConfig, whatsappLink } from "@/site.config";

/** Year of the build; every deploy refreshes it. */
function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}

const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy policy" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow mb-4 text-wood-400">{children}</h2>;
}

export function Footer() {
  const { contact, legal, links } = siteConfig;
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wood-400/50 to-transparent" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block rounded-md">
            <Logo variant="dark" label={null} className="h-14" />
          </Link>
          <p className="mt-5 font-heading text-lg font-semibold">{siteConfig.tagline}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">{siteConfig.supportingLine}</p>
          <p className="mt-6 text-sm text-mist">
            Founded by{" "}
            <a href={links.portfolio} className="link-underline text-white" target="_blank" rel="noopener noreferrer">
              {siteConfig.founder.name}
            </a>
          </p>
        </div>

        <nav aria-label="Products">
          <FooterHeading>Products</FooterHeading>
          <ul className="space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}` as Route} className="link-underline text-white/80 hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <FooterHeading>Company</FooterHeading>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href as Route} className="link-underline text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Get in touch</FooterHeading>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={contact.phone.tel} className="flex items-center gap-3 text-white/80 hover:text-white">
                <Phone className="size-4 text-wood-400" aria-hidden="true" />
                {contact.phone.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-wood-400" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-white/80 hover:text-white">
                <Mail className="size-4 shrink-0 text-wood-400" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <MapPin className="size-4 text-wood-400" aria-hidden="true" />
              {contact.location.city}, {contact.location.country}
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <Clock className="size-4 text-wood-400" aria-hidden="true" />
              {contact.officeHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {legal.name} · {legal.form} · Reg. No. {legal.registrationNumber}
          </p>
          <p>Made in Accra.</p>
        </div>
      </div>
    </footer>
  );
}
