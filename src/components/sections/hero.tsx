import Image from "next/image";
import { ArrowRight, CalendarCheck, Check, UserRoundCheck } from "lucide-react";
import { hero } from "@/content/home";
import { images } from "@/content/images";
import { ButtonLink } from "@/components/ui/button";

/**
 * Home hero: who we help, what we do and the next step, within the first
 * screen. Rendered without entrance animation so the LCP heading and image
 * paint immediately.
 */
export function Hero() {
  const photo = images.heroAdviceSession;
  return (
    <section aria-labelledby="hero-title" className="bg-paper">
      <div className="container-page grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 text-[2.375rem] leading-[1.1] font-bold sm:text-5xl lg:text-[3.375rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{hero.text}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/quote" size="lg">
              Get a Free Quote <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/book-consultation" variant="outline" size="lg">
              <CalendarCheck aria-hidden="true" /> Book a Consultation
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-900">
            {hero.trustLine.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-4 text-teal-600" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-photo overflow-hidden rounded-2xl">
            <Image
              quality={85}
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-lift sm:left-6">
            <span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700" aria-hidden="true">
              <UserRoundCheck className="size-5" />
            </span>
            <p className="text-sm leading-snug">
              <span className="block font-semibold text-navy-900">Your dedicated accountant</span>
              <span className="text-muted">One point of contact, all year round</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
