import { advantages } from "@/content/home";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stagger, StaggerItem } from "@/components/motion/motion";

export function Advantages({ limit }: { limit?: number }) {
  const items = limit ? advantages.slice(0, limit) : advantages;
  return (
    <Stagger className={items.length % 3 === 0 ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"}>
      {items.map((a) => (
        <StaggerItem key={a.title}>
          <div className="h-full rounded-xl border border-line bg-white p-6">
            <IconBadge icon={a.icon} />
            <h3 className="mt-4 text-lg font-bold">{a.title}</h3>
            <p className="mt-1.5 leading-relaxed text-body">{a.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
