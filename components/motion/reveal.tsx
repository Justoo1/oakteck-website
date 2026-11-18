import { cn } from "@/lib/utils";

/*
 * Scroll reveals: content fades up 20px once, as it enters the viewport.
 * These are server components that only add data attributes; one shared
 * IntersectionObserver (<RevealObserver>) plays the animation. Without JS,
 * content is fully visible: the hidden state only applies under `html.js`
 * (set inline in the root layout).
 */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "header";
  /** Extra delay in seconds. */
  delay?: number;
};

export function Reveal({ children, className, as: Comp = "div", delay = 0 }: RevealProps) {
  return (
    <Comp data-reveal data-reveal-delay={delay || undefined} className={className}>
      {children}
    </Comp>
  );
}

/** Children rendered as <StaggerItem> reveal 70ms apart (see globals.css). */
export function Stagger({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return (
    <Comp data-stagger className={className}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Comp data-reveal className={cn(className)}>
      {children}
    </Comp>
  );
}
