"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { FriendshipArt, Spark } from "@/components/brand/coffee-art";
import { primaryButton, secondaryButton } from "@/components/ui/button";
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "./validation";
import type { Messages } from "@/i18n/types";
const inputClass =
  "w-full min-w-0 rounded-2xl border border-control bg-canvas px-4 py-3.5 text-base leading-relaxed text-ink placeholder:text-muted aria-invalid:border-copper focus:border-olive";
export function ContactForm({ copy }: { copy: Messages["contact"] }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [complete, setComplete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const didSubmit = useRef(false);
  useEffect(() => {
    if (complete) statusRef.current?.focus();
    else if (didSubmit.current)
      formRef.current
        ?.querySelector<HTMLInputElement>("#contact-name")
        ?.focus();
  }, [complete]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const nextErrors = validateContact(values);
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!nextErrors.email && emailInput.validity.typeMismatch)
      nextErrors.email = "invalid_email";
    setErrors(nextErrors);
    const firstInvalid = (
      Object.keys(nextErrors) as (keyof ContactValues)[]
    )[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement)?.focus();
      return;
    }
    didSubmit.current = true;
    form.reset();
    setComplete(true);
  }
  const fields = [
    {
      name: "name",
      label: copy.name,
      placeholder: copy.namePlaceholder,
      type: "text",
      autoComplete: "name",
      error: copy.errors.nameRequired,
      maxLength: 100,
    },
    {
      name: "email",
      label: copy.email,
      placeholder: copy.emailPlaceholder,
      type: "email",
      autoComplete: "email",
      error:
        errors.email === "invalid_email"
          ? copy.errors.emailInvalid
          : copy.errors.emailRequired,
      maxLength: 254,
    },
  ] as const;
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-line pb-6">
        <Spark className="size-10 shrink-0 text-olive" />
        <p
          className="max-w-sm text-xs leading-relaxed text-muted"
          id="form-demo-note"
        >
          {copy.note}
        </p>
      </div>
      <noscript>
        <p className="text-sm text-muted">{copy.noJs}</p>
        <style>{`.contact-form { display: none; }`}</style>
      </noscript>
      {complete ? (
        <div className="py-5" role="status" tabIndex={-1} ref={statusRef}>
          <FriendshipArt className="mx-auto mb-5 h-36 w-48 text-olive" />
          <h3 className="text-3xl leading-tight">{copy.successTitle}</h3>
          <p className="mt-5 text-base leading-[1.8] text-muted">
            {copy.successBody}
          </p>
          <button
            type="button"
            className={`${secondaryButton} mt-7`}
            onClick={() => {
              setErrors({});
              setComplete(false);
            }}
          >
            {copy.reset}
            <ArrowIcon />
          </button>
        </div>
      ) : (
        <form
          className="contact-form space-y-6"
          aria-label={copy.formLabel}
          aria-describedby="form-demo-note"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor={`contact-${field.name}`}
              >
                {field.label}{" "}
                <span className="text-copper" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                className={inputClass}
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                maxLength={field.maxLength}
                required
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
              />
              {errors[field.name] && (
                <p
                  className="mt-2 text-sm leading-relaxed text-ink"
                  id={`${field.name}-error`}
                  role="alert"
                >
                  {field.error}
                </p>
              )}
            </div>
          ))}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor="contact-message"
            >
              {copy.message}{" "}
              <span className="text-copper" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              className={`${inputClass} min-h-36 resize-y`}
              id="contact-message"
              name="message"
              rows={4}
              maxLength={2000}
              required
              placeholder={copy.messagePlaceholder}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p
                className="mt-2 text-sm leading-relaxed text-ink"
                id="message-error"
                role="alert"
              >
                {copy.errors.messageRequired}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <span className="text-xs text-muted">* {copy.required}</span>
            <button className={primaryButton} type="submit">
              {copy.submit}
              <ArrowIcon />
            </button>
          </div>
        </form>
      )}
    </>
  );
}
