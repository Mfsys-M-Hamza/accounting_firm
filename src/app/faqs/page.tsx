import { MessageCircleQuestion } from "lucide-react";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/motion";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about our accounting, bookkeeping, VAT, tax, payroll and company registration services, getting a quote, booking a consultation and switching accountants.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        intro="Everything you need to know about working with us. Can't find your answer? Get in touch — we're happy to help."
        crumbs={[{ name: "FAQs", href: "/faqs" }]}
        illustration="consultation"
      />

      <Section labelledBy="faq-list-title" tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <Reveal>
            <h2 id="faq-list-title" className="sr-only">
              All questions
            </h2>
            <FaqList items={faqs} schema />
          </Reveal>
          <Reveal direction="left">
            <aside className="rounded-3xl bg-navy-900 p-8 text-white lg:sticky lg:top-28">
              <MessageCircleQuestion className="size-10 text-gold-400" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold text-white">Still have questions?</h2>
              <p className="mt-3 text-white/70">Speak to a member of our team for a clear, no-obligation answer.</p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/contact" variant="gold">
                  Contact us
                </ButtonLink>
                <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" external>
                  <WhatsAppIcon /> WhatsApp
                </ButtonLink>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
