import Link from "@/components/app-link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { services } from "@/content/services";
import { serviceIcons } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const card =
  "group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lift motion-reduce:hover:translate-y-0";

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="What we build"
          title="Software that fits how your business runs."
          intro="From a single integration to a full platform. We build it, connect it to what you already use, and keep it running."
        />
        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <StaggerItem as="li" key={s.slug}>
                <article className={card}>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-navy-950 text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg leading-snug font-semibold text-ink">
                    <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.short}</p>
                </article>
              </StaggerItem>
            );
          })}
          <StaggerItem as="li">
            <div className="flex h-full flex-col justify-between rounded-2xl bg-navy-950 p-6 text-white">
              <div>
                <MessageCircle className="size-6 text-wood-400" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">Not sure what you need?</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">
                  Tell us the problem. We&apos;ll suggest the simplest thing that solves it.
                </p>
              </div>
              <Link
                href="/contact"
                className="link-underline mt-6 inline-flex w-fit items-center gap-1.5 font-heading text-sm font-semibold text-blue-400"
              >
                Talk to us <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
