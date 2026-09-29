"use client";

import { forwardRef, useId, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/config-utils";

const control =
  "w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 outline-none focus:border-navy-600 focus:ring-4 focus:ring-navy-600/10 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10 disabled:bg-paper";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

/** Label + control + hint/error wiring with the right aria attributes. */
function Field({ label, error, hint, required, className, children }: FieldProps & { children: (ids: { id: string; describedBy?: string }) => ReactNode }) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children({ id, describedBy })}
      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id?: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}

type InputProps = FieldProps & Omit<ComponentProps<"input">, "className">;

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField({ label, error, hint, required, className, ...rest }, ref) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy }) => (
        <input ref={ref} id={id} aria-invalid={!!error} aria-describedby={describedBy} aria-required={required} className={cn(control, "h-12 border-line")} {...rest} />
      )}
    </Field>
  );
});

type SelectProps = FieldProps & Omit<ComponentProps<"select">, "className"> & { options: readonly string[]; placeholder?: string };

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(function SelectField({ label, error, hint, required, className, options, placeholder = "Select…", ...rest }, ref) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy }) => (
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(
            control,
            "h-12 appearance-none border-line bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23667085'%3E%3Cpath d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E\")] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-10",
          )}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
});

type TextareaProps = FieldProps & Omit<ComponentProps<"textarea">, "className">;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(function TextareaField({ label, error, hint, required, className, ...rest }, ref) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy }) => (
        <textarea ref={ref} id={id} rows={5} aria-invalid={!!error} aria-describedby={describedBy} aria-required={required} className={cn(control, "min-h-32 border-line py-3 leading-relaxed")} {...rest} />
      )}
    </Field>
  );
});

/** Group of checkboxes or radios rendered as selectable chips inside a fieldset. */
export function ChoiceGroup({
  legend,
  error,
  required,
  type,
  options,
  columns = "sm:grid-cols-3",
  inputProps,
  className,
}: {
  legend: string;
  error?: string;
  required?: boolean;
  type: "checkbox" | "radio";
  options: readonly string[];
  columns?: string;
  inputProps: Omit<ComponentProps<"input">, "type" | "value">;
  className?: string;
}) {
  const id = useId();
  return (
    <fieldset className={className} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-2 text-sm font-semibold text-ink">
        {legend}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}*
          </span>
        ) : null}
      </legend>
      <div className={cn("grid grid-cols-2 gap-2", columns)}>
        {options.map((o) => (
          <label
            key={o}
            className="group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-navy-600/50 has-[:checked]:border-navy-700 has-[:checked]:bg-navy-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-navy-600/15"
          >
            <input type={type} value={o} className="size-4 shrink-0 accent-navy-800" {...inputProps} />
            {o}
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} error={error} />
    </fieldset>
  );
}

export const ConsentField = forwardRef<HTMLInputElement, { error?: string } & Omit<ComponentProps<"input">, "type">>(function ConsentField({ error, ...rest }, ref) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-4 shrink-0 accent-navy-800"
          {...rest}
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-body">
          I agree that these details may be used to respond to my enquiry, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-navy-700 underline underline-offset-2">
            Privacy Policy
          </Link>
          .<span className="text-danger" aria-hidden="true"> *</span>
        </label>
      </div>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
});

/** Hidden honeypot. Real visitors never see or fill it. */
export function Honeypot(props: ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

export function PrivacyNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 text-xs leading-relaxed text-muted", className)}>
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
      Your details are kept confidential and used only to respond to your enquiry. Please don&apos;t include bank details, passwords or tax identification numbers.
    </p>
  );
}

export function FormAlert({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const Icon = tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
        tone === "error" ? "border-danger/30 bg-danger/5 text-danger" : "border-success/30 bg-success/5 text-success",
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/** The form an event came from (submit event or a button inside the form). */
export function formOf(e?: { target: unknown }): HTMLFormElement | null {
  return e?.target instanceof HTMLElement ? e.target.closest("form") : null;
}

/**
 * react-hook-form onInvalid handler: moves focus to the first invalid field so
 * keyboard and screen-reader users land on the problem.
 */
export function focusFirstInvalid(_errors: unknown, e?: { target: unknown }) {
  const form = formOf(e);
  requestAnimationFrame(() => {
    const el = form?.querySelector<HTMLElement>("[aria-invalid='true']");
    if (!el) return;
    const target = el.tagName === "FIELDSET" ? el.querySelector<HTMLElement>("input") : el;
    target?.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
