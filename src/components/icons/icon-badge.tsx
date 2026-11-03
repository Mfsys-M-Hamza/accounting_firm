import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/config-utils";

const sizes = {
  sm: "size-10 rounded-lg [&_svg]:size-5",
  md: "size-12 rounded-lg [&_svg]:size-6",
  lg: "size-14 rounded-xl [&_svg]:size-7",
};

/** Flat icon tile used for every Lucide icon on the site, so icon treatment stays consistent. */
export function IconBadge({ icon: Icon, size = "md", light = false, className }: { icon: LucideIcon; size?: keyof typeof sizes; light?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center", light ? "bg-white/10 text-teal-300" : "bg-teal-50 text-teal-700", sizes[size], className)}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
