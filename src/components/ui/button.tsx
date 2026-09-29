import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/config-utils";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-700 shadow-[0_10px_24px_-10px_rgb(11_31_58/0.6)]",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-[0_10px_24px_-10px_rgb(156_122_44/0.7)]",
  outline: "border border-navy-900/20 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  "outline-light": "border border-white/30 text-white hover:bg-white hover:text-navy-900",
  ghost: "text-navy-900 hover:bg-navy-50",
  whatsapp: "bg-whatsapp text-white hover:bg-[#116932] shadow-[0_10px_24px_-10px_rgb(21_128_61/0.7)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-[-0.005em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({ href, variant, size, className, children, external, ...rest }: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className">) {
  const cls = buttonClasses(variant, size, className);
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & Omit<ComponentProps<"button">, "className">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
