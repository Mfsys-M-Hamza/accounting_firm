import { siteConfig } from "@/config/site";
import { isConfigured } from "./config-utils";

/**
 * Builds a click-to-chat link. Nothing is ever sent automatically: the link only
 * opens WhatsApp (app on mobile, WhatsApp Web/Desktop on computers) with the
 * message pre-filled, and the visitor chooses whether to press send.
 *
 * While the number is still a placeholder the link opens WhatsApp without a
 * recipient, so the template remains testable.
 */
export function whatsappUrl(message: string, number = siteConfig.contact.whatsapp): string {
  const digits = isConfigured(number) ? number.replace(/\D/g, "") : "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const generalWhatsappUrl = () => whatsappUrl(siteConfig.whatsappMessages.general);

/**
 * Opens WhatsApp in a new tab. Some browsers (notably iOS Safari) block
 * window.open after an async step such as form validation, so fall back to
 * navigating the current tab.
 */
export function openWhatsapp(url: string): void {
  // Not passing "noopener" as a feature: that makes window.open return null,
  // which is indistinguishable from a blocked popup. Detach the opener instead.
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}
