import { notFound } from "next/navigation";
import { BadgeCheck, MessagesSquare, UserRoundCheck, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/motion";
import { IconBadge } from "@/components/icons/icon-badge";
import { LeadershipProfiles, TeamGrid, leadership, teamMembers } from "@/components/sections/team";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: "Our Team",
  description: `Meet the accountants behind ${siteConfig.companyName}: the people who look after your bookkeeping, VAT, payroll and tax.`,
  path: "/team",
});

const workingTogether = [
  { icon: UserRoundCheck, title: "One named accountant", text: "You always know who is looking after you, and they know your business." },
  { icon: Users, title: "A team behind them", text: "Tax, payroll and bookkeeping specialists step in whenever your accountant needs them." },
  { icon: MessagesSquare, title: "Easy to reach", text: "Phone, email, WhatsApp or video — whichever suits you." },
];

export default function TeamPage() {
  if (!siteConfig.features.showTeam) notFound();
  const leaders = leadership();
  const members = teamMembers();

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind your accounts"
        intro={`Friendly, qualified accountants who take the time to understand your business. Here's who you'll be working with at ${siteConfig.companyName}.`}
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Our Team", href: "/team" },
        ]}
      />

      {leaders.length > 0 ? (
        <Section labelledBy="leadership-title">
          <SectionHeading id="leadership-title" eyebrow="Leadership" title="Meet the directors" text="Experienced accountants who set the standard for every client we work with." />
          <LeadershipProfiles members={leaders} />
        </Section>
      ) : null}

      {members.length > 0 ? (
        <Section labelledBy="team-title" tone="paper">
          <SectionHeading id="team-title" eyebrow="The team" title="Specialists in every area you need" />
          <TeamGrid members={members} />
        </Section>
      ) : null}

      <Section labelledBy="together-title">
        <SectionHeading id="together-title" eyebrow="Working with us" title="How our team works with you" />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {workingTogether.map((w) => (
            <StaggerItem key={w.title}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <IconBadge icon={w.icon} />
                <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
                <p className="mt-1.5 leading-relaxed text-body">{w.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {siteConfig.certifications.length > 0 ? (
          <div className="mt-12 rounded-xl border border-line bg-paper p-6 text-center">
            <p className="font-bold text-navy-900">Professional memberships</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {siteConfig.certifications.map((c) => (
                <li key={c.name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-900">
                  <BadgeCheck className="size-4 text-teal-600" aria-hidden="true" />
                  {c.name}
                  {c.reference ? <span className="font-normal text-muted">({c.reference})</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <CtaBand title="Talk to our team" text="Tell us about your business and we'll match you with the right accountant." />
    </>
  );
}
