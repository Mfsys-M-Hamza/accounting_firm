import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import { getIndustry, industries, industryHref } from "@/content/industries";
import { getService } from "@/content/services";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { IconBadge } from "@/components/icons/icon-badge";
import { ServiceCard } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";

/**
 * Audience landing page template. Every entry in src/content/industries.ts is
 * rendered through this page — add an audience there to create a new page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ title: industry.headline, description: industry.metaDescription, path: industryHref(industry) });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relevant = industry.services.map(getService).filter((s) => s !== undefined);
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 8);

  return (
    <>
      <PageHero
        eyebrow={industry.name}
        title={industry.headline}
        intro={industry.intro}
        crumbs={[
          { name: "Who We Help", href: "/industries" },
          { name: industry.name, href: industryHref(industry) },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/quote" size="lg">
            Get a Free Quote <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/book-consultation" variant="outline-light" size="lg">
            <CalendarCheck aria-hidden="true" /> Book a Consultation
          </ButtonLink>
        </div>
      </PageHero>

      {/* Challenges */}
      <Section labelledBy="challenges-title">
        <SectionHeading id="challenges-title" eyebrow="Common challenges" title="Challenges we often help with" />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {industry.challenges.map((c) => (
            <StaggerItem key={c.title}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <IconBadge icon={industry.icon} />
                <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 leading-relaxed text-body">{c.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* How we help */}
      <Section labelledBy="support-title" tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="support-title"
              align="left"
              eyebrow="How we help"
              title="What we take care of for you"
              text="A dedicated accountant, a clear scope and an agreed fee — covering the work below, or just the parts you need."
              className="mb-8"
            />
            <Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {industry.support.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-medium text-navy-900">
                    <Check className="mt-0.5 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/book-consultation">
                  Book a free consultation <ArrowRight aria-hidden="true" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="relative aspect-photo overflow-hidden rounded-2xl">
            <Image
              quality={85}
              src={images.consultationHandshake.src}
              alt={images.consultationHandshake.alt}
              fill
              placeholder="blur"
              sizes="(min-width:1200px) 34rem, (min-width:1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* Relevant services */}
      {relevant.length > 0 ? (
        <Section labelledBy="services-title">
          <SectionHeading id="services-title" eyebrow="Relevant services" title={`Services for ${industry.name.toLowerCase()}`} />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {relevant.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <Section labelledBy="process-title" tone="paper">
        <SectionHeading id="process-title" eyebrow="How it works" title="Getting started is simple" />
        <Process />
      </Section>

      <Section labelledBy="faq-title">
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="faq-title" eyebrow="FAQs" title={`${industry.name}: common questions`} />
          <Reveal>
            <FaqList items={industry.faqs} schema />
          </Reveal>
        </div>
      </Section>

      {/* Other audiences */}
      <Section labelledBy="others-title" tone="paper">
        <SectionHeading id="others-title" eyebrow="Who we help" title="We also work with" />
        <ul className="flex flex-wrap justify-center gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <ButtonLink href={industryHref(o)} variant="outline" size="sm">
                <o.icon aria-hidden="true" /> {o.name}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Talk to us about accounting for ${industry.name.toLowerCase()}`} defaultService={relevant[0]?.title} />
    </>
  );
}
