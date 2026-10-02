import { siteConfig } from "@/config/site";

/** A config value is "unset" while it is empty or still contains a [PLACEHOLDER]. */
export function isConfigured(value: string | null | undefined): value is string {
  return !!value && value.trim() !== "" && !/\[[^\]]+\]/.test(value);
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl).replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function telHref(phone = siteConfig.contact.phone): string | undefined {
  if (!isConfigured(phone)) return undefined;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailtoHref(email = siteConfig.contact.email): string | undefined {
  return isConfigured(email) ? `mailto:${email}` : undefined;
}

/** WhatsApp number for display: reuses the formatted phone when it is the same number, else "+<digits>". */
export function whatsappDisplay(): string {
  const { whatsapp, phone } = siteConfig.contact;
  if (!isConfigured(whatsapp)) return whatsapp;
  const digits = whatsapp.replace(/\D/g, "");
  if (isConfigured(phone) && phone.replace(/\D/g, "") === digits) return phone;
  return `+${digits}`;
}

export function formattedAddress(): string {
  const a = siteConfig.contact.address;
  return [a.street, a.city, a.region, a.postalCode, a.country].filter((v) => v && v.trim()).join(", ");
}

export function configuredSocialLinks() {
  return siteConfig.socialLinks.filter((s) => isConfigured(s.url));
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
