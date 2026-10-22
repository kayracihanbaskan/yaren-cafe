"use client";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  primaryButton,
  secondaryButton,
  eyebrow,
} from "@/components/ui/button";
import { ArrowIcon, CupIllustration, Rosette } from "@/components/ui/icons";
import { StoryExplorer } from "./story-explorer";
import { StoryContent } from "./story-content";
import { recommendCoffee, type FinderAnswers } from "./recommendation";
import type { LocalizedCoffee } from "./types";
import type { Messages } from "@/i18n/types";
const steps = ["mood", "strength", "breakLength"] as const;
export function CoffeeFinder({
  copy,
  common,
  coffees,
}: {
  copy: Messages["finder"];
  common: Messages["common"];
  coffees: readonly LocalizedCoffee[];
}) {
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const question = useRef<HTMLFieldSetElement>(null);
  const resultTitle = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const key = steps[step];
  const current = copy[key];
  const selected = answers[key];
  function focusQuestion() {
    requestAnimationFrame(() =>
      question.current?.focus({ preventScroll: true }),
    );
  }
  function next() {
    if (!selected) return;
    if (step < 2) {
      setStep(step + 1);
      focusQuestion();
    } else {
      setComplete(true);
      requestAnimationFrame(() =>
        resultTitle.current?.focus({ preventScroll: true }),
      );
    }
  }
  const result = complete
    ? coffees.find(
        (coffee) => coffee.id === recommendCoffee(answers as FinderAnswers),
      )
    : undefined;
  return (
    <section
      id="kahveni-bul"
      aria-labelledby="finder-title"
      className="px-3 pb-16 sm:px-5 sm:pb-20 lg:pb-24"
    >
      <div className="plaster mx-auto max-w-[1408px] overflow-hidden rounded-[32px] border border-line bg-surface-alt py-12 sm:rounded-[48px] sm:py-16">
        <Container>
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            <div className="min-w-0">
              <p className={`${eyebrow} mb-5 text-copper`}>{copy.eyebrow}</p>
              <h2
                id="finder-title"
                tabIndex={-1}
                className="max-w-lg text-4xl leading-tight tracking-tight sm:text-5xl"
              >
                {copy.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-[1.8] text-muted">
                {copy.intro}
              </p>
              <CupIllustration className="mt-6 hidden h-40 w-48 text-copper/80 lg:block" />
            </div>
            <div className="finder-interactive min-w-0 rounded-panel border border-line bg-surface p-5 shadow-warm sm:p-8">
              {!result ? (
                <>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p
                      className="text-xs font-semibold tracking-[.1em] text-copper"
                      aria-live="polite"
                    >
                      {copy.step} {step + 1} / 3
                    </p>
                    <div className="flex gap-2" aria-hidden="true">
                      {steps.map((_, index) => (
                        <span
                          className={`h-1.5 w-7 rounded-full ${index <= step ? "bg-olive" : "bg-line"}`}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                  <fieldset tabIndex={-1} ref={question} className="min-w-0">
                    <legend className="mb-5 max-w-full font-serif text-2xl leading-snug text-ink sm:text-[28px]">
                      {current.title}
                    </legend>
                    <div className="space-y-3">
                      {Object.entries(current.options).map(
                        ([value, label], index) => (
                          <label
                            key={value}
                            className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3 transition-colors ${selected === value ? "border-olive bg-olive/10" : "border-control bg-canvas hover:border-olive"}`}
                          >
                            <input
                              type="radio"
                              name={`${id}-${key}`}
                              value={value}
                              checked={selected === value}
                              onChange={() =>
                                setAnswers((previous) => ({
                                  ...previous,
                                  [key]: value,
                                }))
                              }
                              className="size-4 shrink-0 accent-olive"
                            />
                            <span className="flex-1 text-sm font-medium sm:text-base">
                              {label}
                            </span>
                            <span
                              aria-hidden="true"
                              className="font-serif text-sm text-muted"
                            >
                              0{index + 1}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </fieldset>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      className={secondaryButton}
                      disabled={step === 0}
                      onClick={() => {
                        setStep(step - 1);
                        focusQuestion();
                      }}
                    >
                      {copy.back}
                    </button>
                    <button
                      type="button"
                      className={primaryButton}
                      disabled={!selected}
                      onClick={next}
                    >
                      {step === 2 ? copy.submit : copy.next}
                      <ArrowIcon />
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <p className={`${eyebrow} mb-5 text-copper`}>{copy.result}</p>
                  <div className="grid min-w-0 items-center gap-5 sm:grid-cols-[120px_1fr]">
                    <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-full border-4 border-canvas sm:w-full">
                      <Image
                        src={result.image}
                        alt={result.alt}
                        fill
                        sizes="140px"
                        quality={80}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        ref={resultTitle}
                        tabIndex={-1}
                        className="text-3xl leading-tight"
                      >
                        {result.name}
                      </h3>
                      <p className="mt-2 text-base text-olive">
                        ₺{result.price}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-base leading-[1.8] text-muted">
                    {copy.resultReasons[result.id]}
                  </p>
                  <div className="mt-4">
                    <StoryExplorer
                      title={result.story.title}
                      name={result.name}
                      image={result.image}
                      alt={result.alt}
                      labels={common}
                    >
                      <StoryContent story={result.story} labels={common} />
                    </StoryExplorer>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <p className="max-w-xs text-xs leading-relaxed text-muted">
                      {copy.resultNote}
                    </p>
                    <button
                      type="button"
                      className={secondaryButton}
                      onClick={() => {
                        setAnswers({});
                        setStep(0);
                        setComplete(false);
                        focusQuestion();
                      }}
                    >
                      {copy.reset}
                      <Rosette className="size-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <noscript>
              <style>{`.finder-interactive{display:none}`}</style>
              <p className="rounded-panel border border-line bg-surface p-6 text-muted">
                {common.noJsFinder}
              </p>
            </noscript>
          </div>
        </Container>
      </div>
    </section>
  );
}
