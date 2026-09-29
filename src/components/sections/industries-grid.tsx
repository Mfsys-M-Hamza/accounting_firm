import { industries } from "@/content/industries";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stagger, StaggerItem } from "@/components/motion/motion";

export function IndustriesGrid({ limit, detailed = false }: { limit?: number; detailed?: boolean }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <Stagger gap={0.05} className={detailed ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"}>
      {items.map((ind, i) => (
        <StaggerItem key={ind.name}>
          <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-navy-600/25 hover:shadow-lift">
            <span className="absolute -top-12 -right-12 size-32 rounded-full bg-navy-50 transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
            <div className="relative">
              <IconBadge icon={ind.icon} tone={i % 3 === 1 ? "gold" : i % 3 === 2 ? "light" : "navy"} size="sm" />
              <h3 className="mt-5 text-lg font-semibold">{ind.name}</h3>
              <p className={detailed ? "mt-2 leading-relaxed text-body" : "mt-1.5 line-clamp-3 text-sm leading-relaxed text-body"}>{ind.description}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
