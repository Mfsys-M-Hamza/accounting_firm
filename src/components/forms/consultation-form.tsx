"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationSchema, type ConsultationData, type ConsultationInput } from "@/lib/forms/schemas";
import { buildConsultationMessage } from "@/lib/forms/quote-message";
import { openWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { consultationTimeOptions, consultationTypeOptions, serviceOptions } from "@/content/form-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ConsentField, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { WhatsappNotice, type WhatsappLink } from "./whatsapp-notice";

const defaults: Partial<ConsultationInput> = { name: "", company: "", email: "", phone: "", service: "", consultationType: "", date: "", time: "", message: "" };

/** Local calendar date as YYYY-MM-DD (toISOString would shift to UTC). */
function localDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Sets the picker range on first focus, in the visitor's own time zone (avoids a server/client mismatch). */
function setDateBounds(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.min = localDate(0);
  e.currentTarget.max = localDate(180);
}

/** Consultation booking form. Sends the request via WhatsApp with the details pre-filled. */
export function ConsultationForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationInput, unknown, ConsultationData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { ...defaults, service: defaultService ?? "" },
    mode: "onTouched",
  });
  const [waLink, setWaLink] = useState<WhatsappLink | null>(null);

  const send = handleSubmit((data) => {
    const text = buildConsultationMessage(data);
    const url = whatsappUrl(text);
    setWaLink({ url, text });
    openWhatsapp(url);
  }, focusFirstInvalid);

  return (
    <form noValidate onSubmit={send} className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <TextField label="Email" type="email" required autoComplete="email" inputMode="email" error={errors.email?.message} {...register("email")} />
        <TextField label="Phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register("phone")} />
      </div>
      <SelectField label="Service" required options={serviceOptions} error={errors.service?.message} {...register("service")} />
      <ChoiceGroup legend="Consultation type" required type="radio" options={consultationTypeOptions} error={errors.consultationType?.message} inputProps={register("consultationType")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Preferred date" type="date" required onFocus={setDateBounds} error={errors.date?.message} hint="Weekdays are usually easiest to schedule." {...register("date")} />
        <SelectField label="Preferred time" required options={consultationTimeOptions} error={errors.time?.message} {...register("time")} />
      </div>
      <TextareaField label="What would you like to discuss?" error={errors.message?.message} {...register("message")} />
      <ConsentField error={errors.consent?.message} {...register("consent")} />
      <PrivacyNote />
      {waLink ? <WhatsappNotice key={waLink.url} link={waLink} what="your consultation request" /> : null}
      <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
        <WhatsAppIcon />
        Request Consultation via WhatsApp
      </Button>
    </form>
  );
}
