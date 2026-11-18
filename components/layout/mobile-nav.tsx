"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

/** Menu button for small screens; the sheet itself loads on first use. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="outline-dark"
        size="icon"
        className="lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        // Start fetching the menu as soon as someone reaches for it.
        onPointerEnter={() => setLoaded(true)}
        onFocus={() => setLoaded(true)}
      >
        <Menu className="size-5" />
      </Button>
      {loaded && <MobileMenu open={open} onOpenChange={setOpen} returnFocusTo={buttonRef} />}
    </>
  );
}
