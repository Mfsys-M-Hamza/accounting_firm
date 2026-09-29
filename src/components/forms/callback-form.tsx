"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PhoneCall } from "lucide-react";
import { callbackSchema, type CallbackInput } from "@/lib/forms/schemas";
import { callbackTimeOptions, serviceOptions } from "@/content/form-options";
import { Button } from "@/components/ui/button";
import { ConsentField, FormAlert, Honeypot, SelectField, TextField, focusFirstInvalid } from "./fields";
import { useFormSubmit } from "./use-form-submit";

const defaults: Partial<CallbackInput> = { name: "", phone: "", preferredTime: "", service: "" };

/** Compact "Request a callback" form used in CTA sections. */
export function CallbackForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CallbackInput>({ resolver: zodResolver(callbackSchema), defaultValues: { ...defaults, service: defaultService ?? "" }, mode: "onTouched" });
  const { status, setStatus, submit, markStarted, honeypot } = useFormSubmit<CallbackInput>("callback", setError);

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-6 text-center">
        <p className="font-display text-xl font-semibold text-ink">Thank you — we&apos;ll call you back.</p>
        <p className="mt-2 text-sm text-body">A member of our team will call at your preferred time.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-4 text-sm font-semibold text-navy-700 underline underline-offset-2">
          Request another callback
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onFocus={markStarted}
      onSubmit={handleSubmit(
        async (data) => {
          if (await submit(data)) reset({ ...defaults, service: defaultService ?? "" });
        },
        focusFirstInvalid,
      )}
      className="relative space-y-4 rounded-2xl bg-white p-5 shadow-lift sm:p-6"
    >
      <Honeypot ref={honeypot} name="website" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Preferred time" required options={callbackTimeOptions} error={errors.preferredTime?.message} {...register("preferredTime")} />
        <SelectField label="Service" required options={serviceOptions} error={errors.service?.message} {...register("service")} />
      </div>
      <ConsentField error={errors.consent?.message} {...register("consent")} />
      {status.state === "error" ? <FormAlert tone="error">{status.message}</FormAlert> : null}
      <Button type="submit" variant="gold" size="lg" disabled={status.state === "submitting"} className="w-full">
        {status.state === "submitting" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <PhoneCall aria-hidden="true" />}
        {status.state === "submitting" ? "Sending…" : "Call Me Back"}
      </Button>
    </form>
  );
}
