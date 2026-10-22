import Image from "next/image";
import { Container } from "@/components/ui/container";
import { eyebrow } from "@/components/ui/button";
import { Rosette } from "@/components/ui/icons";
import type { Messages } from "@/i18n/types";
export function Story({ copy }: { copy: Messages["story"] }) {
  return (
    <section
      id="hikayemiz"
      aria-labelledby="story-title"
      className="relative overflow-hidden rounded-t-[48px] bg-grove py-14 text-on-grove sm:rounded-t-[80px] sm:py-20"
    >
      <Rosette className="pointer-events-none absolute -right-16 -top-16 size-72 text-grove-muted/10" />
      <Container>
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative min-w-0" data-reveal>
            <div className="relative aspect-[1.1] overflow-hidden rounded-[44%_44%_24px_24px] border border-grove-muted/25 sm:aspect-[1.15] lg:aspect-[.95]">
              <Image
                src="/images/shared-coffee.webp"
                alt={copy.imageAlt}
                fill
                sizes="(max-width:1023px) 100vw, 70vw"
                quality={80}
              />
            </div>
            <p className="mt-5 text-center font-serif text-base italic text-grove-muted">
              {copy.caption}
            </p>
          </div>
          <div className="min-w-0" data-reveal>
            <p className={`${eyebrow} mb-6 text-grove-muted`}>{copy.eyebrow}</p>
            <Rosette className="mb-6 size-14 text-grove-muted" />
            <h2
              id="story-title"
              tabIndex={-1}
              className="text-4xl leading-[1.2] tracking-tight sm:text-5xl"
            >
              {copy.title[0]}
              <br />
              <em>{copy.title[1]}</em>
            </h2>
            <p className="mt-7 max-w-lg text-base leading-[1.8] text-on-grove">
              {copy.lead}
            </p>
            <p className="mt-5 max-w-lg text-base leading-[1.8] text-grove-muted">
              {copy.body}
            </p>
            <p className="mt-7 font-serif text-xl italic text-on-grove">
              {copy.signature}
            </p>
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap justify-between gap-5 border-t border-grove-muted/25 pt-7 text-sm text-grove-muted sm:mt-14">
          {copy.values.map((value) => (
            <li className="flex items-center gap-3" key={value}>
              <span
                className="size-1.5 rounded-full bg-grove-muted"
                aria-hidden="true"
              />
              {value}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
