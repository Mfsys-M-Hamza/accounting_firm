"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/config-utils";
import { SampleBadge } from "@/components/ui/section";

/**
 * Testimonial carousel. Content comes only from siteConfig.testimonials.
 * Sample entries are visibly labelled, and testimonials are never emitted as
 * review structured data. No autoplay — visitors control the pace.
 */
export function Testimonials() {
  const items = siteConfig.testimonials;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  if (!siteConfig.features.showTestimonials || items.length === 0) return null;

  const go = (next: number) => {
    setDir(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + items.length) % items.length);
  };
  const t = items[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="relative mx-auto max-w-4xl"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white px-6 py-12 shadow-card sm:px-14 sm:py-14">
        <Quote className="absolute top-8 right-8 size-20 text-navy-50" aria-hidden="true" />
        <div aria-live="polite" className="relative min-h-[16rem] sm:min-h-[13rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <m.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              {t.placeholder ? <SampleBadge>Sample testimonial — replace with a genuine review</SampleBadge> : null}
              <div className="mt-5 flex gap-1" aria-label={`Rated ${t.rating} out of 5`} role="img">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={cn("size-5", i < t.rating ? "fill-gold-500 text-gold-500" : "text-line")} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-relaxed text-ink sm:text-2xl">&ldquo;{t.review}&rdquo;</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {t.photo ? (
                  <Image src={t.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                ) : (
                  <span className="flex size-14 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-semibold text-gold-400" aria-hidden="true">
                    {t.name.replace(/[^A-Za-z ]/g, "").trim().charAt(0) || "C"}
                  </span>
                )}
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-sm text-muted">
                    {t.position}, {t.company}
                  </span>
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial" className="flex size-12 items-center justify-center rounded-full border border-line bg-white text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="flex size-6 items-center justify-center"
              >
                <span className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-6 bg-navy-900" : "w-2 bg-navy-900/20")} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial" className="flex size-12 items-center justify-center rounded-full border border-line bg-white text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
