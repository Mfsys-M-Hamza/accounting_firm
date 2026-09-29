import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/icons/illustrations";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-36 pb-24">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
      <div className="container-page max-w-3xl text-center">
        <Illustration name="audit" className="mx-auto size-32 animate-float drop-shadow-[0_20px_24px_rgb(0_0_0/0.35)]" />
        <p className="eyebrow mt-8 justify-center text-gold-400">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg text-white/70">The page may have moved or no longer exists. Try one of these instead:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="gold">
            <ArrowLeft aria-hidden="true" /> Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact us
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-white/70 underline-offset-4 hover:text-white hover:underline">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
