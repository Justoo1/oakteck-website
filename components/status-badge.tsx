import { cn } from "@/lib/utils";
import { statusLabel, type ProductStatus } from "@/content/products";

export function StatusBadge({
  status,
  tone = "light",
  className,
}: {
  status: ProductStatus;
  tone?: "light" | "dark";
  className?: string;
}) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-heading text-[0.7rem] font-semibold tracking-wide uppercase",
        tone === "light"
          ? live
            ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
            : "bg-amber-50 text-amber-900 ring-1 ring-amber-200"
          : live
            ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30"
            : "bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/30",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", live ? "bg-emerald-500" : "bg-amber-500")}
      />
      {statusLabel[status]}
    </span>
  );
}
