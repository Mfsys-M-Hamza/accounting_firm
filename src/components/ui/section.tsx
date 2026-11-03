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
    <section id={id} aria-labelledby={labelledBy} className={cn("cv-auto relative py-16 sm:py-20 lg:py-24", tones[tone], className)}>
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
    <Reveal className={cn("max-w-3xl", !/(^|\s)mb-/.test(className ?? "") && "mb-10 sm:mb-12", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-4", light && "text-teal-300", align === "center" && "justify-center")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("text-3xl leading-[1.18] font-bold sm:text-4xl lg:text-[2.5rem]", light && "text-white")}>
        {title}
      </h2>
      {text ? <p className={cn("mt-4 text-lg leading-relaxed", light ? "text-white/75" : "text-body")}>{text}</p> : null}
    </Reveal>
  );
}

/** Small visible label for template sample content (testimonials, team). */
export function SampleBadge({ children = "Sample content — replace before launch" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-teal-600/50 bg-teal-50 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-teal-700 uppercase">
      {children}
    </span>
  );
}
