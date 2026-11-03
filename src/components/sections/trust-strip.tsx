import { BadgeCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trustPoints } from "@/content/home";

/**
 * Verified proof only: the points in content/home.ts plus any professional
 * memberships listed in siteConfig.certifications.
 */
export function TrustStrip() {
  const items = [
    ...siteConfig.certifications.map((c) => ({ title: c.name, text: c.reference ?? "Professional membership", icon: BadgeCheck })),
    ...trustPoints,
  ].slice(0, 4);
  return (
    <section aria-label="Why clients trust us" className="border-y border-line bg-white">
      <ul className="container-page grid grid-cols-1 gap-x-8 gap-y-5 py-7 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, text, icon: Icon }) => (
          <li key={title} className="flex items-center gap-3">
            <Icon className="size-6 shrink-0 text-teal-600" strokeWidth={1.75} aria-hidden="true" />
            <p className="text-sm leading-snug">
              <span className="block font-bold text-navy-900">{title}</span>
              <span className="text-muted">{text}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
