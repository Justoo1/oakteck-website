"use client";

import { useState } from "react";
import { WorkCard } from "@/components/work-card";
import type { WorkItem, WorkTag } from "@/content/work";
import { cn } from "@/lib/utils";

export function WorkFilter({ items, tags }: { items: WorkItem[]; tags: readonly WorkTag[] }) {
  const [active, setActive] = useState<WorkTag | "All">("All");
  const shown = active === "All" ? items : items.filter((w) => w.tags.includes(active));

  return (
    <div>
      <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2">
        {(["All", ...tags] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={active === t}
            onClick={() => setActive(t)}
            className={cn(
              "rounded-full px-4 py-2 font-heading text-sm font-semibold ring-1 transition-colors",
              active === t ? "bg-navy-950 text-white ring-navy-950" : "bg-white text-ink ring-line hover:ring-blue-600",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <li key={w.slug} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
            <WorkCard item={w} />
          </li>
        ))}
      </ul>
    </div>
  );
}
