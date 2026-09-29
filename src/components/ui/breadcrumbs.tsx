import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/config-utils";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList structured data. "Home" is prepended automatically. */
export function Breadcrumbs({ items, light = false, className }: { items: Crumb[]; light?: boolean; className?: string }) {
  const trail = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", light ? "text-white/60" : "text-muted")}>
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" /> : null}
                {last ? (
                  <span aria-current="page" className={cn("font-medium", light ? "text-white" : "text-ink")}>
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className={cn("transition-colors", light ? "hover:text-gold-400" : "hover:text-navy-700")}>
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
