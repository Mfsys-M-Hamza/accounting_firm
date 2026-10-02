import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/config-utils";

type Tone = "navy" | "gold" | "light";

const tones: Record<Tone, string> = {
  navy: "bg-[linear-gradient(145deg,#35659f_0%,#12305a_55%,#0b1f3a_100%)] text-white shadow-[0_5px_0_#0c0b36,0_14px_24px_-8px_rgb(28_27_107/0.55)]",
  gold: "bg-[linear-gradient(145deg,#f1d48c_0%,#cfa64c_55%,#a8822f_100%)] text-navy-950 shadow-[0_5px_0_#0d6e5e,0_14px_24px_-8px_rgb(23_138_119/0.55)]",
  light: "bg-[linear-gradient(145deg,#ffffff_0%,#e6ecf4_100%)] text-navy-800 shadow-[0_5px_0_#c2c2e0,0_14px_24px_-8px_rgb(28_27_107/0.3)]",
};

const sizes = {
  sm: "size-11 rounded-xl [&_svg]:size-5",
  md: "size-14 rounded-2xl [&_svg]:size-6",
  lg: "size-16 rounded-2xl [&_svg]:size-7",
};

/**
 * Raised 3D tile for Lucide icons: gradient face, hard bottom "extrusion"
 * shadow and a glossy top highlight. Tilts slightly when its `group` parent
 * is hovered.
 */
export function IconBadge({ icon: Icon, tone = "navy", size = "md", className }: { icon: LucideIcon; tone?: Tone; size?: keyof typeof sizes; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center transition-transform duration-500 ease-out [transform:perspective(400px)_rotateX(0deg)] group-hover:[transform:perspective(400px)_rotateX(10deg)_translateY(-3px)]",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-x-1.5 top-1 h-1/2 rounded-[inherit] bg-gradient-to-b from-white/35 to-transparent" />
      <Icon strokeWidth={1.9} className="relative drop-shadow-[0_2px_1px_rgb(0_0_0/0.25)]" />
    </span>
  );
}
