"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Loader2 } from "lucide-react";
import { consultationSchema, type ConsultationInput } from "@/lib/forms/schemas";
import { consultationTimeOptions, consultationTypeOptions, serviceOptions } from "@/content/form-options";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ConsentField, FormAlert, Honeypot, PrivacyNote, SelectField, TextField, TextareaField, focusFirstInvalid } from "./fields";
import { SuccessPanel } from "./success-panel";
import { useFormSubmit } from "./use-form-submit";

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

export function ConsultationForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { ...defaults, service: defaultService ?? "" },
    mode: "onTouched",
  });
  const { status, setStatus, submit, markStarted, honeypot } = useFormSubmit<ConsultationInput>("consultation", setError);

  if (status.state === "success") {
    return (
      <SuccessPanel
        title="Consultation requested"
        text="Thank you. We'll confirm your appointment, or suggest the nearest available time, as soon as possible."
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
      {status.state === "error" ? <FormAlert tone="error">{status.message}</FormAlert> : null}
      <Button type="submit" size="lg" disabled={status.state === "submitting"} className="w-full sm:w-auto">
        {status.state === "submitting" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <CalendarCheck aria-hidden="true" />}
        {status.state === "submitting" ? "Sending…" : "Request Consultation"}
      </Button>
    </form>
  );
}
