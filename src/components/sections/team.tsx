import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import type { TeamMember } from "@/config/types";
import { siteConfig } from "@/config/site";
import { cn, isConfigured } from "@/lib/config-utils";
import { SocialIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion";

// Files in /public aren't prefixed with the base path automatically (GitHub Pages sub-path).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const leadership = () => siteConfig.team.filter((m) => m.group === "leadership");
export const teamMembers = () => siteConfig.team.filter((m) => m.group === "team");

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/**
 * Portrait (4:5). Shows the photo, or an initials monogram until a real photo is supplied.
 * Zooms gently when its `group` parent card is hovered.
 */
function Portrait({ member, sizes, className }: { member: TeamMember; sizes: string; className?: string }) {
  return (
    <div className={cn("relative aspect-portrait overflow-hidden bg-navy-900", className)}>
      {member.photo ? (
        <Image
          quality={85}
          src={`${basePath}${member.photo}`}
          alt={`${member.name}, ${member.position}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--color-navy-700),var(--color-navy-900)_70%)] transition-transform duration-500 ease-out group-hover:scale-105"
          aria-hidden="true"
        >
          <span className="flex size-24 items-center justify-center rounded-full border-2 border-teal-300/60 text-3xl font-bold tracking-wide text-white transition-colors duration-500 group-hover:border-teal-300 group-hover:bg-teal-600/30">
            {initials(member.name)}
          </span>
        </div>
      )}
      {member.placeholder ? (
        <div className="absolute top-3 left-3">
          <SampleBadge>Sample profile</SampleBadge>
        </div>
      ) : null}
    </div>
  );
}

function Badges({ items, tone = "teal" }: { items: string[]; tone?: "teal" | "gold" }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((q) => (
        <li
          key={q}
          className={cn(
            "rounded-md px-2 py-0.5 text-xs font-semibold",
            tone === "gold" ? "bg-gold-100 text-gold-700" : "bg-teal-50 text-teal-700",
          )}
        >
          {q}
        </li>
      ))}
    </ul>
  );
}

function LinkedIn({ member, className }: { member: TeamMember; className?: string }) {
  if (!isConfigured(member.linkedin)) return null;
  return (
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800", className)}>
      <SocialIcon platform="linkedin" className="size-4" /> LinkedIn<span className="sr-only"> profile of {member.name}</span>
    </a>
  );
}

/** Team card: portrait, name, role, qualifications, focus areas and a short bio. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-300 hover:shadow-lift">
      <Portrait member={member} sizes="(min-width:1200px) 18rem, (min-width:1024px) 22vw, (min-width:640px) 45vw, 100vw" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-teal-700">{member.position}</p>
        <div className="mt-3">
          <Badges items={member.qualifications} tone="gold" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-body">{member.bio}</p>
        {member.expertise.length > 0 ? <p className="mt-3 text-xs text-muted">Focus: {member.expertise.join(" · ")}</p> : null}
        <LinkedIn member={member} className="mt-auto pt-4" />
      </div>
    </article>
  );
}

/** Card grid for any list of members. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <Stagger className={cn("grid gap-5 sm:grid-cols-2", members.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {members.map((m, i) => (
        <StaggerItem key={`${m.name}-${m.position}-${i}`}>
          <TeamCard member={m} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Leadership: large split profiles that alternate sides, with a call to book a consultation. */
export function LeadershipProfiles({ members }: { members: TeamMember[] }) {
  return (
    <div className="space-y-8 lg:space-y-12">
      {members.map((m, i) => (
        <Reveal key={`${m.name}-${m.position}-${i}`}>
          <article className="group grid overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-lift md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Portrait member={m} sizes="(min-width:768px) 30rem, 100vw" className={cn("md:aspect-auto md:min-h-[26rem]", i % 2 === 1 && "md:order-2")} />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="eyebrow">{m.position}</p>
              <h3 className="mt-2 text-3xl font-bold">{m.name}</h3>
              <div className="mt-4">
                <Badges items={m.qualifications} tone="gold" />
              </div>
              <p className="mt-5 text-lg leading-relaxed text-body">{m.bio}</p>
              {m.expertise.length > 0 ? (
                <div className="mt-6">
                  <p className="text-sm font-bold text-navy-900">Areas of expertise</p>
                  <div className="mt-2">
                    <Badges items={m.expertise} />
                  </div>
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href="/book-consultation" size="md">
                  <CalendarCheck aria-hidden="true" /> Book a consultation
                </ButtonLink>
                <LinkedIn member={m} />
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Compact preview for the home and about pages: up to four people and a link to /team. */
export function TeamPreview() {
  if (!siteConfig.features.showTeam || siteConfig.team.length === 0) return null;
  const people = [...leadership(), ...teamMembers()].slice(0, 4);
  return (
    <div>
      <TeamGrid members={people} />
      <Reveal className="mt-10 flex justify-center">
        <Link href="/team" className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800">
          Meet the whole team <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  );
}
