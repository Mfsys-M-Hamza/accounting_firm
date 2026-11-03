import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content/services";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stagger, StaggerItem } from "@/components/motion/motion";

/** Service card: icon, title, one-line benefit, up to `tasks` included items and a "Learn more" link. */
export function ServiceCard({ service, tasks = 3 }: { service: Service; tasks?: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-teal-600/40 hover:shadow-lift">
      <IconBadge icon={service.icon} />
      <h3 className="mt-5 text-lg leading-snug font-bold">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 group-hover:text-teal-700">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{service.summary}</p>
      {tasks > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-body">
          {service.included.slice(0, tasks).map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-teal-600" aria-hidden="true" />
              {item.title}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-700" aria-hidden="true">
        Learn more <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <StaggerItem key={s.slug}>
          <ServiceCard service={s} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
