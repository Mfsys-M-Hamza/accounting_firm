import { siteConfig } from "@/config/site";
import { generalWhatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

/**
 * Floating click-to-chat button, shown on every page. Sits in the bottom-right
 * corner clear of content, respects iOS safe areas and reveals a label on
 * hover/focus (desktop). wa.me opens the WhatsApp app on phones and
 * WhatsApp Web/Desktop on computers.
 */
export function FloatingWhatsApp() {
  if (!siteConfig.features.floatingWhatsApp) return null;

  return (
    <a
      href={generalWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="floating-whatsapp group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex animate-[fade-up_0.6s_0.8s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lift transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_0_#0e5a2b,0_16px_30px_-8px_rgb(21_128_61/0.6)] transition-transform duration-300 group-hover:-translate-y-1">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-25 [animation-duration:2.5s] motion-reduce:hidden" aria-hidden="true" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
