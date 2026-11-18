"use client";

import { useRef } from "react";
import { m, useScroll } from "motion/react";
import { Compass, Hammer, LifeBuoy, PenLine } from "lucide-react";

const steps = [
  {
    title: "Discover",
    icon: Compass,
    body: "We learn how your business actually runs, sit with the people who will use the system, and agree what success looks like.",
  },
  {
    title: "Design",
    icon: PenLine,
    body: "Screens, data and integrations are planned and shown to you before we build, so there are no surprises.",
  },
  {
    title: "Build",
    icon: Hammer,
    body: "Working software in short cycles that you can try as we go, connected to the payments, SMS and systems you use.",
  },
  {
    title: "Support",
    icon: LifeBuoy,
    body: "We launch, train your team, monitor uptime and keep improving the system as your business grows.",
  },
];

/**
 * How we work: four steps joined by a wood "root" line that grows as you
 * scroll. Horizontal on desktop, vertical on mobile.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
      {/* Track + growing line, desktop */}
      <div aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-line lg:block">
        <m.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-wood-400 motion-reduce:transform-none!" />
      </div>
      {/* Track + growing line, mobile */}
      <div aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-line lg:hidden">
        <m.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-wood-400 motion-reduce:transform-none!" />
      </div>

      {steps.map((s, i) => (
        <li
          key={s.title}
          data-reveal
          data-reveal-delay={i * 0.08}
          className="relative grid grid-cols-[3rem_1fr] gap-5 lg:grid-cols-1 lg:justify-items-center lg:text-center"
        >
          <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-navy-950 text-blue-400 ring-8 ring-paper">
            <s.icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.18em] text-wood-700 uppercase">
              Step {i + 1}
            </p>
            <h3 className="mt-1 text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
