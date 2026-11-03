import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { configuredSocialLinks, formattedAddress, mailtoHref, telHref, whatsappDisplay } from "@/lib/config-utils";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/logo";
import { CookieSettingsLink } from "@/components/layout/analytics";
import { ButtonLink } from "@/components/ui/button";
import { SocialIcon, WhatsAppIcon, socialLabels } from "@/components/icons/brand-icons";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[0.9375rem] text-white/70 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({ icon: Icon, href, children, external }: { icon: ComponentType<{ className?: string }>; href?: string; children: ReactNode; external?: boolean }) {
  const content = (
    <>
      <Icon className="mt-0.5 size-4 shrink-0 text-teal-300" />
      <span>{children}</span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-start gap-3 text-white/70 transition-colors hover:text-white" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {content}
        </a>
      ) : (
        <span className="flex items-start gap-3 text-white/70">{content}</span>
      )}
    </li>
  );
}

export function Footer() {
  const socials = configuredSocialLinks();
  const year = new Date().getFullYear();
  const credit = siteConfig.developerCredit;
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page pt-16 pb-24 md:pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr_1.3fr] lg:gap-8">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">{siteConfig.description}</p>
            {siteConfig.certifications.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {siteConfig.certifications.map((c) => (
                  <li key={c.name} className="rounded-md border border-white/15 px-3 py-1 text-xs text-white/75">
                    {c.name}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6">
              <ButtonLink href="/quote" size="sm">
                Get a Free Quote
              </ButtonLink>
            </div>
          </div>

          <Column title="Services" links={footerNav.services} />
          <Column title="Who We Help" links={footerNav.audiences} />
          <Column title="Company" links={footerNav.company} />

          <div>
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <ul className="mt-4 space-y-3.5 text-[0.9375rem]">
              <ContactRow icon={Phone} href={telHref()}>
                {siteConfig.contact.phone}
              </ContactRow>
              <ContactRow icon={WhatsAppIcon} href={generalWhatsappUrl()} external>
                WhatsApp: {whatsappDisplay()}
              </ContactRow>
              <ContactRow icon={Mail} href={mailtoHref()}>
                {siteConfig.contact.email}
              </ContactRow>
              <ContactRow icon={MapPin}>{formattedAddress()}</ContactRow>
              <ContactRow icon={Clock3}>
                {siteConfig.contact.businessHours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.hours}
                  </span>
                ))}
              </ContactRow>
            </ul>
            {socials.length > 0 ? (
              <ul className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[s.platform]}
                      className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-white/75 transition-colors hover:border-teal-300 hover:text-teal-300"
                    >
                      <SocialIcon platform={s.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="hover:text-white" />
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {credit ? (
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-white/10 pt-6 text-center text-[0.8125rem] text-white/60">
            <span>
              Developed by{" "}
              <a href={credit.url} target="_blank" rel="noopener" className="font-semibold text-teal-300 transition-colors hover:text-white">
                {credit.name}
              </a>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="basis-full sm:basis-auto">
              Contact:{" "}
              <a href={telHref(credit.phone)} className="font-semibold text-white/75 transition-colors hover:text-white">
                {credit.phone}
              </a>
            </span>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
