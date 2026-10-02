import { Clock3, LockKeyhole, MessageSquareText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { Reveal } from "@/components/motion/motion";
import { Illustration } from "@/components/icons/illustrations";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

export const metadata = buildMetadata({
  title: "Get Your Instant Quote",
  description:
    "Request a tailored quotation for accounting, bookkeeping, VAT, tax returns, payroll, company registration or business consulting. Send your details straight to us on WhatsApp.",
  path: "/quote",
});

const points = [
  { icon: WhatsAppIcon, title: "Send via WhatsApp", text: "Your details are formatted into a message — you review it and press send." },
  { icon: MessageSquareText, title: "Reply your way", text: "We'll get back to you by phone, email or WhatsApp — whichever you choose." },
  { icon: Clock3, title: "Quick response", text: "We aim to respond within one business day." },
  { icon: LockKeyhole, title: "No sensitive data needed", text: "We only ask for broad ranges — never bank details or tax IDs." },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant quote"
        title="Get your instant quote"
        intro={`Tell us a little about your business and the services you need. ${siteConfig.companyName} will prepare a tailored, no-obligation quotation.`}
        crumbs={[{ name: "Get a Quote", href: "/quote" }]}
        illustration="vat"
      />

      <section aria-label="Quote request form" className="bg-paper py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem]">
          <Reveal>
            <div id="quote-form" className="scroll-mt-28 rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10">
              <QuoteForm />
            </div>
          </Reveal>
          <Reveal direction="left">
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-navy-900 p-8 text-white">
                <Illustration name="consultation" className="size-20" />
                <h2 className="mt-5 text-2xl font-semibold text-white">How it works</h2>
                <ul className="mt-6 space-y-5">
                  {points.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-3">
                      <Icon className="mt-0.5 size-5 shrink-0 text-gold-400" />
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="mt-0.5 text-sm text-white/65">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 rounded-3xl border border-line bg-white p-6 text-sm text-body">
                <ShieldCheck className="size-6 shrink-0 text-success" aria-hidden="true" />
                <p>
                  Quotes are free and without obligation. Final fees are confirmed in writing once we understand the full scope of your requirements.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
