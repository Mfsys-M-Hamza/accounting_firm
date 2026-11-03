"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Clock3, LayoutGrid, Mail, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { services } from "@/content/services";
import { cn, mailtoHref, telHref } from "@/lib/config-utils";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { IconBadge } from "@/components/icons/icon-badge";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  const phone = telHref();
  const email = mailtoHref();
  const hours = siteConfig.contact.businessHours[0];

  return (
    <>
      {/* Contact strip: scrolls away with the page, hidden on phones to save space. */}
      <div className="hidden bg-navy-900 text-white/80 md:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.8125rem]">
          <div className="flex items-center gap-6">
            <a href={phone} className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="size-3.5 text-teal-300" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
            <a href={email} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="size-3.5 text-teal-300" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </div>
          <p className="flex items-center gap-2">
            <Clock3 className="size-3.5 text-teal-300" aria-hidden="true" />
            {hours.days}: {hours.hours}
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white transition-shadow duration-200",
          scrolled || menuOpen ? "border-line shadow-[0_6px_20px_-12px_rgb(18_48_74/0.25)]" : "border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo className="max-w-[70%] lg:max-w-none" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href}>
                    <ServicesMenu open={servicesOpen} setOpen={setServicesOpen} active={isActive(pathname, item.href)} />
                  </li>
                ) : (
                  <NavLink key={item.href} {...item} active={isActive(pathname, item.href)} />
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink href="/quote" size="sm">
                Get a Quote
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-lg text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
      </header>
    </>
  );
}

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-lg px-3.5 py-2 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:bg-navy-50 hover:text-teal-700",
          active && "text-teal-700",
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function ServicesMenu({ open, setOpen, active }: { open: boolean; setOpen: (v: boolean) => void; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 150);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3.5 py-2 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:bg-navy-50 hover:text-teal-700",
          active && "text-teal-700",
        )}
      >
        Services
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div
          id="services-menu"
          className="absolute top-full left-1/2 w-[min(48rem,calc(100vw-4rem))] -translate-x-1/2 animate-[menu-in_0.18s_cubic-bezier(0.22,1,0.36,1)_both] pt-3"
        >
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
            <ul className="grid grid-cols-2 gap-1 p-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-paper">
                    <IconBadge icon={s.icon} size="sm" />
                    <span>
                      <span className="block font-semibold text-navy-900 group-hover:text-teal-700">{s.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-[0.8125rem] leading-snug text-muted">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 border-t border-line bg-paper px-6 py-4">
              <p className="text-sm text-body">
                <span className="font-semibold text-navy-900">Not sure what you need?</span> We&apos;ll recommend the right mix of services.
              </p>
              <div className="flex shrink-0 gap-2">
                <ButtonLink href="/services" variant="outline" size="sm">
                  All services
                </ButtonLink>
                <ButtonLink href="/book-consultation" size="sm">
                  Book a consultation
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const phone = telHref();

  if (!open) return null;
  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      className="h-[calc(100dvh-4rem)] animate-[menu-in_0.18s_ease-out_both] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
    >
      <nav aria-label="Mobile" className="container-page py-4">
        <ul className="divide-y divide-line">
          {mainNav.map((item) =>
            item.href !== "/services" ? (
              <MobileLink key={item.href} {...item} active={isActive(pathname, item.href)} />
            ) : (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  aria-expanded={servicesExpanded}
                  aria-controls="mobile-services"
                  className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-navy-900"
                >
                  Services
                  <ChevronDown className={cn("size-5 transition-transform", servicesExpanded && "rotate-180")} aria-hidden="true" />
                </button>
                {servicesExpanded ? (
                  <ul id="mobile-services" className="animate-[menu-in_0.18s_ease-out_both]">
                    {[{ slug: "", title: "All services", icon: LayoutGrid }, ...services].map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services${s.slug ? `/${s.slug}` : ""}`} className="flex items-center gap-3 rounded-lg px-2 py-2 font-medium text-body hover:bg-paper">
                          <IconBadge icon={s.icon} size="sm" />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                    <li className="h-3" aria-hidden="true" />
                  </ul>
                ) : null}
              </li>
            ),
          )}
        </ul>

        <div className="mt-6 grid gap-3">
          <ButtonLink href="/quote" size="lg">
            Get a Free Quote <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/book-consultation" variant="outline" size="lg">
            Book a Consultation
          </ButtonLink>
          <div className="grid grid-cols-2 gap-3">
            <ButtonLink href={generalWhatsappUrl()} variant="whatsapp" external>
              <WhatsAppIcon /> WhatsApp
            </ButtonLink>
            {phone ? (
              <ButtonLink href={phone} variant="outline">
                <Phone aria-hidden="true" /> Call
              </ButtonLink>
            ) : (
              <span className="flex h-12 items-center justify-center rounded-lg border border-dashed border-line text-sm text-muted">{siteConfig.contact.phone}</span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

function MobileLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <li>
      <Link href={href} aria-current={active ? "page" : undefined} className={cn("block py-4 text-lg font-semibold", active ? "text-teal-700" : "text-navy-900")}>
        {label}
      </Link>
    </li>
  );
}
