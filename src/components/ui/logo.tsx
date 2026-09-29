import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/config-utils";

/** Monogram mark used until a real logo is configured in siteConfig.logo. Gradient comes from <IllustrationDefs />. */
function Mark() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="34" height="34" rx="9" fill="#061328" />
      <rect x="2" y="2" width="34" height="34" rx="9" fill="url(#i3-navy)" />
      <path d="M11 27 L11 21 M17 27 L17 16 M23 27 L23 19 M29 27 L29 11" stroke="#d6b566" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const { logo, companyName, tagline } = siteConfig;
  return (
    <Link href="/" className={cn("flex min-w-0 items-center gap-3", className)} aria-label={`${companyName} — home`}>
      {logo ? (
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-10 w-auto" />
      ) : (
        <>
          <Mark />
          <span className="flex min-w-0 flex-col leading-none">
            <span className={cn("truncate font-display text-lg font-semibold tracking-tight", light ? "text-white" : "text-navy-900")}>{companyName}</span>
            <span className={cn("mt-1 truncate text-[0.6875rem] font-semibold tracking-[0.14em] uppercase", light ? "text-gold-400" : "text-gold-600")}>
              {tagline}
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
