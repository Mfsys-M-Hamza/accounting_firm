"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, ChevronDown, Clock3, Mail, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { services } from "@/content/services";
import { cn, mailtoHref, telHref } from "@/lib/config-utils";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { Illustration } from "@/components/icons/illustrations";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const solid = scrolled || menuOpen;
  const phone = telHref();
  const email = mailtoHref();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar (desktop) */}
      <div className={cn("hidden overflow-hidden bg-navy-950 text-white/70 transition-[height,opacity] duration-300 lg:block", scrolled ? "h-0 opacity-0" : "h-10 opacity-100")}>
        <div className="container-page flex h-10 items-center justify-between text-[0.8125rem]">
          <div className="flex items-center gap-6">
            <a href={phone} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Phone className="size-3.5 text-gold-400" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
            <a href={email} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Mail className="size-3.5 text-gold-400" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </div>
          <p className="flex items-center gap-2">
            <Clock3 className="size-3.5 text-gold-400" aria-hidden="true" />
            {siteConfig.contact.businessHours[0].days}: {siteConfig.contact.businessHours[0].hours}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          solid ? "border-line bg-white/95 shadow-[0_8px_30px_-12px_rgb(28_27_107/0.18)] backdrop-blur-md" : "border-white/10 bg-transparent",
        )}
      >
        <div className={cn("container-page flex items-center justify-between gap-4 transition-[height] duration-300", scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-20")}>
          <Logo light={!solid} className="max-w-[70%] lg:max-w-none" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.slice(0, 2).map((item) => (
                <NavLink key={item.href} {...item} solid={solid} active={isActive(pathname, item.href)} />
              ))}
              <li>
                <ServicesMenu solid={solid} open={servicesOpen} setOpen={setServicesOpen} active={pathname.startsWith("/services")} />
              </li>
              {mainNav.slice(2).map((item) => (
                <NavLink key={item.href} {...item} solid={solid} active={isActive(pathname, item.href)} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink href="/quote" variant={solid ? "primary" : "gold"} size="sm">
                Get a Quote
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn("flex size-11 items-center justify-center rounded-full transition-colors lg:hidden", solid ? "text-navy-900 hover:bg-navy-50" : "text-white hover:bg-white/10")}
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}

function NavLink({ label, href, solid, active }: { label: string; href: string; solid: boolean; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gold-500 after:transition-transform after:duration-300 hover:after:scale-x-100",
          active && "after:scale-x-100",
          solid ? "text-navy-900" : "text-white/90 hover:text-white",
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function ServicesMenu({ solid, open, setOpen, active }: { solid: boolean; open: boolean; setOpen: (v: boolean) => void; active: boolean }) {
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
          "flex items-center gap-1 rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors",
          solid ? "text-navy-900" : "text-white/90 hover:text-white",
          active && "text-gold-600",
          active && !solid && "text-gold-400",
        )}
      >
        Services
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open ? (
          <m.div
            id="services-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 w-[min(56rem,calc(100vw-4rem))] -translate-x-1/2 pt-4"
          >
            <div className="grid grid-cols-[1fr_15rem] overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <ul className="grid grid-cols-2 gap-1 p-4">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-paper">
                      <Illustration name={s.illustration} className="size-12 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-navy-700">{s.title}</span>
                        <span className="mt-0.5 line-clamp-2 block text-[0.8125rem] leading-snug text-muted">{s.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between bg-navy-900 p-6 text-white">
                <div>
                  <p className="font-display text-xl font-semibold">Not sure what you need?</p>
                  <p className="mt-2 text-sm text-white/70">Tell us about your business and we&apos;ll recommend the right mix of services.</p>
                </div>
                <div className="mt-6 space-y-2">
                  <ButtonLink href="/services" variant="outline-light" size="sm" className="w-full">
                    All services
                  </ButtonLink>
                  <ButtonLink href="/book-consultation" variant="gold" size="sm" className="w-full">
                    Book a consultation
                  </ButtonLink>
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
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

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="divide-y divide-line">
              {mainNav.slice(0, 2).map((item) => (
                <MobileLink key={item.href} {...item} active={isActive(pathname, item.href)} />
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  aria-expanded={servicesExpanded}
                  aria-controls="mobile-services"
                  className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-semibold text-ink"
                >
                  Services
                  <ChevronDown className={cn("size-5 transition-transform", servicesExpanded && "rotate-180")} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {servicesExpanded ? (
                    <m.ul
                      id="mobile-services"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {[{ slug: "", title: "All services", illustration: "reporting" as const }, ...services].map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services${s.slug ? `/${s.slug}` : ""}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 font-medium text-body hover:bg-paper">
                            <Illustration name={s.illustration} className="size-9" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" aria-hidden="true" />
                    </m.ul>
                  ) : null}
                </AnimatePresence>
              </li>
              {mainNav.slice(2).map((item) => (
                <MobileLink key={item.href} {...item} active={isActive(pathname, item.href)} />
              ))}
              <MobileLink label="FAQs" href="/faqs" active={isActive(pathname, "/faqs")} />
            </ul>

            <div className="mt-8 grid gap-3">
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
                  <span className="flex h-12 items-center justify-center rounded-full border border-dashed border-line text-sm text-muted">{siteConfig.contact.phone}</span>
                )}
              </div>
            </div>
          </nav>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

function MobileLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <li>
      <Link href={href} aria-current={active ? "page" : undefined} className={cn("block py-4 font-display text-xl font-semibold", active ? "text-gold-600" : "text-ink")}>
        {label}
      </Link>
    </li>
  );
}
