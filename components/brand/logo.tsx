import { cn } from "@/lib/utils";
import { LEAF_COLORS, LOGO, MARK } from "./logo-data";

type LogoProps = {
  /** "dark" = for navy/dark backgrounds, "light" = for white/light backgrounds, "mark" = leaf only. */
  variant?: "dark" | "light" | "mark";
  className?: string;
  /** Accessible name. Pass null when a parent (e.g. a link) already provides the name. */
  label?: string | null;
};

const OAK_FILL = { dark: "#FFFFFF", light: "#0D1B2A" } as const;

function vb(viewBox: string) {
  const [x, y, width, height] = viewBox.split(" ").map(Number);
  return { x, y, width, height };
}

/**
 * The Oakteck logo, inlined from the supplied vector artwork (see scripts/extract-logo.mjs).
 * The wood grain is a separate cached SVG layered on top, which keeps the inline markup small.
 * Minimum width: 120px for the full logo; below that, use variant="mark".
 */
export function Logo({ variant = "dark", className, label = "Oakteck" }: LogoProps) {
  const isMark = variant === "mark";
  const geo = isMark ? MARK : LOGO;
  const box = vb(geo.viewBox);
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <svg
      viewBox={geo.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(isMark ? "h-10 w-auto" : "h-9 w-auto min-w-[120px]", className)}
      focusable="false"
      {...a11y}
    >
      <path d={geo.silhouette} fill={LEAF_COLORS.wood} />
      <image
        href={isMark ? "/brand/oakteck-grain-mark.svg" : "/brand/oakteck-grain-logo.svg"}
        x={box.x}
        y={box.y}
        width={box.width}
        height={box.height}
        preserveAspectRatio="none"
      />
      <path d={geo.blue} fill={LEAF_COLORS.blue} fillRule="evenodd" />
      <path d={geo.veins} fill={LEAF_COLORS.veins} fillRule="evenodd" />
      {!isMark &&
        LOGO.letters.map((letter, i) => (
          <path
            key={i}
            d={letter.d}
            fill={letter.part === "teck" ? LEAF_COLORS.blue : OAK_FILL[variant]}
          />
        ))}
    </svg>
  );
}
