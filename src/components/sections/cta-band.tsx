import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mailtoHref, telHref } from "@/lib/config-utils";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/motion";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { LazyCallbackForm } from "@/components/forms/lazy-callback-form";

/** Closing call-to-action: quote/consultation buttons, direct contact routes and the enquiry form. */
export function CtaBand({
  title = "Ready to put your finances in expert hands?",
  text = "Get a free, no-obligation quote, book a consultation, or send us a quick enquiry and we'll get back to you.",
  defaultService,
}: {
  title?: string;
  text?: string;
  defaultService?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="cv-auto bg-navy-900 py-16 sm:py-20 lg:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-teal-300">Get started</p>
          <h2 id="cta-title" className="mt-4 text-3xl leading-tight font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/80">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/quote" size="lg">
              Get a Free Quote <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/book-consultation" variant="outline-light" size="lg">
              <CalendarCheck aria-hidden="true" /> Book a Consultation
            </ButtonLink>
          </div>
          <ul className="mt-10 space-y-3 border-t border-white/15 pt-8 text-white/85">
            <li>
              <a href={telHref()} className="inline-flex items-center gap-3 hover:text-white">
                <Phone className="size-4 text-teal-300" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={mailtoHref()} className="inline-flex items-center gap-3 hover:text-white">
                <Mail className="size-4 text-teal-300" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={generalWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                <WhatsAppIcon className="size-4 text-teal-300" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mb-3 text-sm font-semibold text-teal-300">Send a quick enquiry</p>
          <LazyCallbackForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
