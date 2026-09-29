import { siteConfig } from "@/config/site";
import { Counter, Stagger, StaggerItem } from "@/components/motion/motion";
import { cn } from "@/lib/config-utils";

/**
 * Firm statistics. Values come only from siteConfig.statistics; until a real
 * number is supplied the placeholder text (e.g. "[XX]+") is shown instead of
 * an invented figure.
 */
export function Stats({ light = false, className }: { light?: boolean; className?: string }) {
  if (!siteConfig.features.showStatistics) return null;
  return (
    <Stagger as="ul" className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4", light ? "bg-white/10" : "bg-line", className)}>
      {siteConfig.statistics.map((s) => (
        <StaggerItem as="li" key={s.label} className={cn("px-6 py-8 text-center", light ? "bg-navy-900" : "bg-white")}>
          <p className={cn("font-display text-4xl font-semibold sm:text-5xl", light ? "text-white" : "text-navy-900")}>
            {s.value !== null ? (
              <Counter value={s.value} suffix={s.suffix} />
            ) : (
              <span>
                {s.placeholder}
                {s.suffix}
              </span>
            )}
          </p>
          <p className={cn("mt-2 text-sm font-semibold tracking-wide uppercase", light ? "text-gold-400" : "text-gold-600")}>{s.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
