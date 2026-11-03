import { processSteps } from "@/content/home";
import { Stagger, StaggerItem } from "@/components/motion/motion";
import { cn } from "@/lib/config-utils";

/** Four-step "How it works" sequence. Horizontal on desktop, vertical on mobile. */
export function Process({ light = false }: { light?: boolean }) {
  return (
    <Stagger as="ol" gap={0.08} className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
      <span
        aria-hidden="true"
        className={cn("absolute top-6 bottom-6 left-6 w-px lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto", light ? "bg-white/20" : "bg-line")}
      />
      {processSteps.map((step, i) => (
        <StaggerItem as="li" key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
          <span
            className={cn(
              "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold",
              light ? "border-teal-300 bg-navy-900 text-white" : "border-teal-600 bg-white text-teal-700",
            )}
          >
            {i + 1}
          </span>
          <div>
            <h3 className={cn("text-lg font-bold lg:mt-5", light && "text-white")}>{step.title}</h3>
            <p className={cn("mt-1.5 leading-relaxed", light ? "text-white/75" : "text-body")}>{step.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
