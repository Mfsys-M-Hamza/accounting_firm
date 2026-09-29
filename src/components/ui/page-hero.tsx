import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Illustration, type IllustrationName } from "@/components/icons/illustrations";

/** Dark header band for inner pages: breadcrumbs, H1, intro and optional 3D illustration. */
export function PageHero({
  title,
  intro,
  eyebrow,
  crumbs,
  illustration,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  eyebrow?: string;
  crumbs: Crumb[];
  illustration?: IllustrationName;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-navy-600/40 blur-3xl" />
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <Breadcrumbs items={crumbs} light className="mb-6" />
          {eyebrow ? <p className="eyebrow mb-4 text-gold-400">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.1] font-semibold text-white sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {illustration ? (
          <div className="hidden lg:block">
            <div className="relative size-60 animate-float-slow">
              <div className="absolute inset-6 rounded-full bg-gold-500/15 blur-2xl" />
              <Illustration name={illustration} className="relative size-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.35)]" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
