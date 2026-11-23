import { cn } from "@/lib/utils";

/**
 * A visible marker for facts the owner still has to supply. Every use is
 * listed in OWNER-TODO.md. Renders as e.g. "[DATE]".
 */
export function Placeholder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <mark
      data-placeholder
      className={cn(
        "rounded border border-dashed border-wood-400 bg-wood-400/10 px-1.5 py-0.5 font-mono text-[0.85em] text-inherit",
        className,
      )}
    >
      {children}
    </mark>
  );
}
