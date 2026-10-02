import { sortedPosts } from "@/content/posts";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/motion";
import { PostCard } from "@/components/sections/post-card";
import { ResourceExplorer } from "@/components/sections/resource-explorer";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: "Resources & Insights",
  description: "Practical guides on accounting, VAT, tax, compliance, finance and starting a business — written by our professional team.",
  path: "/resources",
});

export default function ResourcesPage() {
  const featured = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];
  // Article bodies stay on the server; the client explorer only needs summaries.
  const summaries = sortedPosts.map(({ body, ...rest }) => rest);

  return (
    <>
      <PageHero
        eyebrow="Resource centre"
        title="Insights, guides & updates"
        intro="Practical, plain-English guidance to help you run a compliant, well-managed and growing business."
        crumbs={[{ name: "Resources", href: "/resources" }]}
        illustration="bookkeeping"
      />

      <Section labelledBy="featured-title" tone="paper" className="pb-10 sm:pb-12 lg:pb-14">
        <h2 id="featured-title" className="eyebrow mb-6 font-sans">
          Featured article
        </h2>
        <Reveal>
          <PostCard post={featured} featured headingLevel="h3" />
        </Reveal>
      </Section>

      <Section labelledBy="all-title" tone="paper" className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeading id="all-title" align="left" title="Browse all articles" className="mb-8" />
        <ResourceExplorer posts={summaries} />
      </Section>

      <CtaBand title="Need advice specific to your business?" text="Our articles are general guidance. For advice tailored to your circumstances, speak to our team." />
    </>
  );
}
