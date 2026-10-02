"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { callbackSchema, type CallbackData, type CallbackInput } from "@/lib/forms/schemas";
import { buildCallbackMessage } from "@/lib/forms/quote-message";
import { openWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { callbackTimeOptions, serviceOptions } from "@/content/form-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ConsentField, SelectField, TextField, focusFirstInvalid } from "./fields";
import { WhatsappNotice, type WhatsappLink } from "./whatsapp-notice";

const defaults: Partial<CallbackInput> = { name: "", phone: "", preferredTime: "", service: "" };

/**
 * Compact "Request a callback" form used in CTA sections. Sends the request via
 * WhatsApp: after validation it opens WhatsApp with the details pre-filled.
 */
export function CallbackForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CallbackInput, unknown, CallbackData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { ...defaults, service: defaultService ?? "" },
    mode: "onTouched",
  });
  const [waLink, setWaLink] = useState<WhatsappLink | null>(null);

  const send = handleSubmit((data) => {
    const text = buildCallbackMessage(data);
    const url = whatsappUrl(text);
    setWaLink({ url, text });
    openWhatsapp(url);
  }, focusFirstInvalid);

  return (
    <form noValidate onSubmit={send} className="relative space-y-4 rounded-2xl bg-white p-5 shadow-lift sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Preferred time" required options={callbackTimeOptions} error={errors.preferredTime?.message} {...register("preferredTime")} />
        <SelectField label="Service" required options={serviceOptions} error={errors.service?.message} {...register("service")} />
      </div>
      <ConsentField error={errors.consent?.message} {...register("consent")} />
      {waLink ? <WhatsappNotice key={waLink.url} link={waLink} what="your callback request" /> : null}
      <Button type="submit" variant="whatsapp" size="lg" className="w-full">
        <WhatsAppIcon />
        Request Callback via WhatsApp
      </Button>
    </form>
  );
}
