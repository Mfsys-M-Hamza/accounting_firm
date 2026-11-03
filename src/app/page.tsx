import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { sortedPosts } from "@/content/posts";
import { faqs } from "@/content/faqs";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Advantages } from "@/components/sections/advantages";
import { DataProtection } from "@/components/sections/data-protection";
import { Process } from "@/components/sections/process";
import { TeamPreview } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { PostCard } from "@/components/sections/post-card";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";

export const metadata = buildMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: "/",
  absoluteTitle: true,
});

const homeFaqs = faqs.slice(0, 5);

const approach = [
  "One dedicated accountant who knows your business",
  "Clear fees agreed before any work starts",
  "Plain-English advice, not jargon",
  "Cloud software so your numbers are always current",
];

/**
 * Home page, in the order set by the client's website brief: hero, trust
 * strip, services, who we help, why us, how it works, about/team,
 * testimonials (only once genuine reviews are supplied), insights + FAQs and
 * the closing call to action.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* Services */}
      <Section id="services" labelledBy="services-title">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            align="left"
            eyebrow="Our services"
            title="Accounting, tax and payroll — handled properly"
            text="Choose a single service or combine them. Every engagement has a clear scope and an agreed fee."
            className="mb-0"
          />
          <Reveal>
            <ButtonLink href="/services" variant="outline" className="shrink-0">
              All services <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <ServicesGrid services={services} />
      </Section>

      {/* Who we help */}
      <Section labelledBy="audiences-title" tone="paper">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <SectionHeading
            id="audiences-title"
            align="left"
            eyebrow="Who we help"
            title="Support shaped around how you work"
            text="Every type of business has its own deadlines, taxes and paperwork. We tailor our support to yours."
            className="mb-0"
          />
          <Reveal>
            <ButtonLink href="/industries" variant="outline" className="shrink-0">
              See who we help <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <IndustriesGrid limit={8} />
      </Section>

      {/* Why UK Accountax */}
      <Section labelledBy="why-title">
        <SectionHeading
          id="why-title"
          eyebrow={`Why ${siteConfig.companyName}`}
          title="Straightforward support you can rely on"
          text="We look after your bookkeeping, tax and compliance so you can spend your time running the business."
        />
        <Advantages limit={6} />
        <DataProtection className="mt-8" />
      </Section>

      {/* How it works */}
      <Section labelledBy="process-title" tone="paper">
        <SectionHeading id="process-title" eyebrow="How it works" title="Getting started is simple" text="Four clear steps from the first conversation to ongoing support." />
        <Process />
        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/book-consultation" size="lg">
            Book a free consultation <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Section>

      {/* About / team */}
      <Section labelledBy="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-photo overflow-hidden rounded-2xl">
            <Image quality={85} src={images.teamBoardroom.src} alt={images.teamBoardroom.alt} fill placeholder="blur" sizes="(min-width:1200px) 34rem, (min-width:1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading
              id="about-title"
              align="left"
              eyebrow={`About ${siteConfig.companyName}`}
              title="A UK accountancy firm built around small businesses"
              text={`${siteConfig.companyName} works with owner-managed businesses, sole traders and startups across the UK. We keep your books accurate and your filings on time, and we explain what the numbers mean so you can make better decisions.`}
              className="mb-8"
            />
            <Reveal>
              <ul className="space-y-3">
                {approach.map((t) => (
                  <li key={t} className="flex items-start gap-3 font-medium text-navy-900">
                    <Check className="mt-0.5 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/about" variant="outline">
                  More about us <ArrowRight aria-hidden="true" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Team */}
      {siteConfig.features.showTeam ? (
        <Section labelledBy="team-title" tone="paper">
          <SectionHeading id="team-title" eyebrow="Our team" title="The people you'll work with" text="Qualified, friendly accountants who take the time to understand your business." />
          <TeamPreview />
        </Section>
      ) : null}

      {/* Testimonials: hidden until genuine, approved reviews are supplied. */}
      {siteConfig.features.showTestimonials ? (
        <Section labelledBy="testimonials-title" tone="paper">
          <SectionHeading id="testimonials-title" eyebrow="Client feedback" title="What our clients say" />
          <Testimonials />
        </Section>
      ) : null}

      {/* Insights */}
      <Section labelledBy="resources-title" tone="paper">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <SectionHeading
            id="resources-title"
            align="left"
            eyebrow="Insights"
            title="Practical guides for UK businesses"
            text="Plain-English articles on VAT, tax, payroll and running your finances."
            className="mb-0"
          />
          <Reveal>
            <ButtonLink href="/resources" variant="outline" className="shrink-0">
              All articles <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQs */}
      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" align="left" eyebrow="FAQs" title="Common questions" text="Quick answers to the questions we hear most often." className="mb-8" />
            <Reveal>
              <ButtonLink href="/faqs" variant="outline">
                See all FAQs <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal>
            <FaqList items={homeFaqs} schema />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
