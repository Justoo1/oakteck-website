import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceFrame } from "@/components/device-frame";
import { InViewVideo } from "@/components/in-view-video";
import { ScrollTilt } from "@/components/motion/scroll-tilt";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { StatusBadge } from "@/components/status-badge";
import { getProduct } from "@/content/products";

const outcomes = [
  "Every ticket and parcel recorded, station by station, before the last bus leaves.",
  "Scan-to-load blocks a parcel from boarding a bus going to the wrong town.",
  "Receivers collect with a one-time SMS code, so parcels reach the right person.",
  "Revenue per trip and route, with pricing suggestions from demand.",
];

export function KwanixSpotlight() {
  const kwanix = getProduct("kwanix")!;
  return (
    <section aria-labelledby="kwanix-title" className="on-dark relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -z-0 size-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-wood-400">Flagship product</p>
              <StatusBadge status={kwanix.status} tone="dark" />
            </div>
            <h2 id="kwanix-title" className="mt-4 text-3xl leading-[1.1] font-bold sm:text-4xl">
              Kwanix: no more parcels on the wrong bus.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              Ticketing, parcel logistics and live fleet tracking for Ghanaian inter-city bus companies, in one
              multi-tenant platform.
            </p>
          </Reveal>
          <Stagger as="ul" className="mt-8 space-y-4">
            {outcomes.map((o) => (
              <StaggerItem as="li" key={o} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-white/90">{o}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={kwanix.cta.href as Route}>Request a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <Link href="/products/kwanix">Explore Kwanix</Link>
            </Button>
            <a
              href="https://kwanix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1 self-center px-2 text-sm text-mist hover:text-white"
            >
              kwanix.com <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ScrollTilt>
          <DeviceFrame url="kwanix.com">
            <InViewVideo
              src="/video/kwanix-wrong-bus.mp4"
              poster="/video/kwanix-wrong-bus-poster.webp"
              label="Kwanix demo: a loader scans a parcel onto the Kumasi bus and the scanner blocks it with a WRONG BUS warning, because the parcel is going to Tamale."
              width={1152}
              height={720}
              className="block aspect-[1152/720] w-full bg-navy-900 object-cover"
            />
          </DeviceFrame>
          <p className="mt-4 text-center text-sm text-mist">
            Scan-to-load in action: the parcel is for Tamale, the bus is going to Kumasi.
          </p>
        </ScrollTilt>
      </div>
    </section>
  );
}
