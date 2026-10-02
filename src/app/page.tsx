import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { sortedPosts } from "@/content/posts";
import { faqs } from "@/content/faqs";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Stats } from "@/components/sections/stats";
import { Advantages } from "@/components/sections/advantages";
import { Process } from "@/components/sections/process";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { PostCard } from "@/components/sections/post-card";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBand } from "@/components/sections/cta-band";
import { SocialFeed } from "@/components/sections/social-feed";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { Illustration } from "@/components/icons/illustrations";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { generalWhatsappUrl } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: "/",
  absoluteTitle: true,
});

const homeFaqs = faqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services */}
      <Section id="services" labelledBy="services-title" tone="paper">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="Complete accounting, VAT & tax services under one roof"
          text="From monthly bookkeeping and VAT returns to payroll, tax returns and company registration, our services work together as your business grows."
        />
        <ServicesGrid services={services} />
      </Section>

      {/* About teaser + stats */}
      <Section labelledBy="about-title">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={images.teamBoardroom.src} alt={images.teamBoardroom.alt} fill placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-8 hidden rounded-3xl bg-navy-900 p-6 text-white shadow-lift sm:block lg:-right-8">
              <Illustration name="compliance" className="size-16" />
              <p className="mt-3 max-w-[12rem] font-display text-lg leading-snug font-semibold">HMRC-compliant, stress-free accounting</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              id="about-title"
              align="left"
              eyebrow={`About ${siteConfig.companyName}`}
              title="Low-cost accounting. High-quality service."
              text={`${siteConfig.companyName} is a UK-based accountancy firm with qualified accountants helping small businesses grow — offering practical advice while saving you money on tax.`}
              className="mb-8"
            />
            <Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {["Qualified, experienced accountants", "Your own dedicated accountant", "All filing included — no hidden costs", "Xero & QuickBooks experts"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 font-medium text-ink">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/about">
                  More about us <ArrowRight aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/book-consultation" variant="outline">
                  Book a consultation
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
        <Stats className="mt-24" />
      </Section>

      {/* Why choose us */}
      <Section labelledBy="why-title" tone="paper">
        <SectionHeading
          id="why-title"
          eyebrow="Why choose us"
          title="Focus on the big picture — we've got your back office"
          text="We take care of your bookkeeping, accounting and tax compliance, so you can focus on growth, strategy and success."
        />
        <Advantages />
      </Section>

      {/* Process */}
      <Section labelledBy="process-title" tone="navy" className="overflow-hidden">
        <div className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" aria-hidden="true" />
        <div className="relative">
          <SectionHeading id="process-title" light eyebrow="How we work" title="A clear, four-step process" text="Straightforward from the first conversation to ongoing support." />
          <Process light />
        </div>
      </Section>

      {/* Industries */}
      <Section labelledBy="industries-title">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="industries-title"
            align="left"
            eyebrow="Industries we serve"
            title="Sector knowledge that makes a difference"
            text="Every industry has its own accounting, tax and compliance challenges. We tailor our approach to yours."
            className="mb-0"
          />
          <Reveal>
            <ButtonLink href="/industries" variant="outline" className="shrink-0">
              All industries <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <IndustriesGrid limit={8} />
      </Section>

      {/* Quote CTA */}
      <section aria-labelledby="quote-cta-title" className="bg-paper pb-4">
        <div className="container-page">
          <Reveal direction="scale">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#29288e,#0b1f3a_60%)] px-6 py-12 sm:px-12 lg:px-16 lg:py-14">
              <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="eyebrow text-gold-400">Instant quote</p>
                  <h2 id="quote-cta-title" className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                    Get your tailored quotation in minutes
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg text-white/70">
                    Answer a few quick questions and send your request straight to us on WhatsApp — or submit it online. No obligation.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href="/quote" variant="gold" size="lg">
                      Get Your Instant Quote <ArrowRight aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" size="lg" external>
                      <WhatsAppIcon /> Chat on WhatsApp
                    </ButtonLink>
                  </div>
                </div>
                <div className="hidden gap-4 lg:flex" aria-hidden="true">
                  <Illustration name="vat" className="size-28 animate-float" />
                  <Illustration name="reporting" className="size-28 translate-y-8 animate-float-slow" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      {siteConfig.features.showTestimonials ? (
        <Section labelledBy="testimonials-title" tone="paper">
          <SectionHeading id="testimonials-title" eyebrow="Client feedback" title="What our clients say" />
          <Testimonials />
        </Section>
      ) : null}

      {/* Resources */}
      <Section labelledBy="resources-title" tone="paper">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="resources-title" align="left" eyebrow="Resources" title="Insights & practical guides" className="mb-0" />
          <Reveal>
            <ButtonLink href="/resources" variant="outline" className="shrink-0">
              View all articles <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Social feed */}
      <Section labelledBy="social-title">
        <SectionHeading
          id="social-title"
          eyebrow="Follow us"
          title="Tips, updates and offers from our team"
          text="See our latest posts on LinkedIn, Instagram and Facebook — and send us a message any time."
        />
        <SocialFeed />
      </Section>

      {/* FAQ */}
      <Section labelledBy="faq-title" tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-title" align="left" eyebrow="FAQs" title="Frequently asked questions" text="Quick answers to the questions we hear most often." className="mb-8" />
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
