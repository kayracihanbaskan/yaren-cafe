"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowIcon, Motif } from "@/components/ui/icons";
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "./validation";

export function ContactForm() {
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
      nextErrors.email = "Geçerli bir e-posta adresi yazabilir misin?";
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

  return (
    <>
      <p className="form-note" id="form-demo-note">
        Küçük bir tanışma provası. Bu örnek form mesaj göndermez ve bilgilerini
        kaydetmez.
      </p>
      <noscript>
        <p className="form-note">
          Formu kullanmak için JavaScript’i etkinleştirebilirsin.
        </p>
        <style>{`.contact-form { display: none; }`}</style>
      </noscript>
      {complete ? (
        <div
          className="form-success"
          role="status"
          tabIndex={-1}
          ref={statusRef}
        >
          <Motif />
          <h3>Mesajın hazır, teşekkürler!</h3>
          <p>
            Bu bir demo olduğu için mesajın gönderilmedi ve bilgilerin
            kaydedilmedi. Gerçek bir sohbette görüşmek üzere.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setErrors({});
              setComplete(false);
            }}
          >
            Yeni bir mesaj yaz <ArrowIcon />
          </button>
        </div>
      ) : (
        <form
          className="contact-form"
          aria-label="Yâren iletişim formu"
          aria-describedby="form-demo-note"
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="form-field">
            <label htmlFor="contact-name">
              Adın <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              maxLength={100}
              required
              placeholder="Sana nasıl seslenelim?"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p className="field-error" id="name-error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">
              E-posta adresin <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder="merhaba@ornek.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="field-error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">
              Mesajın <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              maxLength={2000}
              required
              placeholder="Hikâyeni duymak isteriz…"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p className="field-error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>
          <div className="form-bottom">
            <span>* Tüm alanlar gerekli.</span>
            <button className="button button-primary" type="submit">
              Mesajı Gönder <ArrowIcon />
            </button>
          </div>
        </form>
      )}
    </>
  );
}
