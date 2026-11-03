import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/config-utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

// Primary (filled teal) is the quote/enquiry action; outline is the secondary consultation action.
const variants: Record<Variant, string> = {
  primary: "bg-teal-600 text-white hover:bg-teal-700",
  dark: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-navy-900/25 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-50",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  ghost: "text-navy-900 hover:bg-navy-50",
  whatsapp: "bg-whatsapp text-white hover:bg-[#116932]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg text-center font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
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
