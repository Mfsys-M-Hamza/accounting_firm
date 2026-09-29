import { advantages } from "@/content/home";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stagger, StaggerItem } from "@/components/motion/motion";

export function Advantages({ limit }: { limit?: number }) {
  const items = limit ? advantages.slice(0, limit) : advantages;
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((a, i) => (
        <StaggerItem key={a.title}>
          <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
            <IconBadge icon={a.icon} tone={i % 4 === 1 ? "gold" : "navy"} />
            <h3 className="mt-6 text-xl font-semibold">{a.title}</h3>
            <p className="mt-2.5 leading-relaxed text-body">{a.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
