"use client";

import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "header";
  delay?: number;
};

/** Fades content up 20px once, when it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0 }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      data-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggers its <StaggerItem> children by 70ms as the group enters the viewport. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = m[as];
  return (
    <Comp data-reveal className={cn(className)} variants={item}>
      {children}
    </Comp>
  );
}
