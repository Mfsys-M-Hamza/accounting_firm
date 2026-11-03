import Image from "next/image";
import { ArrowRight, ClipboardList, Compass, Eye, FileCheck2, Lightbulb, MessagesSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { values } from "@/content/home";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { IconBadge } from "@/components/icons/icon-badge";
import { Stats } from "@/components/sections/stats";
import { TeamPreview } from "@/components/sections/team";
import { Advantages } from "@/components/sections/advantages";
import { DataProtection } from "@/components/sections/data-protection";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";
import { SocialFeed } from "@/components/sections/social-feed";

export const metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.companyName}: a UK-based accountancy firm of qualified accountants providing accounting, bookkeeping, VAT, payroll and tax services to small businesses.`,
  path: "/about",
});

const approach = [
  { title: "Understand", text: "We start by learning how your business works, what you want to achieve and where the risks lie.", icon: MessagesSquare },
  { title: "Plan", text: "Every engagement has an agreed scope, timetable, fee and named contact — before work begins.", icon: ClipboardList },
  { title: "Deliver", text: "Work is carried out systematically, reviewed carefully and filed on time with HMRC and Companies House.", icon: FileCheck2 },
  { title: "Advise", text: "We explain what the numbers mean and recommend practical next steps, not just deliver reports.", icon: Lightbulb },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Accounting support with a personal touch"
        intro={`${siteConfig.companyName} is a UK-based accountancy firm of qualified accountants, helping small businesses grow with accurate accounting, practical advice and stress-free tax.`}
        crumbs={[{ name: "About Us", href: "/about" }]}
      />

      {/* Introduction */}
      <Section labelledBy="intro-title">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="intro-title"
              align="left"
              eyebrow="Who we are"
              title={`Introducing ${siteConfig.companyName}`}
              className="mb-6"
            />
            <Reveal className="space-y-5 text-lg leading-relaxed">
              <p>
                Founded in 2021 and headquartered in {siteConfig.contact.address.city}, {siteConfig.companyName} is a UK-based accountancy firm with qualified accountants
                helping small businesses to grow — offering accounting advice while saving you money on tax, in a very timely manner.
              </p>
              <p>
                We provide accounting and bookkeeping, VAT, Self Assessment and Corporation Tax, payroll, management accounts, company registration and Xero and QuickBooks
                support — working with sole traders, startups, e-commerce sellers and limited companies across the UK, fully online.
              </p>
              <p>
                Our team is competent, experienced, professional and friendly. With a dedicated accountant looking after you, your accountancy needs are in safe hands and
                will be completed in a professional and legal way — with clear fees agreed up front and every piece of information kept strictly confidential.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" className="relative">
            <div className="relative aspect-photo overflow-hidden rounded-2xl">
              <Image quality={85} src={images.modernOffice.src} alt={images.modernOffice.alt} fill placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section labelledBy="mission-title" tone="paper">
        <h2 id="mission-title" className="sr-only">
          Mission and vision
        </h2>
        <Stagger className="grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <div className="h-full rounded-xl bg-navy-900 p-8 text-white sm:p-10">
              <IconBadge icon={Compass} size="lg" light />
              <h3 className="mt-6 text-2xl font-bold text-white">Our mission</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/80">
                Empowering businesses with accurate accounting, strategic planning and stress-free tax solutions — because your financial well-being is our priority.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full rounded-xl border border-line bg-white p-8 sm:p-10">
              <IconBadge icon={Eye} size="lg" />
              <h3 className="mt-6 text-2xl font-bold">Our vision</h3>
              <p className="mt-3 text-lg leading-relaxed text-body">
                To be the trusted partner in financial success for small businesses across the UK, recognised for low-cost, high-quality service, modern online ways of
                working and advice that makes a real difference.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="Our values" title="The principles behind our work" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <IconBadge icon={v.icon} />
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Approach */}
      <Section labelledBy="approach-title" tone="paper">
        <SectionHeading
          id="approach-title"
          eyebrow="Professional approach"
          title="Rigorous, transparent and practical"
          text="Whatever the engagement, the same disciplined approach applies."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a) => (
            <StaggerItem key={a.title}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <IconBadge icon={a.icon} />
                <h3 className="mt-4 text-lg font-bold">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{a.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Stats className="mt-12" />
      </Section>

      {/* Team */}
      {siteConfig.features.showTeam ? (
        <Section id="team" labelledBy="team-title">
          <SectionHeading
            id="team-title"
            eyebrow="Leadership & team"
            title="The people behind the work"
            text="Experienced professionals who take the time to understand your business."
          />
          <TeamPreview />
        </Section>
      ) : null}

      {/* Why clients choose us */}
      <Section labelledBy="why-title" tone="paper">
        <SectionHeading id="why-title" eyebrow="Why clients choose us" title="What working with us looks like" />
        <Advantages />
        <DataProtection className="mt-8" onPaper />
        <Reveal className="mt-12 text-center">
          <ButtonLink href="/services" size="lg">
            Explore our services <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Section>

      {siteConfig.features.showTestimonials ? (
        <Section labelledBy="testimonials-title">
          <SectionHeading id="testimonials-title" eyebrow="Client feedback" title="What our clients say" />
          <Testimonials />
        </Section>
      ) : null}

      {/* Social feed */}
      <Section labelledBy="social-title">
        <SectionHeading
          id="social-title"
          eyebrow="Follow us"
          title="Tips, updates and offers from our team"
          text="See our latest posts on LinkedIn, Instagram and Facebook — and send us a message any time."
        />
        <SocialFeed limit={4} />
      </Section>

      <CtaBand title="Let's talk about your business" />
    </>
  );
}
