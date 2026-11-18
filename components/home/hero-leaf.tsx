import { LEAF_COLORS, MARK } from "@/components/brand/logo-data";
import "./hero-leaf.css";

/**
 * The hero signature: the supplied oak-leaf mark, with its circuit veins
 * drawing in (an SVG mask of centreline strokes animated with
 * stroke-dashoffset), then the four ring nodes lighting up in blue.
 *
 * The veins in the artwork are a filled outline, not strokes, so the strokes
 * live in a mask. A final full-mask fade guarantees the end state is the
 * exact supplied artwork. Pure CSS: no JavaScript is needed to play it, and
 * prefers-reduced-motion shows the finished leaf.
 */

// Hand-traced centrelines over the mark's veins (mark coordinate space).
const VEIN_STROKES = [
  "M1600,750 C1612,690 1630,610 1652,540 C1662,500 1658,440 1648,390 L1642,330",
  "M1598,748 L1592,640 C1590,600 1590,580 1586,568 C1570,540 1552,520 1532,503",
  "M1652,540 C1672,500 1700,465 1716,430 C1726,400 1722,370 1718,345 C1716,315 1750,285 1790,240",
  "M1690,480 C1730,430 1790,360 1860,290 C1900,250 1940,205 1978,170",
  "M1745,420 L1822,397 C1860,365 1890,335 1920,316",
  "M1603,748 C1640,690 1680,620 1712,545 C1730,505 1752,488 1800,472 L1890,456",
];

// Ring-hole centres, extracted from the artwork, in the order they light up.
const NODES = [
  { cx: 1642.9, cy: 308.4 },
  { cx: 1803.4, cy: 224.2 },
  { cx: 1936.0, cy: 305.5 },
  { cx: 1913.7, cy: 451.6 },
];

// The mark's viewBox is "1411 46 711 735"; leave room for the node glow.
const VIEWBOX = "1380 20 780 780";

export function HeroLeaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={`hl-leaf ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="hero-vein-mask" maskUnits="userSpaceOnUse" x="1380" y="20" width="780" height="780">
          <rect x="1380" y="20" width="780" height="780" fill="#fff" className="hl-maskFinal" />
          {VEIN_STROKES.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={56}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hl-veinStroke"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={46}
              fill="#fff"
              className="hl-ringReveal"
              style={{ "--i": i, transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}
            />
          ))}
        </mask>
        <radialGradient id="hero-node-glow">
          <stop offset="0" stopColor="#4fa8e8" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#1380cc" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1380cc" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="hl-body">
        <path d={MARK.silhouette} fill={LEAF_COLORS.wood} />
        <image href="/brand/oakteck-grain-mark.svg" x="1411" y="46" width="711" height="735" preserveAspectRatio="none" />
        <path d={MARK.blue} fill={LEAF_COLORS.blue} fillRule="evenodd" />
      </g>

      <path d={MARK.veins} fill={LEAF_COLORS.veins} fillRule="evenodd" mask="url(#hero-vein-mask)" />

      {NODES.map((n, i) => (
        <g key={i} className="hl-node" style={{ "--i": i, transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}>
          <circle cx={n.cx} cy={n.cy} r={70} fill="url(#hero-node-glow)" className="hl-glow" />
          <circle cx={n.cx} cy={n.cy} r={15} fill="#4fa8e8" />
          <circle cx={n.cx} cy={n.cy} r={7} fill="#e8f4fd" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Thin roots that grow down from the leaf's stem into the page. They stretch
 * to the bottom of the hero and hand over to the wood line used by the
 * How-we-work timeline further down.
 */
export function HeroRoots({ className }: { className?: string }) {
  const roots = [
    "M50,0 C50,30 46,55 40,100",
    "M50,0 C52,25 60,50 72,100",
    "M50,0 C48,20 30,45 14,100",
    "M50,0 C51,35 55,70 56,100",
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`hl-roots ${className ?? ""}`} aria-hidden="true" focusable="false">
      {roots.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={i === 3 ? "#1380cc" : "#c4966c"}
          strokeOpacity={i === 3 ? 0.55 : 0.45}
          strokeWidth={i === 0 ? 1.6 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
