"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { siteConfig, whatsappLink } from "@/site.config";
import { isActive } from "./nav-links";

export function MobileNav() {
  const pathname = usePathname();
  const items = [...siteConfig.nav, { href: "/contact", label: "Contact" }];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline-dark" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="on-dark w-[86vw] max-w-sm border-l-navy-800 bg-navy-950 text-white [&>button]:text-white [&>button]:hover:bg-white/10"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
        <nav aria-label="Mobile" className="mt-16 px-6">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href as Route}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 font-heading text-lg font-semibold text-white/85 transition-colors hover:bg-white/5 hover:text-white",
                        active && "bg-white/5 text-white",
                      )}
                    >
                      {item.label}
                      {active && <span className="size-1.5 rounded-full bg-wood-400" aria-hidden="true" />}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto space-y-3 border-t border-navy-800 p-6">
          <SheetClose asChild>
            <Button asChild size="lg" className="w-full">
              <Link href="/contact">Start a project</Link>
            </Button>
          </SheetClose>
          <Button asChild size="lg" variant="whatsapp" className="w-full">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </a>
          </Button>
          <a
            href={siteConfig.contact.phone.tel}
            className="flex items-center justify-center gap-2 py-2 text-sm text-mist hover:text-white"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.contact.phone.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
