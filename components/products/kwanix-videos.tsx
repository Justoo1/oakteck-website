import { Captions } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { kwanixVideos } from "@/content/kwanix-videos";

export function KwanixVideos() {
  return (
    <section aria-labelledby="videos-title" className="on-dark bg-navy-950 py-16 text-white lg:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-wood-400">See it working</p>
          <h2 id="videos-title" className="mt-3 text-3xl font-bold sm:text-4xl">
            Kwanix demo videos
          </h2>
          <p className="mt-4 text-lg text-mist">
            Short narrated walkthroughs, recorded on a demo company. Each one loads only when you press play.
          </p>
        </Reveal>
        <Stagger as="ul" className="mt-12 grid gap-8 md:grid-cols-2">
          {kwanixVideos.map((v) => (
            <StaggerItem as="li" key={v.slug}>
              <figure>
                <div className="overflow-hidden rounded-xl bg-navy-900 ring-1 ring-white/10">
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={v.poster}
                    width={1440}
                    height={900}
                    className="block aspect-[1440/900] h-auto w-full"
                    aria-label={`Kwanix demo: ${v.title}`}
                  >
                    <source src={v.src} type="video/mp4" />
                    {v.captions && <track kind="captions" src={v.captions} srcLang="en" label="English" default />}
                  </video>
                </div>
                <figcaption className="mt-4">
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-heading text-lg font-semibold">{v.title}</span>
                    <span className="flex items-center gap-2 font-mono text-sm text-mist">
                      {v.captions && <Captions className="size-4" aria-label="Captions available" />}
                      {v.duration}
                    </span>
                  </span>
                  <span className="mt-1 block text-mist">{v.summary}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
