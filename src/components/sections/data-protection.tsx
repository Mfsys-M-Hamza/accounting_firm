import Link from "next/link";
import { ArrowRight, FileLock2, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/motion";
import { cn } from "@/lib/config-utils";

// Every point must stay consistent with the privacy policy (src/app/privacy-policy/page.tsx).
const points = [
  { icon: LockKeyhole, title: "Need-to-know access", text: "Your records are seen only by the people working on your account." },
  { icon: ShieldCheck, title: "Secure systems", text: "Encrypted connections, access controls and secure systems protect your data." },
  { icon: KeyRound, title: "No sensitive data on forms", text: "We never ask for bank details, passwords or tax reference numbers through this website." },
  { icon: FileLock2, title: "Never sold", text: "We don't sell personal information and share it only where needed to provide our service or by law." },
];

/**
 * Concise explanation of how client information is protected (trust item in
 * the website brief). Pass `onPaper` when the surrounding section is already grey.
 */
export function DataProtection({ className, onPaper = false }: { className?: string; onPaper?: boolean }) {
  return (
    <Reveal className={className}>
      <div className={cn("rounded-xl border border-line p-6 sm:p-8", onPaper ? "bg-white" : "bg-paper")}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-xl font-bold">How we protect your information</h3>
            <p className="mt-1.5 text-body">Financial records deserve careful handling. Here&apos;s what that means in practice.</p>
          </div>
          <Link href="/privacy-policy" className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800">
            Read our privacy policy <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-teal-600" strokeWidth={1.75} aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                <span className="block font-bold text-navy-900">{title}</span>
                <span className="text-body">{text}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
