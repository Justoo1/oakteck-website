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
 * Muted, looping demo clip. Nothing is downloaded until it scrolls into view;
 * it plays while visible and pauses when it leaves (or the tab is hidden).
 * With reduced motion it never autoplays and shows controls instead.
 */
export function InViewVideo({ src, poster, label, className, width, height }: InViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
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
    const onVisibility = () => document.hidden && video.pause();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
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
      poster={poster}
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
