import { siteConfig } from "@/config/site";
import { cn } from "@/lib/config-utils";

/**
 * Firm statistics. Values come only from siteConfig.statistics and are
 * rendered as plain text (no count-up), so screenshots, crawlers and no-JS
 * visitors always see the real figure. Until a number is supplied the
 * placeholder text (e.g. "[XX]") is shown instead of an invented figure.
 */
export function Stats({ light = false, className }: { light?: boolean; className?: string }) {
  if (!siteConfig.features.showStatistics) return null;
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border",
        siteConfig.statistics.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4",
        light ? "border-white/10 bg-white/10" : "border-line bg-line",
        className,
      )}
    >
      {siteConfig.statistics.map((s) => (
        <li key={s.label} className={cn("px-6 py-7 text-center", light ? "bg-navy-900" : "bg-white")}>
          <p className={cn("font-display text-4xl font-bold tabular-nums", light ? "text-white" : "text-navy-900")}>
            {s.value !== null ? s.value.toLocaleString("en-GB") : s.placeholder}
            {s.suffix}
          </p>
          <p className={cn("mt-1.5 text-sm font-semibold", light ? "text-teal-300" : "text-teal-700")}>{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
