import { SectionHeading } from "@/components/section-heading";
import { ProcessTimeline } from "./process-timeline";

export function HowWeWork() {
  return (
    <section aria-labelledby="process-title" className="relative bg-paper py-20 lg:py-28">
      {/* The hero's roots return here as the line that joins the steps. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 80"
        className="absolute top-0 left-1/2 h-16 w-8 -translate-x-1/2 text-wood-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 0 C20 30 18 50 20 80" strokeOpacity="0.7" />
        <path d="M20 10 C24 30 30 45 34 70" strokeOpacity="0.35" />
        <path d="M20 14 C16 32 10 46 6 72" strokeOpacity="0.35" />
      </svg>
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="Built on strong roots, one step at a time."
          intro="A clear process, so you always know what is happening and what comes next."
          align="center"
        />
        <ProcessTimeline />
      </div>
    </section>
  );
}
