import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/motion";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: "Who We Help",
  description:
    "Accounting, VAT, payroll and tax support for UK small businesses, startups, online sellers, sole traders and freelancers, contractors, construction, landlords, retail, hospitality, healthcare, professional services and technology businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we help"
        title="Accounting support shaped around your business"
        intro="Every industry has its own revenue models, cost structures, regulations and reporting expectations. We tailor our accounting, VAT and tax work to fit."
        crumbs={[{ name: "Who We Help", href: "/industries" }]}
      />

      <Section labelledBy="industries-title" tone="paper">
        <SectionHeading id="industries-title" eyebrow="Businesses we support" title="From sole traders to growing companies" />
        <IndustriesGrid detailed />
      </Section>

      <Section labelledBy="approach-title">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative aspect-photo overflow-hidden rounded-2xl">
              <Image quality={85} src={images.industriesWorkshop.src} alt={images.industriesWorkshop.alt} fill placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              id="approach-title"
              align="left"
              eyebrow="Our approach"
              title="Industry insight, applied to your numbers"
              text="We take time to learn how your sector works — from project-based revenue in construction to multi-channel sales in e-commerce and grant restrictions in the nonprofit sector — so our reporting, tax planning and advice reflect your reality."
              className="mb-8"
            />
            <Reveal>
              <ButtonLink href="/book-consultation">
                Discuss your industry <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="services-title" tone="paper">
        <SectionHeading id="services-title" eyebrow="Services" title="Services for every sector" />
        <ServicesGrid services={services} />
      </Section>

      <CtaBand />
    </>
  );
}
