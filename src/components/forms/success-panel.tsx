"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export function SuccessPanel({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-center rounded-3xl border border-success/20 bg-success/5 px-6 py-12 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success text-white shadow-[0_5px_0_#0f5a38]">
        <CheckCircle2 className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 font-display text-2xl font-semibold text-ink">{title}</p>
      <p className="mt-3 max-w-md text-body">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" variant="outline" onClick={onReset}>
          <RotateCcw aria-hidden="true" />
          Send another request
        </Button>
        <ButtonLink href="/resources" variant="ghost">
          Browse our guides
        </ButtonLink>
      </div>
    </div>
  );
}
