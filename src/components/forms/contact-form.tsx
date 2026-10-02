"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactData, type ContactInput } from "@/lib/forms/schemas";
import { buildContactMessage } from "@/lib/forms/quote-message";
import { openWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { contactMethodOptions, serviceOptions } from "@/content/form-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ConsentField, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { WhatsappNotice, type WhatsappLink } from "./whatsapp-notice";

const defaults: Partial<ContactInput> = { name: "", email: "", phone: "", company: "", subject: "", service: "", message: "", contactMethod: "" };

/**
 * Contact form that sends the enquiry via WhatsApp: after validation it opens
 * WhatsApp with the details pre-filled. Nothing is sent until the visitor
 * presses Send in WhatsApp.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({ resolver: zodResolver(contactSchema), defaultValues: defaults, mode: "onTouched" });
  const [waLink, setWaLink] = useState<WhatsappLink | null>(null);

  const send = handleSubmit((data) => {
    const text = buildContactMessage(data);
    const url = whatsappUrl(text);
    setWaLink({ url, text });
    openWhatsapp(url);
  }, focusFirstInvalid);

  return (
    <form noValidate onSubmit={send} className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Email" type="email" required autoComplete="email" inputMode="email" error={errors.email?.message} {...register("email")} />
        <TextField label="Phone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register("phone")} />
        <TextField label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <TextField label="Subject" required error={errors.subject?.message} {...register("subject")} />
        <SelectField label="Service" options={serviceOptions} error={errors.service?.message} {...register("service")} />
      </div>
      <TextareaField label="Message" required error={errors.message?.message} {...register("message")} />
      <ChoiceGroup legend="Preferred contact method" required type="radio" options={contactMethodOptions} error={errors.contactMethod?.message} inputProps={register("contactMethod")} />
      <ConsentField error={errors.consent?.message} {...register("consent")} />
      <PrivacyNote />

      {waLink ? <WhatsappNotice key={waLink.url} link={waLink} what="your message" /> : null}

      <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
        <WhatsAppIcon />
        Send Message via WhatsApp
      </Button>
    </form>
  );
}
