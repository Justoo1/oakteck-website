"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {siteConfig.nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href as Route}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 font-heading text-sm font-medium text-white/80 transition-colors hover:text-white",
                "after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-wood-400 after:transition-transform after:duration-300 hover:after:scale-x-100",
                active && "text-white after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
