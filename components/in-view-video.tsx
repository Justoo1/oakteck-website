"use client";

import { useEffect, useRef, useState } from "react";

type InViewVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
  width: number;
  height: number;
};

/**
 * Muted, looping demo clip. Nothing (not even the poster) is downloaded until it nears the viewport;
 * it plays while visible and pauses when it leaves (or the tab is hidden).
 * With reduced motion it never autoplays and shows controls instead.
 */
export function InViewVideo({ src, poster, label, className, width, height }: InViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (!prefersReduced) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    // Fetch the poster only when the clip is getting close, not on page load.
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    nearIo.observe(video);
    const onVisibility = () => document.hidden && video.pause();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      nearIo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      width={width}
      height={height}
      poster={near ? poster : undefined}
      src={active ? src : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
    />
  );
}
