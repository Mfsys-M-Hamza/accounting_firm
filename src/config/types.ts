export type SocialPlatform = "linkedin" | "facebook" | "x" | "instagram" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  /** Leave as "" (or a [PLACEHOLDER]) to hide the icon. */
  url: string;
}

export interface BusinessHoursRow {
  days: string;
  hours: string;
}

export interface Statistic {
  label: string;
  /** Real, verified number supplied by the firm. Leave null until then. */
  value: number | null;
  suffix?: string;
  /** Text shown while `value` is null, e.g. "[XX]". */
  placeholder: string;
}

export interface TeamMember {
  name: string;
  position: string;
  qualification: string;
  specialization: string;
  bio: string;
  linkedin: string;
  /** Path under /public, e.g. "/team/jane.webp". Leave "" to show initials. */
  photo: string;
  /** true until real details are supplied; renders a "Sample profile" label. */
  placeholder: boolean;
}

export interface Testimonial {
  name: string;
  company: string;
  position: string;
  review: string;
  /** 1–5. Never shown in structured data. */
  rating: number;
  photo?: string;
  /** true for sample content; renders a visible "Sample testimonial" label. */
  placeholder: boolean;
}

export interface Certification {
  name: string;
  /** Membership / registration number, if the firm wants it displayed. */
  reference?: string;
  url?: string;
}

export interface SiteConfig {
  companyName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Production origin, no trailing slash. NEXT_PUBLIC_SITE_URL overrides this. */
  siteUrl: string;
  logo: { src: string; alt: string; width: number; height: number } | null;
  locale: string;
  contact: {
    phone: string;
    /** International format, digits only once configured, e.g. "447700900123". */
    whatsapp: string;
    email: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
    /** Google Maps "Embed a map" src URL. Leave "" to show a placeholder panel. */
    mapEmbedUrl: string;
    businessHours: BusinessHoursRow[];
  };
  regulatoryBody: string;
  yearsOfExperience: string;
  numberOfClients: string;
  teamSize: string;
  socialLinks: SocialLink[];
  statistics: Statistic[];
  team: TeamMember[];
  testimonials: Testimonial[];
  certifications: Certification[];
  whatsappMessages: {
    general: string;
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    twitterHandle: string;
  };
  /** Switch sections off without touching components. */
  features: {
    showStatistics: boolean;
    showTestimonials: boolean;
    showTeam: boolean;
    floatingWhatsApp: boolean;
  };
}
