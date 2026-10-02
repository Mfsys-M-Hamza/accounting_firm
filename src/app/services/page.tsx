import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { Illustration } from "@/components/icons/illustrations";
import { Stagger, StaggerItem } from "@/components/motion/motion";

export const metadata = buildMetadata({
  title: "Our Services",
  description:
    "Accounting & bookkeeping, VAT returns, Self Assessment & Corporation Tax, payroll, company registration, management accounts, Xero & QuickBooks and business consulting — all from one UK team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Accounting, VAT, tax & payroll services"
        intro="Choose a single service or combine several into one coordinated engagement. Every service is scoped to your business, with clear deliverables and agreed fees."
        crumbs={[{ name: "Services", href: "/services" }]}
        illustration="reporting"
      >
        <ButtonLink href="/quote" variant="gold" size="lg">
          Get a Free Quote <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <Section labelledBy="all-services-title" tone="paper">
        <SectionHeading id="all-services-title" eyebrow="What we offer" title="Explore our services" />
        <ServicesGrid services={services} />
      </Section>

      {/* Detailed index — gives every sub-service an internal link */}
      <Section labelledBy="index-title">
        <SectionHeading id="index-title" eyebrow="Service index" title="Everything we can help with" text="A complete list of what's included in each service area." />
        <Stagger className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <Illustration name={s.illustration} className="size-12 shrink-0" />
                <h3 className="text-lg font-semibold">
                  <Link href={`/services/${s.slug}`} className="hover:text-navy-700">
                    {s.title}
                  </Link>
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {s.included.map((item) => (
                  <li key={item.title}>
                    <Link href={`/services/${s.slug}#included`} className="text-body transition-colors hover:text-navy-700">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="process-title" tone="paper">
        <SectionHeading id="process-title" eyebrow="How we work" title="Simple to start, easy to work with" />
        <Process />
      </Section>

      <CtaBand />
    </>
  );
}
