import Image from "next/image";
import { Container } from "@/components/ui/container";
import { primaryButton, eyebrow } from "@/components/ui/button";
import {
  ArrowIcon,
  Rosette,
  SunIcon,
  CupIllustration,
} from "@/components/ui/icons";
import type { Messages } from "@/i18n/types";
export function Hero({ copy, alt }: { copy: Messages["hero"]; alt: string }) {
  return (
    <section
      id="baslangic"
      aria-labelledby="hero-title"
      className="plaster overflow-hidden pt-7 sm:pt-10 lg:pt-12"
    >
      <Container>
        <div className="grid min-w-0 items-center gap-10 pb-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-14">
          <div className="min-w-0 py-2 lg:py-8">
            <p
              className={`${eyebrow} hero-enter mb-7 flex items-center gap-3 text-copper`}
            >
              <SunIcon className="size-6" />
              <span>{copy.eyebrow}</span>
            </p>
            <h1
              id="hero-title"
              className="hero-enter hero-stagger-1 max-w-xl text-[clamp(2.75rem,6vw,5.1rem)] leading-[1.12] tracking-[-.055em]"
            >
              {copy.lines[0]}{" "}
              <em className="block text-olive">{copy.lines[1]}</em>{" "}
              {copy.lines[2]}
            </h1>
            <p className="hero-enter hero-stagger-2 mt-7 max-w-md text-base leading-[1.8] text-muted">
              {copy.description}
            </p>
            <div className="hero-enter hero-stagger-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className={primaryButton} href="#kahveler">
                {copy.discover}
                <ArrowIcon />
              </a>
              <a
                href="#kahveni-bul"
                className="inline-flex min-h-12 items-center gap-2 text-sm font-medium text-olive underline-offset-8 hover:underline"
              >
                {copy.find}
                <ArrowIcon diagonal />
              </a>
            </div>
            <div className="hero-enter hero-stagger-3 mt-8 hidden items-center gap-4 text-copper lg:flex">
              <CupIllustration className="h-20 w-24" />
              <p className="max-w-48 font-serif text-base italic leading-relaxed">
                {copy.note}
              </p>
            </div>
          </div>
          <div className="hero-enter hero-stagger-2 relative min-w-0 pb-8 pl-4 pr-4 lg:pl-6 lg:pr-1">
            <div
              className="absolute -right-8 top-2 h-[85%] w-[94%] rounded-arch border border-copper/35"
              aria-hidden="true"
            />
            <div className="relative aspect-[.94] overflow-hidden rounded-arch bg-surface-alt shadow-warm sm:aspect-[1.12] lg:aspect-[.87]">
              <Image
                src="/images/turkish-coffee.webp"
                alt={alt}
                fill
                preload
                quality={85}
                sizes="(max-width:639px) 140vw, (max-width:1023px) 130vw, 80vw"
                style={{ objectPosition: "64% center" }}
              />
            </div>
            <div
              className="absolute bottom-16 left-0 flex size-28 flex-col items-center justify-center gap-1 rounded-full border border-copper/35 bg-surface shadow-warm sm:size-32 lg:-left-5"
              aria-hidden="true"
            >
              <span className="text-[10px] font-semibold tracking-widest text-olive">
                {copy.seal[0]}
              </span>
              <Rosette className="size-11 text-copper" />
              <span className="text-[10px] font-semibold tracking-widest text-olive">
                {copy.seal[1]}
              </span>
            </div>
            <p className="mt-5 text-right font-serif text-sm italic text-muted">
              {copy.caption}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-line py-6 text-sm text-muted sm:py-7">
          {copy.values.map((value, index) => (
            <span key={value} className="flex min-w-0 items-center gap-3">
              <Rosette className="size-6 text-copper" />
              <span>{value}</span>
              <span className="sr-only">{index + 1}</span>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
