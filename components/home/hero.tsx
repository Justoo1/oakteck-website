import Link from "@/components/app-link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { HeroLeaf, HeroRoots } from "./hero-leaf";
import { HeroParallax } from "./hero-parallax";

export function Hero() {
  // The leaf's wood grain is a large image in the first view: fetch it early.
  preload("/brand/oakteck-grain-mark.svg", { as: "image", fetchPriority: "high" });
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Soft brand-blue light behind the leaf; no gradients beyond navy and blue. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-20%] -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(19_128_204/0.30),transparent)] lg:right-[-6%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />

      <div className="container-page grid items-center gap-6 pt-12 pb-0 sm:pt-16 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow text-wood-400">Software company · Accra, Ghana</p>
          <h1 id="hero-title" className="mt-5 text-[2.75rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
            Strong roots.
            <br />
            <span className="text-blue-400">Smart systems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">{siteConfig.supportingLine}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a project
                <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <Link href="/products/kwanix">See Kwanix</Link>
            </Button>
          </div>
          <p className="mt-10 max-w-md border-l-2 border-wood-400/60 pl-4 text-sm leading-relaxed text-mist">
            Makers of Kwanix, FlexiFund and WASSCE Analytics, live with Ghanaian businesses and schools today.
          </p>
        </div>

        <HeroParallax className="relative mx-auto w-full max-w-[14rem] sm:max-w-sm lg:max-w-none">
          <div className="relative aspect-square transition-transform duration-500 ease-out [transform:translate3d(calc(var(--px)*-18px),calc(var(--py)*-12px),0)]">
            <HeroLeaf className="absolute inset-0" />
            {/* Roots start at the leaf's stem (28% across, 94% down the leaf box) and run to the hero's bottom edge. */}
            <HeroRoots className="absolute top-[94%] left-[8%] h-[60vh] w-[40%]" />
          </div>
        </HeroParallax>
      </div>
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </section>
  );
}
