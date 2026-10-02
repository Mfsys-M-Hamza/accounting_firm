import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/config-utils";

/** UK Accountax "X" brand mark (traced from the client's logo), used with the typographic wordmark while siteConfig.logo is null. */
export function Mark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="-45 -39 1180 1180" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="-45" y="-39" width="1180" height="1180" rx="140" fill="#29288e" />
      <g strokeWidth="18" strokeLinejoin="round">
        <path fill="#ffffff" stroke="#ffffff" d="M255 330H430L634 556L438 772H268L458 556Z" />
        <path fill="#25bba2" stroke="#25bba2" d="M655 330H835L645 518L561 444ZM645 594L835 772H655L561 678Z" />
      </g>
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
            <span className={cn("truncate font-display text-lg font-semibold tracking-tight", light ? "text-white" : "text-navy-800")}>{companyName}</span>
            <span className={cn("mt-1 truncate text-[0.6875rem] font-semibold tracking-[0.14em] uppercase", light ? "text-gold-400" : "text-gold-600")}>
              {tagline}
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
