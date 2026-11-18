"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";

/** Tilts its child back slightly and straightens it as it scrolls into view. CSS turns it off for reduced motion. */
export function ScrollTilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <m.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }} className="motion-reduce:transform-none!">
        {children}
      </m.div>
    </div>
  );
}
