import { cn } from "@/lib/utils";

/** A minimal browser window frame for product screenshots and video. */
export function DeviceFrame({
  children,
  url,
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-navy-900 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-white/5 px-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        {url && (
          <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[0.65rem] text-mist">{url}</span>
        )}
      </div>
      {children}
    </div>
  );
}
