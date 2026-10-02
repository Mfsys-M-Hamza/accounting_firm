import Image from "next/image";
import { siteConfig } from "@/config/site";
import { isConfigured } from "@/lib/config-utils";
import { SocialIcon } from "@/components/icons/brand-icons";
import { SampleBadge } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/motion";

/** Team profiles from siteConfig.team. Placeholder profiles are visibly labelled. */
export function Team() {
  if (!siteConfig.features.showTeam) return null;
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {siteConfig.team.map((p, i) => (
        <StaggerItem key={`${p.name}-${i}`}>
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
            <div className="relative aspect-[4/3.6] overflow-hidden bg-[linear-gradient(160deg,#4644bf,#1c1b6b)]">
              {p.photo ? (
                <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="bg-grid-dark flex h-full items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 80 80" className="size-28 text-white/25">
                    <circle cx="40" cy="28" r="14" fill="currentColor" />
                    <path d="M12 76c0-16 12.5-26 28-26s28 10 28 26Z" fill="currentColor" />
                  </svg>
                </div>
              )}
              {p.placeholder ? (
                <div className="absolute top-3 left-3">
                  <SampleBadge>Sample profile</SampleBadge>
                </div>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm font-semibold text-gold-600">{p.position}</p>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-1.5">
                  <dt className="font-semibold text-ink">Qualification:</dt>
                  <dd className="text-body">{p.qualification}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-semibold text-ink">Focus:</dt>
                  <dd className="text-body">{p.specialization}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-body">{p.bio}</p>
              {isConfigured(p.linkedin) ? (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-navy-700 hover:text-navy-900">
                  <SocialIcon platform="linkedin" className="size-4" /> LinkedIn profile<span className="sr-only"> of {p.name}</span>
                </a>
              ) : null}
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
