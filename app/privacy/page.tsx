import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { Placeholder } from "@/components/placeholder";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    `How ${siteConfig.legal.name} handles personal data from this website: the contact form, email and analytics.`,
  path: "/privacy",
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 mb-3 text-2xl font-bold text-ink">{children}</h2>;
}

export default function PrivacyPage() {
  const { legal, contact } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/privacy", label: "Privacy policy" }]}
        eyebrow="Legal"
        title="Privacy policy"
        intro="What we collect through this website, why, and what you can ask us to do with it."
      />
      <article className="bg-white py-14 lg:py-20">
        <div className="container-page max-w-3xl text-lg leading-relaxed text-muted [&_p]:my-4 [&_strong]:text-ink [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <p className="rounded-xl border border-dashed border-wood-400 bg-wood-400/10 p-4 font-mono text-sm text-wood-700">
            Draft: to be reviewed. This policy has not yet been reviewed by a lawyer.
          </p>
          <p className="text-sm">Last updated: <Placeholder>[DATE]</Placeholder></p>

          <H2>Who we are</H2>
          <p>
            This website is run by Oakteck. The data controller is{" "}
            <strong>
              {legal.owner}, trading as {legal.name} (Reg. No. {legal.registrationNumber})
            </strong>
            , a registered business name in Ghana, based in {contact.location.city}, {contact.location.country}.{" "}
            Address: <Placeholder>[ACCRA ADDRESS]</Placeholder>.
          </p>
          <p>
            Questions about this policy or your data: <a className="link-underline text-blue-600" href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
            or <a className="link-underline text-blue-600" href={contact.phone.tel}>{contact.phone.display}</a>.
          </p>

          <H2>What we collect through the contact form</H2>
          <p>When you send us a message, we collect:</p>
          <ul>
            <li>your name and, if you give it, your company;</li>
            <li>the phone number or email address you give us;</li>
            <li>what you need, your message and how you would like us to contact you.</li>
          </ul>
          <p>
            We use these details only to reply to your enquiry and to discuss the work you asked about. We do not sell
            them or use them for unrelated marketing. To protect the form from abuse, our server briefly keeps the IP
            address a message was sent from in memory, to limit how many messages can be sent in a short time.
          </p>

          <H2>Email</H2>
          <p>
            Messages from the contact form are delivered to us by email through <strong>Resend</strong>, an email
            delivery service, which processes them on our behalf. If you email us directly, your message is held in our
            email account.
          </p>

          <H2>WhatsApp and phone</H2>
          <p>
            If you contact us on WhatsApp, your messages are also handled under WhatsApp&apos;s own terms and privacy
            policy.
          </p>

          <H2>Analytics</H2>
          <p>
            We use <strong>Vercel Web Analytics</strong> to count page views and see which pages are useful. It does not
            use cookies and does not identify you personally; it reports aggregated visits. Because no analytics cookies
            are set, this site does not show a cookie banner.
          </p>

          <H2>How long we keep your data</H2>
          <p>
            We keep enquiry details for <Placeholder>[RETENTION PERIOD]</Placeholder>, or for as long as we are working
            with you, and then delete them.
          </p>

          <H2>Your rights</H2>
          <p>
            You can ask us what personal data we hold about you, ask us to correct it, or ask us to delete it. Contact us
            using the details above. You may also have rights under Ghana&apos;s Data Protection Act, 2012 (Act 843).
          </p>

          <H2>Changes to this policy</H2>
          <p>If we change how we handle personal data, we will update this page and the date at the top.</p>
        </div>
      </article>
    </>
  );
}
