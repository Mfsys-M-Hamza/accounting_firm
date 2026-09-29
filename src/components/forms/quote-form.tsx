"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Loader2, Send } from "lucide-react";
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
import { SuccessPanel } from "./success-panel";
import { ChoiceGroup, ConsentField, FormAlert, Honeypot, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid, formOf } from "./fields";
import { useFormSubmit } from "./use-form-submit";

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

export function QuoteForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteData>({ resolver: zodResolver(quoteSchema), defaultValues: defaults, mode: "onTouched" });
  const { status, setStatus, submit, markStarted, honeypot } = useFormSubmit<QuoteInput>("quote", setError);
  const [waLink, setWaLink] = useState<{ url: string; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const sendWhatsapp = handleSubmit((data) => {
    const text = buildQuoteMessage(data);
    const url = whatsappUrl(text);
    setWaLink({ url, text });
    openWhatsapp(url);
  }, focusFirstInvalid);

  const sendOnline = handleSubmit(async (data, e) => {
    // The success panel replaces the form, so bring its container back into view.
    const container = formOf(e)?.parentElement;
    if (await submit(data)) {
      reset(defaults);
      container?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, focusFirstInvalid);

  if (status.state === "success") {
    return (
      <SuccessPanel
        title="Quote request received"
        text="Thank you. A member of our team will review your requirements and contact you using your preferred method."
        onReset={() => setStatus({ state: "idle" })}
      />
    );
  }

  return (
    <form noValidate onFocus={markStarted} onSubmit={sendOnline} className="relative space-y-8" aria-describedby="quote-required-note">
      <Honeypot ref={honeypot} name="website" />
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

      {status.state === "error" ? <FormAlert tone="error">{status.message}</FormAlert> : null}

      {waLink ? (
        <FormAlert tone="success">
          <p className="font-semibold">WhatsApp has been opened with your quote details.</p>
          <p className="mt-1 text-body">
            Review the message and press <strong>Send</strong> in WhatsApp to deliver it — nothing is sent until you do. If WhatsApp didn&apos;t open,{" "}
            <a href={waLink.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              open it here
            </a>{" "}
            or{" "}
            <button
              type="button"
              className="inline-flex items-center gap-1 font-semibold underline"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(waLink.text);
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
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="whatsapp" size="lg" onClick={sendWhatsapp} className="sm:flex-1">
          <WhatsAppIcon />
          Send Quote Request via WhatsApp
        </Button>
        <Button type="submit" variant="primary" size="lg" disabled={status.state === "submitting"} className="sm:flex-1">
          {status.state === "submitting" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {status.state === "submitting" ? "Sending…" : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
}
