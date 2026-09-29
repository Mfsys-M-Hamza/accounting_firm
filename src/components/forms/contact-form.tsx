"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/forms/schemas";
import { contactMethodOptions, serviceOptions } from "@/content/form-options";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ConsentField, FormAlert, Honeypot, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { SuccessPanel } from "./success-panel";
import { useFormSubmit } from "./use-form-submit";

const defaults: Partial<ContactInput> = { name: "", email: "", phone: "", company: "", subject: "", service: "", message: "", contactMethod: "" };

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: defaults, mode: "onTouched" });
  const { status, setStatus, submit, markStarted, honeypot } = useFormSubmit<ContactInput>("contact", setError);

  if (status.state === "success") {
    return (
      <SuccessPanel
        title="Message sent"
        text="Thank you for getting in touch. We aim to reply within one business day using your preferred contact method."
        onReset={() => setStatus({ state: "idle" })}
      />
    );
  }

  return (
    <form
      noValidate
      onFocus={markStarted}
      onSubmit={handleSubmit(
        async (data) => {
          if (await submit(data)) reset(defaults);
        },
        focusFirstInvalid,
      )}
      className="relative space-y-5"
    >
      <Honeypot ref={honeypot} name="website" />
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
      {status.state === "error" ? <FormAlert tone="error">{status.message}</FormAlert> : null}
      <Button type="submit" size="lg" disabled={status.state === "submitting"} className="w-full sm:w-auto">
        {status.state === "submitting" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {status.state === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
