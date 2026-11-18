import Link from "@/components/app-link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import type { WorkItem } from "@/content/work";

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lift motion-reduce:hover:translate-y-0">
      <p className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-wood-400/15 px-2.5 py-1 font-heading font-semibold text-wood-700">{item.label}</span>
        {item.region && <span className="text-muted">{item.region}</span>}
      </p>
      <h3 className="mt-4 text-lg leading-snug font-bold text-ink">
        <Link href={`/work/${item.slug}` as Route} className="after:absolute after:inset-0 after:rounded-2xl">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{item.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology">
        {item.stack.map((t) => (
          <li key={t} className="rounded-md bg-paper px-2 py-0.5 font-mono text-[0.72rem] text-muted ring-1 ring-line">
            {t}
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600">
        Read the case study
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  );
}
