"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * Counts up to `value` when it scrolls into view. The server renders the
 * final number (for SEO, no-JS and reduced motion); the client resets it to
 * zero only while it is still off-screen, so there is never a visible jump.
 */
export function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const armed = useRef(false);
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) {
      el.textContent = format(0);
      armed.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !armed.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}
