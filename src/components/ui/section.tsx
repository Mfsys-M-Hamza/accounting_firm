import type { ReactNode } from "react";
import { cn } from "@/lib/config-utils";
import { Reveal } from "@/components/motion/motion";

type Tone = "white" | "paper" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  paper: "bg-paper",
  navy: "bg-navy-900 text-white/75 [&_h2]:text-white [&_h3]:text-white",
};

export function Section({ children, tone = "white", className, id, labelledBy }: { children: ReactNode; tone?: Tone; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-24 lg:py-28", tones[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl sm:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-4", light && "text-gold-400", align === "center" && "justify-center")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("text-3xl leading-[1.15] font-semibold sm:text-4xl lg:text-[2.75rem]", light && "text-white")}>
        {title}
      </h2>
      {text ? <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/70" : "text-body")}>{text}</p> : null}
    </Reveal>
  );
}

/** Small visible label for template sample content (testimonials, team). */
export function SampleBadge({ children = "Sample content — replace before launch" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold-500/60 bg-gold-100/60 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-gold-600 uppercase">
      {children}
    </span>
  );
}
