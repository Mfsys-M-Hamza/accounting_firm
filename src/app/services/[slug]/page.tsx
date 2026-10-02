import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Check, FileCheck2 } from "lucide-react";
import { getService, services } from "@/content/services";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { ServiceCard } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

/**
 * Reusable service template. Every entry in src/content/services.ts is
 * rendered through this page — add a service there to create a new page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const img = images[service.image];
  const related = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.headline}
        intro={service.intro}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
        illustration={service.illustration}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/quote" variant="gold" size="lg">
            Get a Free Quote <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/book-consultation" variant="outline-light" size="lg">
            <CalendarCheck aria-hidden="true" /> Book a Consultation
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <Section labelledBy="overview-title">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading id="overview-title" align="left" eyebrow="Overview" title={`Why ${service.title} matters`} className="mb-6" />
            <Reveal className="space-y-5 text-lg leading-relaxed">
              {service.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal direction="left" className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width:1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="mt-6 rounded-3xl border border-line bg-paper p-7">
              <h3 className="text-lg font-semibold">Ideal for</h3>
              <ul className="mt-4 space-y-2.5">
                {service.idealFor.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-body">
                    <Check className="mt-1 size-4 shrink-0 text-gold-500" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What's included */}
      <Section id="included" labelledBy="included-title" tone="paper">
        <SectionHeading id="included-title" eyebrow="What's included" title={`Our ${service.title} services`} />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="font-display text-sm font-semibold text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Benefits + deliverables */}
      <Section labelledBy="benefits-title">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="benefits-title" align="left" eyebrow="Benefits" title="What you gain" className="mb-8" />
            <Stagger className="space-y-5">
              {service.benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="flex gap-5 rounded-3xl border border-line p-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#5a58d0,#1c1b6b)] text-gold-400 shadow-[0_4px_0_#0c0b36]">
                      <Check className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{b.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-body">{b.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal direction="left">
            <div className="h-full rounded-[2rem] bg-navy-900 p-8 text-white sm:p-10">
              <FileCheck2 className="size-10 text-gold-400" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold text-white">Typical deliverables</h2>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-white/80">
                    <Check className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">Exact deliverables are confirmed in your engagement letter.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/quote" variant="gold">
                  Request a quote
                </ButtonLink>
                <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" external>
                  <WhatsAppIcon /> WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="process-title" tone="paper">
        <SectionHeading id="process-title" eyebrow="How it works" title="Our process" />
        <Process />
      </Section>

      {service.faqs.length > 0 ? (
        <Section labelledBy="faq-title">
          <div className="mx-auto max-w-4xl">
            <SectionHeading id="faq-title" eyebrow="FAQs" title={`${service.title}: common questions`} />
            <Reveal>
              <FaqList items={service.faqs} schema />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section labelledBy="related-title" tone="paper">
          <SectionHeading id="related-title" eyebrow="Related services" title="Often combined with" />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <ServiceCard service={r} showList={false} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <CtaBand title={`Talk to us about ${service.title}`} defaultService={service.title} />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
