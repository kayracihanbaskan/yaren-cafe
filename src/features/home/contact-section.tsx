import Image from "next/image";
import { ContactForm } from "@/features/contact/contact-form";
import { Container } from "@/components/ui/container";
import { eyebrow } from "@/components/ui/button";
import type { Messages } from "@/i18n/types";
export function ContactSection({ copy }: { copy: Messages["contact"] }) {
  return (
    <section
      id="iletisim"
      aria-labelledby="contact-title"
      className="plaster py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 grid min-w-0 items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className={`${eyebrow} mb-5 text-copper`}>{copy.eyebrow}</p>
            <h2
              id="contact-title"
              tabIndex={-1}
              className="text-4xl leading-tight tracking-tight sm:text-5xl"
            >
              {copy.title[0]}
              <br />
              <em className="text-olive">{copy.title[1]}</em>
            </h2>
          </div>
          <p
            className="max-w-md text-base leading-[1.8] text-muted"
            data-reveal
          >
            {copy.intro}
          </p>
        </div>
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12">
          <div className="min-w-0" data-reveal>
            <div className="relative aspect-[1.1] overflow-hidden rounded-arch border border-line bg-surface-alt sm:aspect-[1.4] lg:aspect-[.8]">
              <Image
                src="/images/cafe-table.webp"
                alt={copy.imageAlt}
                fill
                sizes="(max-width:1023px) 100vw, 42vw"
                quality={80}
                style={{ objectPosition: "center 72%" }}
              />
            </div>
            <p className="mt-5 text-center font-serif text-sm italic text-muted">
              {copy.caption}
            </p>
          </div>
          <div className="relative min-w-0 rounded-panel border border-line bg-surface p-5 shadow-warm sm:p-9 lg:p-10">
            <div
              className="pointer-events-none absolute inset-x-6 -top-2 h-3 rounded-full border border-line bg-canvas"
              aria-hidden="true"
            />
            <ContactForm copy={copy} />
          </div>
        </div>
      </Container>
    </section>
  );
}
