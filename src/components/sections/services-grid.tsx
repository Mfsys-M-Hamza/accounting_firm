import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/content/services";
import { Illustration } from "@/components/icons/illustrations";
import { Stagger, StaggerItem } from "@/components/motion/motion";

export function ServiceCard({ service, showList = true }: { service: Service; showList?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-navy-600/25 hover:shadow-lift"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-700 to-gold-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
      <div className="flex items-start justify-between">
        <div className="relative">
          <span className="absolute inset-2 rounded-full bg-gold-500/0 blur-xl transition-colors duration-500 group-hover:bg-gold-500/25" aria-hidden="true" />
          <Illustration name={service.illustration} className="relative size-20 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-3deg] group-hover:scale-105" />
        </div>
        <span className="flex size-10 items-center justify-center rounded-full border border-line text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-semibold">{service.title}</h3>
      <p className="mt-3 leading-relaxed text-body">{service.summary}</p>
      {showList ? (
        <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-body">
          {service.included.slice(0, 4).map((item) => (
            <li key={item.title} className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
              {item.title}
            </li>
          ))}
          {service.included.length > 4 ? <li className="pl-6 text-muted">+ {service.included.length - 4} more</li> : null}
        </ul>
      ) : null}
      <span className="mt-auto pt-6 text-sm font-semibold text-navy-700">
        Learn more<span className="sr-only"> about {service.title}</span>
      </span>
    </Link>
  );
}

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((s) => (
        <StaggerItem key={s.slug}>
          <ServiceCard service={s} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
