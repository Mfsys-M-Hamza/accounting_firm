import { Building2, Phone, Video } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/motion/motion";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { IconBadge } from "@/components/icons/icon-badge";

export const metadata = buildMetadata({
  title: "Book a Consultation",
  description: "Book a phone call, video meeting or office meeting with our audit, accounting and tax professionals at a time that suits you.",
  path: "/book-consultation",
});

const types = [
  { icon: Phone, title: "Phone call", text: "A quick, convenient conversation about your needs." },
  { icon: Video, title: "Video meeting", text: "Meet face to face online and share documents on screen." },
  { icon: Building2, title: "Office meeting", text: "Visit our office for an in-depth discussion." },
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Book a consultation"
        intro="Choose how and when you'd like to meet. We'll confirm your appointment or suggest the nearest available time."
        crumbs={[{ name: "Book a Consultation", href: "/book-consultation" }]}
        illustration="consultation"
      />

      <section aria-label="Consultation booking" className="bg-paper py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem]">
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10">
              <h2 className="mb-6 text-2xl font-semibold">Your consultation details</h2>
              <ConsultationForm />
            </div>
          </Reveal>
          <Reveal direction="left">
            <aside className="space-y-4 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Consultation options</h2>
              {types.map((t) => (
                <div key={t.title} className="group flex gap-4 rounded-3xl border border-line bg-white p-5">
                  <IconBadge icon={t.icon} size="sm" />
                  <div>
                    <p className="font-semibold text-ink">{t.title}</p>
                    <p className="mt-1 text-sm text-body">{t.text}</p>
                  </div>
                </div>
              ))}
              <p className="px-1 text-sm text-muted">Initial consultations help us understand your needs so we can recommend the right services and provide an accurate quote.</p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
