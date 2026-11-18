import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { ArrowUpRight, Award, Briefcase, GraduationCap, Vote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Placeholder } from "@/components/placeholder";
import { Logo } from "@/components/brand/logo";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Oakteck is a software business in Accra, Ghana, founded by Justice Amankrah: strong roots, smart systems, and software that helps Ghanaian businesses run and grow.",
  path: "/about",
});

const stats = [
  { value: 7, suffix: "+", label: "years of experience" },
  { value: 11, suffix: "+", label: "projects shipped" },
  { value: 34, suffix: "+", label: "technologies" },
  { value: 99.9, decimals: 1, suffix: "%", label: "uptime on managed systems" },
];

const experience = [
  "Led the migration of 20+ Odoo applications to FastAPI microservices: deployments 40% faster, internal latency down 25%.",
  "Built an AI document system with on-premise LLMs: data processing 85% more efficient.",
  "Ran CI/CD across US, Australia and UAE branches with zero-downtime releases.",
  "Led a team of 5 engineers across three continents.",
];

const timeline = [
  {
    icon: Vote,
    when: <Placeholder>[YEAR]</Placeholder>,
    title: "Electoral Commission of Ghana",
    body: "Systems administrator during national voter registration.",
  },
  {
    icon: GraduationCap,
    when: "2021",
    title: "BSc Computer Science",
    body: "Certifications include AWS Solutions Architect Associate and CCNA.",
  },
  {
    icon: Briefcase,
    when: "2023 to present",
    title: "Lead engineer and team lead",
    body: "Leading a team of engineers across three continents.",
  },
  {
    icon: Award,
    when: <Placeholder>[YEAR]</Placeholder>,
    title: "Founded Oakteck",
    body: "Registered in Ghana as Oakteck Technology, building products and custom software for African businesses.",
  },
];

const values = [
  { title: "Reliability", body: "Systems that stay up, and people who pick up the phone when something goes wrong." },
  { title: "Local insight", body: "Software shaped around Mobile Money, SMS, patchy networks and how Ghanaian businesses really work." },
  { title: "Craft", body: "Clean code, careful design and tested releases, because a system is only as good as its weakest part." },
  { title: "Honesty", body: "Clear scope and straight answers, including when the simplest fix isn't software." },
];

export default function AboutPage() {
  const { founder, links } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/about", label: "About" }]}
        eyebrow="About Oakteck"
        title={siteConfig.tagline}
        intro="Oakteck is a software business in Accra, Ghana. We build the systems that keep businesses running: ticketing, savings, results, payments and the ERP behind them."
      />

      {/* Story: the meaning of the oak */}
      <section aria-labelledby="story-title" className="bg-white py-16 lg:py-24">
        <Reveal className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="mx-auto w-full max-w-xs rounded-3xl bg-navy-950 p-10">
            <Logo variant="mark" label="Oakteck leaf mark" className="h-auto w-full" />
          </div>
          <div>
            <p className="eyebrow text-wood-700">Our story</p>
            <h2 id="story-title" className="mt-3 text-3xl leading-tight font-bold text-ink sm:text-4xl">
              Why an oak leaf with circuits for veins.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                An oak grows slowly and lasts for generations, because its roots go deep before it grows tall. That is
                how we think about software: durable foundations first, then growth.
              </p>
              <p>
                The circuit veins in our leaf are technology growing out of those roots. Every system we build starts
                with how a business actually runs, its people, its cash, its customers, and adds technology where it
                makes that stronger.
              </p>
              <p>
                {siteConfig.supportingLine} That is the whole job, and we take it personally.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Founder */}
      <section aria-labelledby="founder-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2.2rem] border border-wood-400/50" />
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                width={600}
                height={600}
                sizes="(min-width: 1024px) 384px, 90vw"
                className="relative rounded-[1.8rem] bg-white"
              />
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              <li>
                <a href={links.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line hover:ring-blue-600">
                  Portfolio <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line hover:ring-blue-600">
                  <GitHubIcon className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line hover:ring-blue-600">
                  LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-wood-700">The founder</p>
              <h2 id="founder-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                {founder.name}
              </h2>
              <p className="mt-1 font-heading font-semibold text-wood-700">
                {founder.role} · {founder.jobTitle} · Accra
              </p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                <p>
                  Justice is a senior full-stack engineer with 7+ years of experience, who has shipped production
                  systems for clients in Africa, the US, the UAE and Australia.
                </p>
                <p>
                  Justice specialises in Python (FastAPI, Django) and React / Next.js, and builds practical AI into
                  real operations.
                </p>
              </div>
            </Reveal>

            <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <StaggerItem as="li" key={s.label} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                  <p className="font-heading text-3xl font-extrabold text-ink">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-3 text-xs text-muted">
              Figures are the founder&apos;s own, as stated on{" "}
              <a href={links.portfolio} className="link-underline text-blue-600" target="_blank" rel="noopener noreferrer">
                justice.edtmsys.com
              </a>
              , not Oakteck company statistics.
            </p>

            <Reveal className="mt-12">
              <h3 className="text-xl font-bold text-ink">Experience before Oakteck</h3>
              <p className="mt-2 text-muted">Work Justice led while employed elsewhere. It is not Oakteck client work.</p>
              <ul className="mt-5 space-y-3">
                {experience.map((e) => (
                  <li key={e} className="flex gap-3 leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-wood-400" />
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="bg-white py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-wood-700">Timeline</p>
            <h2 id="timeline-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              The roots of Oakteck
            </h2>
          </Reveal>
          <Stagger as="ol" className="relative mt-12 space-y-10 border-l-2 border-wood-400/50 pl-8 sm:pl-10">
            {timeline.map((t) => (
              <StaggerItem as="li" key={t.title} className="relative">
                <span className="absolute top-0 -left-[3.05rem] flex size-10 items-center justify-center rounded-full bg-navy-950 text-blue-400 ring-4 ring-white sm:-left-[3.55rem]">
                  <t.icon className="size-4.5" aria-hidden="true" />
                </span>
                <p className="font-mono text-sm text-wood-700">{t.when}</p>
                <h3 className="mt-1 text-xl font-bold text-ink">{t.title}</h3>
                <p className="mt-1 max-w-xl leading-relaxed text-muted">{t.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="on-dark bg-navy-950 py-16 text-white lg:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-wood-400">What we stand for</p>
            <h2 id="values-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              Reliability · Local insight · Craft · Honesty
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className="rounded-2xl bg-navy-900 p-6 ring-1 ring-white/10">
                <p className="font-mono text-sm text-wood-400">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
