"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(20px)" },
  { opacity: 1, transform: "translateY(0)" },
];
const STAGGER_MS = 70;
const MAX_STAGGER_MS = 490;

/** Children of a [data-stagger] group enter 70ms apart. */
function delayFor(el: Element) {
  const parent = el.parentElement;
  if (parent?.hasAttribute("data-stagger")) {
    const index = Array.prototype.indexOf.call(parent.children, el);
    return Math.min(index * STAGGER_MS, MAX_STAGGER_MS);
  }
  return Number.parseFloat((el as HTMLElement).dataset.revealDelay ?? "0") * 1000;
}

/**
 * One IntersectionObserver for every [data-reveal] element. Reveals play with
 * the Web Animations API, which changes no attributes or classes, so this can
 * run before a page segment finishes hydrating without hydration mismatches.
 * Elements CSS never hid (the top of each page, or reduced motion) are skipped.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (getComputedStyle(el).opacity !== "0") continue;
          el.animate(KEYFRAMES, {
            duration: 600,
            delay: delayFor(el),
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          });
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    scan();
    // Catch content that streams in or mounts after navigation.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
