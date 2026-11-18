import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  id,
  level = "h2",
}: SectionHeadingProps) {
  const H = level;
  return (
    <Reveal as="header" className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "dark" ? "text-wood-400" : "text-wood-700")}>{eyebrow}</p>
      )}
      <H
        id={id}
        className={cn(
          "mt-3 text-3xl leading-[1.1] font-bold sm:text-4xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </H>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-mist" : "text-muted")}>{intro}</p>
      )}
    </Reveal>
  );
}
