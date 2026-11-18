import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappLink } from "@/site.config";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/5 bg-navy-950/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0 rounded-md">
          <Logo variant="dark" label={null} className="h-11 lg:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline-dark" size="icon" className="hidden sm:inline-flex">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Oakteck on WhatsApp">
              <WhatsAppIcon className="size-5" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden h-10 sm:inline-flex">
            <Link href="/contact">Start a project</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
