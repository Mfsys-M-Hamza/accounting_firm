import { processSteps } from "@/content/home";
import { Stagger, StaggerItem } from "@/components/motion/motion";
import { cn } from "@/lib/config-utils";

/** Four-step "How we work" timeline. Horizontal on desktop, vertical on mobile. */
export function Process({ light = false }: { light?: boolean }) {
  return (
    <Stagger as="ol" gap={0.15} className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-8 bottom-8 left-8 w-px lg:top-8 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto",
          light ? "bg-gradient-to-b from-gold-500/60 to-white/10 lg:bg-gradient-to-r" : "bg-gradient-to-b from-gold-500 to-line lg:bg-gradient-to-r",
        )}
      />
      {processSteps.map((step, i) => (
        <StaggerItem as="li" key={step.title} className="group relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
          <span
            className={cn(
              "relative z-10 flex size-16 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold transition-transform duration-500 group-hover:-translate-y-1",
              "bg-[linear-gradient(145deg,#5a58d0,#1c1b6b)] text-gold-400 shadow-[0_5px_0_#0c0b36,0_16px_28px_-10px_rgb(28_27_107/0.6)]",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={cn("text-xl font-semibold lg:mt-6", light && "text-white")}>{step.title}</h3>
            <p className={cn("mt-2 leading-relaxed", light ? "text-white/70" : "text-body")}>{step.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
