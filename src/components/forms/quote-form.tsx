"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteData, type QuoteInput } from "@/lib/forms/schemas";
import { buildQuoteMessage } from "@/lib/forms/quote-message";
import { openWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import {
  businessTypeOptions,
  contactMethodOptions,
  contactTimeOptions,
  employeeOptions,
  industryOptions,
  quoteServiceOptions,
  turnoverOptions,
} from "@/content/form-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ConsentField, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { WhatsappNotice, type WhatsappLink } from "./whatsapp-notice";

const defaults: Partial<QuoteInput> = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  businessType: "",
  industry: "",
  services: [],
  turnover: "",
  employees: "",
  existingAccountant: "",
  contactMethod: "",
  contactTime: "",
  message: "",
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="mb-5 flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-400">{n}</span>
        <span className="font-display text-xl font-semibold text-ink">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

/** Quote requests are sent via WhatsApp only — there is no online submission (the site is statically hosted). */
export function QuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteData>({ resolver: zodResolver(quoteSchema), defaultValues: defaults, mode: "onTouched" });
  const [waLink, setWaLink] = useState<WhatsappLink | null>(null);

  const sendWhatsapp = handleSubmit((data) => {
    const text = buildQuoteMessage(data);
    const url = whatsappUrl(text);
    setWaLink({ url, text });
    openWhatsapp(url);
  }, focusFirstInvalid);

  return (
    <form noValidate onSubmit={sendWhatsapp} className="relative space-y-8" aria-describedby="quote-required-note">
      <p id="quote-required-note" className="text-sm text-muted">
        Fields marked <span className="text-danger">*</span> are required. It takes about two minutes.
      </p>

      <Step n={1} title="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
          <TextField label="Business name" autoComplete="organization" error={errors.businessName?.message} {...register("businessName")} />
          <TextField label="Email" type="email" required autoComplete="email" inputMode="email" error={errors.email?.message} {...register("email")} />
          <TextField label="Phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+" error={errors.phone?.message} {...register("phone")} />
          <TextField label="Country" required autoComplete="country-name" error={errors.country?.message} {...register("country")} />
          <TextField label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
        </div>
      </Step>

      <Step n={2} title="Your business">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField label="Business type" required options={businessTypeOptions} error={errors.businessType?.message} {...register("businessType")} />
          <SelectField label="Industry" options={industryOptions} error={errors.industry?.message} {...register("industry")} />
          <SelectField label="Annual turnover range" required options={turnoverOptions} hint="A broad range is enough — no exact figures needed." error={errors.turnover?.message} {...register("turnover")} />
          <SelectField label="Number of employees" required options={employeeOptions} error={errors.employees?.message} {...register("employees")} />
        </div>
        <ChoiceGroup
          className="mt-5"
          legend="Do you currently have an accountant?"
          required
          type="radio"
          options={["Yes", "No"]}
          columns="sm:grid-cols-2 max-w-sm"
          error={errors.existingAccountant?.message}
          inputProps={register("existingAccountant")}
        />
      </Step>

      <Step n={3} title="Services required">
        <ChoiceGroup legend="Select all that apply" required type="checkbox" options={quoteServiceOptions} error={errors.services?.message} inputProps={register("services")} />
      </Step>

      <Step n={4} title="Contact preferences">
        <div className="grid gap-5 sm:grid-cols-2">
          <ChoiceGroup legend="Preferred contact method" required type="radio" options={contactMethodOptions} error={errors.contactMethod?.message} inputProps={register("contactMethod")} className="sm:col-span-2" />
          <SelectField label="Preferred contact time" options={contactTimeOptions} error={errors.contactTime?.message} {...register("contactTime")} />
        </div>
        <TextareaField
          className="mt-5"
          label="Message / requirements"
          placeholder="Tell us about deadlines, current software, number of transactions per month or anything else that will help us prepare an accurate quote."
          error={errors.message?.message}
          {...register("message")}
        />
      </Step>

      <div className="space-y-5 rounded-2xl bg-paper p-5 sm:p-6">
        <ConsentField error={errors.consent?.message} {...register("consent")} />
        <PrivacyNote />
      </div>

      {waLink ? <WhatsappNotice key={waLink.url} link={waLink} what="your quote details" /> : null}

      <Button type="submit" variant="whatsapp" size="lg" className="w-full">
        <WhatsAppIcon />
        Send Quote Request via WhatsApp
      </Button>
    </form>
  );
}
