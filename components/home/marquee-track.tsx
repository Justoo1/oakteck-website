"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Slow, pausable marquee. Pauses on hover and keyboard focus, and has an
 * explicit pause button (WCAG 2.2.2). With reduced motion it does not move
 * and the items wrap instead.
 */
export function MarqueeTrack({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="mt-10">
      <div
        data-paused={paused || undefined}
        className="group/marquee relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]"
      >
        <div className="flex w-max animate-[marquee_48s_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] group-data-paused/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center motion-reduce:[&>ul]:flex-wrap motion-reduce:[&>ul]:justify-center motion-reduce:[&>ul]:gap-y-6 motion-reduce:[&>ul:last-child]:hidden">
          {children}
        </div>
      </div>
      <div className="container-page mt-8 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-mist transition-colors hover:border-white/40 hover:text-white"
        >
          {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          {paused ? "Play" : "Pause"} animation
        </button>
      </div>
    </div>
  );
}
