import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { showTestimonials, testimonials } from "@/content/testimonials";

/**
 * Renders nothing in production while any testimonial is a sample.
 * In development and preview builds, each sample card carries a "Sample" badge.
 */
export function Testimonials() {
  if (!showTestimonials) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="What clients say" title="In their words." />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem as="li" key={t.quote}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                {t.sample && (
                  <span className="absolute top-4 right-4 rounded-full border border-dashed border-wood-400 bg-wood-400/10 px-2 py-0.5 font-mono text-[0.65rem] font-semibold tracking-wide text-wood-700 uppercase">
                    Sample
                  </span>
                )}
                <Quote className="size-6 text-wood-400" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-semibold text-ink">{t.attribution}</span>
                  <span className="block text-muted">{t.product}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
