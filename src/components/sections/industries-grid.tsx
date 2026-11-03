import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industryHref } from "@/content/industries";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stagger, StaggerItem } from "@/components/motion/motion";

/**
 * Audience cards, each linking to its landing page. The compact version is
 * used on the home page; the detailed version lists every audience on /industries.
 */
export function IndustriesGrid({ limit, detailed = false }: { limit?: number; detailed?: boolean }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <Stagger className={detailed ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
      {items.map((ind) => (
        <StaggerItem key={ind.slug}>
          {detailed ? (
            <Link
              href={industryHref(ind)}
              className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-teal-600/40 hover:shadow-lift"
            >
              <IconBadge icon={ind.icon} />
              <span className="mt-4 text-lg font-bold text-navy-900 group-hover:text-teal-700">{ind.name}</span>
              <span className="mt-2 leading-relaxed text-body">{ind.description}</span>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-700">
                Learn more <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <Link
              href={industryHref(ind)}
              className="group flex h-full items-start gap-4 rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-teal-600/40 hover:shadow-card"
            >
              <IconBadge icon={ind.icon} size="sm" />
              <span>
                <span className="flex items-center gap-1 font-bold text-navy-900 group-hover:text-teal-700">
                  {ind.name}
                  <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
                <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-body">{ind.description}</span>
              </span>
            </Link>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
