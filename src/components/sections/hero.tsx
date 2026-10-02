import Image from "next/image";
import { ArrowRight, CalendarCheck, CheckCircle2, TrendingUp } from "lucide-react";
import { hero, trustIndicators } from "@/content/home";
import { images } from "@/content/images";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/button";
import { Parallax } from "@/components/motion/motion";
import { Illustration } from "@/components/icons/illustrations";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

/**
 * Home hero. Text animates with CSS (not JS) so the LCP heading paints
 * immediately; the visual uses light scroll parallax on the floating cards.
 */
export function Hero() {
  const photo = images.heroAdvisoryMeeting;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 pt-28 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_20%,black_15%,transparent_70%)]" aria-hidden="true" />
      <div className="absolute top-0 right-0 -z-10 size-[42rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-navy-600/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -z-10 size-[28rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow animate-[fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both] text-gold-400">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.5rem] leading-[1.06] font-semibold text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl animate-[fade-up_0.8s_0.1s_cubic-bezier(0.22,1,0.36,1)_both] text-lg leading-relaxed text-white/75 sm:text-xl">{hero.text}</p>

          <div className="mt-9 flex animate-[fade-up_0.8s_0.2s_cubic-bezier(0.22,1,0.36,1)_both] flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/quote" variant="gold" size="lg">
              Get a Free Quote <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/book-consultation" variant="outline-light" size="lg">
              <CalendarCheck aria-hidden="true" /> Book a Consultation
            </ButtonLink>
            <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" size="lg" external>
              <WhatsAppIcon /> WhatsApp Us
            </ButtonLink>
          </div>

          <ul className="mt-12 grid animate-[fade-up_0.8s_0.3s_cubic-bezier(0.22,1,0.36,1)_both] grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-8 sm:grid-cols-4">
            {trustIndicators.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/80">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-400 ring-1 ring-white/10">
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-xl animate-[fade-up_1s_0.15s_cubic-bezier(0.22,1,0.36,1)_both] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10 sm:aspect-[5/5.2]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 36rem, 100vw"
              className="object-cover object-[60%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
          </div>

          {/* Floating 3D cards */}
          <Parallax offset={24} className="absolute -top-6 -left-4 sm:-left-10">
            <div aria-hidden="true" className="animate-float rounded-2xl bg-white/95 p-3 shadow-lift backdrop-blur sm:p-4">
              <Illustration name="vat" className="size-16 sm:size-20" />
            </div>
          </Parallax>

          <Parallax offset={36} className="absolute top-[38%] -right-3 sm:-right-8">
            <div aria-hidden="true" className="animate-float-slow rounded-2xl bg-white/95 p-3 shadow-lift backdrop-blur sm:p-4">
              <Illustration name="tax" className="size-16 sm:size-20" />
            </div>
          </Parallax>

          <Parallax offset={18} className="absolute -bottom-8 left-4 right-4 sm:right-auto sm:-left-8 sm:w-72">
            <div aria-hidden="true" className="rounded-2xl bg-white p-5 shadow-lift">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Compliance checklist</p>
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-success">
                  <TrendingUp className="size-3" aria-hidden="true" /> On track
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm font-medium text-ink">
                {["Books reconciled", "Tax return prepared", "VAT return filed"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-navy-50">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-navy-700 to-gold-500" />
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
