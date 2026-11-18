import { cn } from "@/lib/utils";

type LogoProps = {
  /** "dark" = for navy/dark backgrounds, "light" = for white/light backgrounds, "mark" = leaf only. */
  variant?: "dark" | "light" | "mark";
  className?: string;
  /** Accessible name. Pass null when a parent (e.g. a link) already provides the name. */
  label?: string | null;
};

// Viewboxes of the supplied artwork (docs/brand/logo); see scripts/extract-logo.mjs.
const LOGO_BOX = { x: 520, y: 40, width: 2930, height: 1070 };
const MARK_BOX = { x: 1411, y: 46, width: 711, height: 735 };
const SPRITE = "/brand/oakteck-logo-sprite.svg";

/**
 * The Oakteck logo as an inline <svg>, drawn from the supplied vector artwork.
 * Its geometry lives in a cached sprite (scripts/extract-logo.mjs) and the
 * wood grain in a cached overlay, so every page stays light while the logo
 * stays crisp at any size. Minimum width: 120px for the full logo; below
 * that, use variant="mark".
 */
export function Logo({ variant = "dark", className, label = "Oakteck" }: LogoProps) {
  const isMark = variant === "mark";
  const box = isMark ? MARK_BOX : LOGO_BOX;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  const place = { x: box.x, y: box.y, width: box.width, height: box.height };

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(isMark ? "h-10 w-auto" : "h-9 w-auto min-w-[120px]", className)}
      focusable="false"
      {...a11y}
    >
      <use href={`${SPRITE}#${isMark ? "mark-base" : "logo-base"}`} {...place} />
      <image
        href={isMark ? "/brand/oakteck-grain-mark.svg" : "/brand/oakteck-grain-logo.svg"}
        {...place}
        preserveAspectRatio="none"
      />
      <use href={`${SPRITE}#${isMark ? "mark-top" : variant === "light" ? "logo-top-light" : "logo-top-dark"}`} {...place} />
    </svg>
  );
}
