import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/motion";
import { Illustration } from "@/components/icons/illustrations";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { CallbackForm } from "@/components/forms/callback-form";
import { generalWhatsappUrl } from "@/lib/whatsapp";

/** Closing call-to-action with quote/consultation/WhatsApp buttons and a callback form. */
export function CtaBand({
  title = "Ready to put your finances in expert hands?",
  text = "Get a tailored quotation, book a consultation or ask us to call you back — whichever suits you best.",
  defaultService,
}: {
  title?: string;
  text?: string;
  defaultService?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-24">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_left,black_10%,transparent_65%)]" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-32 -z-10 size-[30rem] rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal direction="right">
          <Illustration name="consultation" className="mb-6 size-20 drop-shadow-[0_18px_22px_rgb(0_0_0/0.35)]" />
          <h2 id="cta-title" className="text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <p className="mb-3 text-sm font-semibold tracking-wide text-gold-400 uppercase">Request a callback</p>
          <CallbackForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
