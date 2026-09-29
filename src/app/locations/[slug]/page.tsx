import { notFound } from "next/navigation";
import { getService } from "@/content/services";
import { publishedLocations } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { ServiceCard } from "@/components/sections/services-grid";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";

/**
 * Local SEO landing page template. Only locations marked `published: true`
 * in src/content/locations.ts are generated — see the notes in that file.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  // With nothing published this is empty and every /locations/* URL 404s.
  return publishedLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = publishedLocations.find((l) => l.slug === slug);
  if (!loc) return {};
  return buildMetadata({ title: loc.headline, description: loc.metaDescription, path: `/locations/${loc.slug}` });
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = publishedLocations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const featured = loc.services.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        eyebrow={loc.city}
        title={loc.headline}
        intro={loc.intro}
        crumbs={[{ name: loc.headline, href: `/locations/${loc.slug}` }]}
        illustration="formation"
      />
      <Section labelledBy="local-title">
        <h2 id="local-title" className="sr-only">
          About our services in {loc.city}
        </h2>
        <div className="mx-auto max-w-3xl space-y-12">
          {loc.sections.map((s) => (
            <Reveal key={s.heading}>
              <h3 className="text-2xl font-semibold">{s.heading}</h3>
              <p className="mt-4 text-lg leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      {featured.length ? (
        <Section labelledBy="local-services" tone="paper">
          <SectionHeading id="local-services" title={`Our services in ${loc.city}`} />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {featured.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}
      {loc.faqs.length ? (
        <Section labelledBy="local-faq">
          <div className="mx-auto max-w-4xl">
            <SectionHeading id="local-faq" title="Questions from local businesses" />
            <FaqList items={loc.faqs} schema />
          </div>
        </Section>
      ) : null}
      <CtaBand />
    </>
  );
}
