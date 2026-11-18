import Link from "@/components/app-link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { sectorIcons } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const Icon = sectorIcons[product.icon];
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lift motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-paper text-blue-600 ring-1 ring-line">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={product.status} />
          {product.statusNote && <span className="text-xs text-muted">{product.statusNote}</span>}
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold text-ink">
        <Link href={`/products/${product.slug}` as Route} className="after:absolute after:inset-0 after:rounded-2xl">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-wood-700">{product.category}</p>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{product.oneLine}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-blue-600">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  );
}
