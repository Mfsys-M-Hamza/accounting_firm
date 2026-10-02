"use client";

/**
 * Animation primitives. LazyMotion + `m` keeps the motion bundle small, and
 * MotionConfig reducedMotion="user" disables transform animations for people
 * who prefer reduced motion (content still fades in, nothing moves).
 */
import { LazyMotion, MotionConfig, domAnimation, m, useInView, useReducedMotion, useScroll, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// The huge top margin also counts content that is already above the viewport as "in view",
// so a section skipped by a fast scroll or an anchor jump is revealed instead of staying hidden.
const REVEAL_MARGIN_80 = "100000px 0px -80px 0px";
const REVEAL_MARGIN_60 = "100000px 0px -60px 0px";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

type Direction = "up" | "down" | "left" | "right" | "none" | "scale";

const offsets: Record<Direction, Record<string, number>> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
  scale: { scale: 0.94 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: REVEAL_MARGIN_80 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Parent for staggered children. Use <StaggerItem> for each child. */
export function Stagger({ children, className, gap = 0.08, as = "div" }: { children: ReactNode; className?: string; gap?: number; as?: "div" | "ul" | "ol" }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: REVEAL_MARGIN_60 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
    >
      {children}
    </Comp>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.8, ease, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  const shown = reduce ? value : display;

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final value immediately. */}
      <span aria-hidden="true">
        {shown.toLocaleString()}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}

/** Subtle vertical parallax tied to scroll position. */
export function Parallax({ children, offset = 40, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
