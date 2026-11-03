"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { callbackSchema, type CallbackData, type CallbackInput } from "@/lib/forms/schemas";
import { buildCallbackMessage } from "@/lib/forms/quote-message";
import { openWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { businessTypeOptions, serviceOptions } from "@/content/form-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ConsentField, FormAlert, Honeypot, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { WhatsappNotice, type WhatsappLink } from "./whatsapp-notice";
import { useBotGuard } from "./use-bot-guard";

const defaults: Partial<CallbackInput> = { name: "", email: "", phone: "", businessType: "", service: "", message: "" };

/**
 * Short enquiry / callback form used in CTA sections. Sends the request via
 * WhatsApp: after validation it opens WhatsApp with the details pre-filled,
 * then replaces the form with a thank-you state.
 */
export function CallbackForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackInput, unknown, CallbackData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { ...defaults, service: defaultService ?? "" },
    mode: "onTouched",
  });
  const [sent, setSent] = useState<{ name: string; link: WhatsappLink } | null>(null);
  const { honeypot, markStarted, allow, error: guardError } = useBotGuard();

  const send = handleSubmit((data) => {
    if (!allow()) return;
    const text = buildCallbackMessage(data);
    const url = whatsappUrl(text);
    setSent({ name: data.name.split(" ")[0], link: { url, text } });
    trackEvent("generate_lead", { form: "enquiry" });
    openWhatsapp(url);
  }, focusFirstInvalid);

  if (sent) {
    return (
      <div role="status" className="rounded-xl bg-white p-6 shadow-lift sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xl font-bold text-navy-900">Thank you, {sent.name}.</p>
        <p className="mt-2 text-body">Your enquiry is ready in WhatsApp. Once you press Send there, a member of our team will get back to you.</p>
        <div className="mt-5">
          <WhatsappNotice key={sent.link.url} link={sent.link} what="your enquiry" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            reset({ ...defaults, service: defaultService ?? "" });
            setSent(null);
          }}
        >
          <RotateCcw aria-hidden="true" /> Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={send} onFocus={markStarted} className="space-y-4 rounded-xl bg-white p-5 shadow-lift sm:p-6">
      <Honeypot ref={honeypot} name="website" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField label="Phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Business type" required options={businessTypeOptions} error={errors.businessType?.message} {...register("businessType")} />
        <SelectField label="Service required" required options={serviceOptions} className="sm:col-span-2" error={errors.service?.message} {...register("service")} />
        <TextareaField label="Message" rows={3} className="sm:col-span-2" error={errors.message?.message} {...register("message")} />
      </div>
      <ConsentField error={errors.consent?.message} {...register("consent")} />
      {guardError ? <FormAlert tone="error">{guardError}</FormAlert> : null}
      <Button type="submit" variant="whatsapp" size="lg" className="w-full">
        <WhatsAppIcon />
        Send Enquiry via WhatsApp
      </Button>
    </form>
  );
}
