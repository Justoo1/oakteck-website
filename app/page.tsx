// Milestone 1 preview: design tokens. Replaced by the real Home page in milestone 3.
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

const swatches = [
  ["navy-950", "bg-navy-950", "Main dark background"],
  ["navy-900", "bg-navy-900", "Cards on dark"],
  ["navy-800", "bg-navy-800", "Borders on dark"],
  ["blue-400", "bg-blue-400", "Text/links on dark"],
  ["blue-500", "bg-blue-500", "Brand blue: highlights"],
  ["blue-600", "bg-blue-600", "Buttons, text on light"],
  ["wood-400", "bg-wood-400", "Warm accent"],
  ["wood-700", "bg-wood-700", "Wood text on light"],
  ["paper", "bg-paper", "Light sections"],
  ["muted", "bg-muted", "Secondary text"],
] as const;

export default function TokensPreview() {
  return (
    <main className="flex-1">
      <section className="on-dark bg-navy-950 py-20 text-white">
        <div className="container-page">
          <p className="eyebrow text-wood-400">Design tokens · milestone 1</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">{siteConfig.tagline}</h1>
          <p className="mt-4 max-w-xl text-lg text-mist">{siteConfig.supportingLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">Start a project</Button>
            <Button size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
              See Kwanix
            </Button>
          </div>
          <p className="mt-6 text-blue-400">
            <a href="#" className="link-underline">A link on navy</a>
          </p>
        </div>
      </section>
      <section className="bg-paper py-16">
        <div className="container-page">
          <h2 className="text-3xl font-bold">Montserrat heading, 700</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Inter body copy in muted. <a href="#" className="link-underline font-medium text-blue-600">A link on paper</a>.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map(([name, cls, use]) => (
              <li key={name} className="overflow-hidden rounded-xl border border-line bg-white">
                <div className={`h-20 ${cls}`} />
                <div className="p-3">
                  <p className="font-heading text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted">{use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
