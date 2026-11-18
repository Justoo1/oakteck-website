import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { href: string; label: string };

/** Navy page header for inner pages: breadcrumb, eyebrow, H1 and intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
  aside,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("on-dark relative isolate overflow-hidden bg-navy-950 text-white", className)}>
      <div aria-hidden="true" className="absolute -top-40 right-[-10%] -z-10 size-[36rem] rounded-full bg-blue-500/12 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_65%)]"
      />
      <div className={cn("container-page py-14 sm:py-20", aside && "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]")}>
        <div className="max-w-3xl">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-mist">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.href} className="flex items-center gap-1">
                    <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
                    <Link href={c.href as Route} className="hover:text-white">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <div className="eyebrow text-wood-400">{eyebrow}</div>}
          <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">{intro}</p>}
          {children}
        </div>
        {aside}
      </div>
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-wood-400/40 to-transparent" />
    </section>
  );
}
