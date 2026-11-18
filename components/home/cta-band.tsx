import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/site.config";

export function CtaBand({
  title = "Let's build something that lasts.",
  body = "Tell us what slows your business down, and we'll suggest the simplest system that fixes it.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Reveal className="on-dark relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center text-white sm:px-12 lg:py-20">
          <div aria-hidden="true" className="absolute -top-24 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div aria-hidden="true" className="mx-auto mb-8 h-px w-24 bg-wood-400" />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl leading-tight font-bold sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
