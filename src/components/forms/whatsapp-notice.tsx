"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { FormAlert } from "./fields";

export interface WhatsappLink {
  url: string;
  text: string;
}

/** Confirmation shown after a form opens WhatsApp, with fallbacks if WhatsApp didn't open. */
export function WhatsappNotice({ link, what = "your message" }: { link: WhatsappLink; what?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <FormAlert tone="success">
      <p className="font-semibold">WhatsApp has been opened with {what}.</p>
      <p className="mt-1 text-body">
        Review it and press <strong>Send</strong> in WhatsApp to deliver it — nothing is sent until you do. If WhatsApp didn&apos;t open,{" "}
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          open it here
        </a>{" "}
        or{" "}
        <button
          type="button"
          className="inline-flex items-center gap-1 font-semibold underline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(link.text);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          <Copy className="size-3.5" aria-hidden="true" />
          {copied ? "copied" : "copy the message"}
        </button>
        .
      </p>
    </FormAlert>
  );
}
