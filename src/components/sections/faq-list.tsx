import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/services";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";

/**
 * Accessible FAQ accordion built on native <details>/<summary> — works
 * without JavaScript and answers stay in the HTML for search engines.
 * Pass `schema` to emit FAQPage structured data for exactly these items;
 * only do this once per page.
 */
export function FaqList({ items, schema = false }: { items: FaqItem[]; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
        {items.map((f, i) => (
          <details key={f.question} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-paper sm:px-8 [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-base font-semibold text-ink sm:text-lg">{f.question}</h3>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-navy-700 transition-all duration-300 group-open:rotate-45 group-open:border-navy-900 group-open:bg-navy-900 group-open:text-white">
                <Plus className="size-4" aria-hidden="true" />
              </span>
            </summary>
            <div className="px-6 pb-6 leading-relaxed text-body sm:px-8">
              <p className="max-w-3xl">{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
      {schema ? <JsonLd data={faqSchema(items)} /> : null}
    </>
  );
}
