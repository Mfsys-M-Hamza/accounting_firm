import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

/** Shared layout for Privacy Policy / Terms: hero, template notice, article body. */
export function LegalPage({ title, intro, path, lastUpdated, children }: { title: string; intro: string; path: string; lastUpdated: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} intro={intro} crumbs={[{ name: title, href: path }]} />
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <div role="note" className="mb-10 flex gap-3 rounded-2xl border border-dashed border-gold-500/60 bg-gold-100/40 p-5 text-sm leading-relaxed text-ink">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
          <p>
            <strong>Template notice:</strong> this document is a starting template. Replace all bracketed placeholders and have it reviewed by a qualified legal professional
            for your jurisdiction before publishing.
          </p>
        </div>
        <p className="text-sm text-muted">Last updated: {lastUpdated}</p>
        <div className="prose-article mt-6 text-body">{children}</div>
      </div>
    </>
  );
}
