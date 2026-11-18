import Image from "next/image";
import Link from "@/components/app-link";
import { ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/site.config";

export function FounderNote() {
  const { founder } = siteConfig;
  return (
    <section aria-labelledby="founder-title" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="grid items-center gap-10 rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-10 md:grid-cols-[auto_1fr] lg:gap-14 lg:p-14">
          <div className="relative mx-auto w-44 sm:w-52">
            <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem] border border-wood-400/40" />
            <Image
              src={founder.image}
              alt={founder.imageAlt}
              width={600}
              height={600}
              sizes="(min-width: 640px) 208px, 176px"
              className="relative rounded-[1.6rem] bg-white"
            />
          </div>
          <div>
            <h2 id="founder-title" className="eyebrow text-wood-700">
              A note from the founder
            </h2>
            <blockquote className="mt-4 font-heading text-2xl leading-snug font-semibold text-ink sm:text-[1.75rem]">
              <Placeholder>[FOUNDER QUOTE: two or three sentences in Justice&apos;s own words]</Placeholder>
            </blockquote>
            <p className="mt-6 text-sm">
              <span className="font-semibold text-ink">{founder.name}</span>
              <span className="text-muted">, {founder.role}</span>
            </p>
            <Link
              href="/about"
              className="link-underline mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600"
            >
              More about Oakteck and Justice <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
