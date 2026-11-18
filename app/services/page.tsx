import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { Route } from "next";
import Link from "@/components/app-link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { serviceIcons } from "@/components/icons";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Custom software and SaaS, web and mobile apps, ERP and Odoo, Mobile Money payments and SMS, AI for business, cloud and DevOps, and product design, from Oakteck in Accra.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        eyebrow="Services"
        title="What we build, and why it works."
        intro="Seven ways we help businesses run and grow. Each starts with the problem you have today, not the technology."
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/85 transition-colors hover:border-wood-400 hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((s, i) => {
        const Icon = serviceIcons[s.icon];
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={cn("scroll-mt-20 py-16 lg:py-24", i % 2 === 0 ? "bg-white" : "bg-paper")}
          >
            <Reveal className="container-page grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy-950 text-blue-400">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-6 font-mono text-sm text-wood-700">{String(i + 1).padStart(2, "0")} / 07</p>
                <h2 id={`${s.slug}-title`} className="mt-2 text-3xl leading-tight font-bold text-ink sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.short}</p>
              </div>

              <dl className="grid gap-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="eyebrow text-wood-700">The problem</dt>
                  <dd className="mt-2 text-lg leading-relaxed text-ink">{s.problem}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-wood-700">What we build</dt>
                  <dd className="mt-3">
                    <ul className="space-y-2.5">
                      {s.build.map((b) => (
                        <li key={b} className="flex gap-2.5 leading-relaxed text-ink">
                          <Check className="mt-1 size-4 shrink-0 text-blue-600" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-wood-700">Typical stack</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {s.stack.map((t) => (
                        <li key={t} className="rounded-md bg-white px-2.5 py-1 font-mono text-[0.8rem] text-ink ring-1 ring-line">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-white p-5 sm:col-span-2">
                  <dt className="eyebrow text-wood-700">Example</dt>
                  <dd className="mt-2">
                    <Link
                      href={s.example.href as Route}
                      className="group inline-flex items-center gap-1.5 font-heading text-lg font-semibold text-blue-600"
                    >
                      {s.example.label}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                    <p className="mt-1 leading-relaxed text-muted">{s.example.text}</p>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
