import { BrandGlyph } from "@/components/icons";
import {
  djangoIcon,
  dockerIcon,
  fastapiIcon,
  langchainIcon,
  nextjsIcon,
  odooIcon,
  postgresqlIcon,
  pythonIcon,
  reactIcon,
  redisIcon,
  typescriptIcon,
  type BrandIconData,
} from "@/components/brand/brand-icons";
import { MarqueeTrack } from "./marquee-track";

// AWS has no Simple Icons glyph (removed at Amazon's request), so it is shown as text.
const stack: { name: string; icon?: BrandIconData }[] = [
  { name: "Python", icon: pythonIcon },
  { name: "FastAPI", icon: fastapiIcon },
  { name: "Django", icon: djangoIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "React", icon: reactIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "PostgreSQL", icon: postgresqlIcon },
  { name: "Redis", icon: redisIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "AWS" },
  { name: "Odoo", icon: odooIcon },
  { name: "LangChain", icon: langchainIcon },
];

function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden={hidden || undefined}>
      {stack.map((t) => (
        <li key={t.name} className="flex items-center gap-3 text-mist">
          {t.icon ? (
            <BrandGlyph icon={t.icon} className="size-7" />
          ) : (
            <span className="font-heading text-lg font-extrabold tracking-tight" aria-hidden="true">
              aws
            </span>
          )}
          <span className="font-heading text-base font-semibold whitespace-nowrap text-white/85">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section aria-labelledby="tech-title" className="on-dark overflow-hidden bg-navy-950 py-16 text-white lg:py-20">
      <div className="container-page">
        <h2 id="tech-title" className="eyebrow text-center text-wood-400">
          Tech we use
        </h2>
      </div>
      <MarqueeTrack>
        <Items />
        <Items hidden />
      </MarqueeTrack>
    </section>
  );
}
