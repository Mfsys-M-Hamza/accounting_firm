import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Navy header band for inner pages: breadcrumbs, H1, intro and optional actions. */
export function PageHero({
  title,
  intro,
  eyebrow,
  crumbs,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  eyebrow?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy-900 py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light className="mb-6" />
          {eyebrow ? <p className="eyebrow mb-4 text-teal-300">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.12] font-bold text-white sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
