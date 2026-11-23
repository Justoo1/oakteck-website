import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappLink } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    `Start a project or request a demo. WhatsApp or call ${siteConfig.contact.phone.display}, or send us a message. Oakteck, Accra, Ghana.`,
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const rows = [
    { icon: Phone, label: "Call", value: contact.phone.display, href: contact.phone.tel },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location.streetAddress
        ? `${contact.location.streetAddress}, ${contact.location.city}, ${contact.location.country}`
        : `${contact.location.city}, ${contact.location.country}`,
    },
    { icon: Clock, label: "Office hours", value: contact.officeHours },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ href: "/contact", label: "Contact" }]}
        eyebrow="Contact"
        title="Let's talk about your business."
        intro="Tell us what you want to fix or build. The fastest way to reach us is WhatsApp."
      />
      <section aria-label="Contact options" className="bg-paper py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <div>
            <h2 className="sr-only">Send a message</h2>
            <ContactForm />
          </div>
          <aside className="space-y-4 lg:pt-0">
            <div className="on-dark rounded-3xl bg-navy-950 p-7 text-white">
              <h2 className="text-xl font-bold">Prefer WhatsApp?</h2>
              <p className="mt-2 text-mist">Message us directly and we&apos;ll pick it up from there.</p>
              <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
            <ul className="divide-y divide-line rounded-3xl bg-white px-7 ring-1 ring-line">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4 py-5">
                  <r.icon className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{r.label}</p>
                    {r.href ? (
                      <a href={r.href} className="link-underline font-medium break-all text-ink">
                        {r.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{r.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
