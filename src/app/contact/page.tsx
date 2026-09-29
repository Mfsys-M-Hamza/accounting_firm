import type { ComponentType, ReactNode } from "react";
import { CalendarCheck, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { formattedAddress, isConfigured, mailtoHref, telHref } from "@/lib/config-utils";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Illustration } from "@/components/icons/illustrations";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact ${siteConfig.companyName} for audit, accounting, tax and advisory services. Call, email, WhatsApp or send us a message online.`,
  path: "/contact",
});

function InfoCard({ icon: Icon, title, href, external, children }: { icon: ComponentType<{ className?: string }>; title: string; href?: string; external?: boolean; children: ReactNode }) {
  const body = (
    <>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#35659f,#0b1f3a)] text-gold-400 shadow-[0_4px_0_#061328]">
        <Icon className="size-5" />
      </span>
      <h2 className="mt-5 font-sans text-sm font-bold tracking-[0.14em] text-muted uppercase">{title}</h2>
      <div className="mt-2 font-semibold break-words text-ink">{children}</div>
    </>
  );
  const cls = "group block h-full rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift";
  return href ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your business"
        intro="Whether you need a quote, have a question or want to book a consultation, our team is here to help."
        crumbs={[{ name: "Contact Us", href: "/contact" }]}
        illustration="consultation"
      />

      <Section labelledBy="contact-details" tone="paper" className="py-14 sm:py-16 lg:py-16">
        <h2 id="contact-details" className="sr-only">
          Contact details
        </h2>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <StaggerItem>
            <InfoCard icon={MapPin} title="Office">
              {formattedAddress()}
            </InfoCard>
          </StaggerItem>
          <StaggerItem>
            <InfoCard icon={Phone} title="Phone" href={telHref()}>
              {contact.phone}
            </InfoCard>
          </StaggerItem>
          <StaggerItem>
            <InfoCard icon={WhatsAppIcon} title="WhatsApp" href={generalWhatsappUrl()} external>
              {contact.whatsapp}
            </InfoCard>
          </StaggerItem>
          <StaggerItem>
            <InfoCard icon={Mail} title="Email" href={mailtoHref()}>
              {contact.email}
            </InfoCard>
          </StaggerItem>
          <StaggerItem>
            <InfoCard icon={Clock3} title="Business hours">
              <ul className="space-y-0.5 text-sm font-medium">
                {contact.businessHours.map((h) => (
                  <li key={h.days}>
                    {h.days}: <span className="text-body">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section labelledBy="form-title">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="form-title" align="left" eyebrow="Send a message" title="How can we help?" text="Complete the form and we'll get back to you, usually within one business day." className="mb-8" />
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
          <div className="space-y-6">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-[2rem] border border-line">
                {isConfigured(contact.mapEmbedUrl) ? (
                  <iframe
                    src={contact.mapEmbedUrl}
                    title={`Map showing the location of ${siteConfig.companyName}`}
                    className="aspect-[4/3] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="bg-grid-light flex aspect-[4/3] flex-col items-center justify-center bg-paper p-8 text-center">
                    <MapPin className="size-10 text-navy-700" aria-hidden="true" />
                    <p className="mt-4 font-display text-xl font-semibold text-ink">Map placeholder</p>
                    <p className="mt-2 max-w-xs text-sm text-muted">Add a Google Maps embed URL to siteConfig.contact.mapEmbedUrl to show the office location here.</p>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="rounded-[2rem] bg-navy-900 p-8 text-white">
                <div className="flex items-center gap-4">
                  <Illustration name="consultation" className="size-16 shrink-0" />
                  <h2 className="text-2xl font-semibold text-white">Prefer to talk it through?</h2>
                </div>
                <p className="mt-4 text-white/70">Book a phone call, video meeting or office meeting at a time that suits you, or message us on WhatsApp.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/book-consultation" variant="gold">
                    <CalendarCheck aria-hidden="true" /> Book a Consultation
                  </ButtonLink>
                  <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" external>
                    <WhatsAppIcon /> WhatsApp Us
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
