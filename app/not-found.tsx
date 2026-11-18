import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[70vh] items-center bg-navy-950 py-20 text-white">
      <div className="container-page flex flex-col items-center text-center">
        <Logo variant="mark" label={null} className="h-20 opacity-90" />
        <p className="eyebrow mt-8 text-wood-400">404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">This page took a wrong turn.</h1>
        <p className="mt-4 max-w-md text-lg text-mist">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline-dark">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
