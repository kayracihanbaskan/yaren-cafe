import type { CoffeeCopy, CoffeeId } from "@/features/coffee/types";
import type {
  Mood,
  Strength,
  BreakLength,
} from "@/features/coffee/recommendation";
export type Locale = "tr" | "en";
export function isLocale(value: string): value is Locale {
  return value === "tr" || value === "en";
}
export type Messages = {
  meta: { title: string; description: string };
  common: {
    skip: string;
    close: string;
    story: string;
    readTime: string;
    brewing: string;
    pairing: string;
    priceNote: string;
    backTop: string;
    noJsFinder: string;
  };
  nav: {
    coffees: string;
    story: string;
    finder: string;
    contact: string;
    menu: string;
    closeMenu: string;
    theme: string;
    language: string;
    label: string;
  };
  theme: { light: string; dark: string; system: string };
  hero: {
    eyebrow: string;
    lines: readonly [string, string, string];
    description: string;
    discover: string;
    find: string;
    seal: readonly [string, string];
    caption: string;
    note: string;
    values: readonly [string, string, string];
  };
  collection: {
    eyebrow: string;
    title: readonly [string, string];
    intro: string;
    caption: string;
  };
  coffees: Record<CoffeeId, CoffeeCopy>;
  finder: {
    eyebrow: string;
    title: string;
    intro: string;
    step: string;
    next: string;
    back: string;
    submit: string;
    reset: string;
    result: string;
    resultNote: string;
    resultReasons: Record<CoffeeId, string>;
    mood: { title: string; options: Record<Mood, string> };
    strength: { title: string; options: Record<Strength, string> };
    breakLength: { title: string; options: Record<BreakLength, string> };
  };
  story: {
    imageAlt: string;
    eyebrow: string;
    title: readonly [string, string];
    lead: string;
    body: string;
    signature: string;
    caption: string;
    values: readonly [string, string, string];
  };
  contact: {
    imageAlt: string;
    formLabel: string;
    eyebrow: string;
    title: readonly [string, string];
    intro: string;
    caption: string;
    note: string;
    noJs: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    required: string;
    submit: string;
    successTitle: string;
    successBody: string;
    reset: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
  };
  footer: {
    eyebrow: string;
    title: readonly [string, string];
    intro: string;
    explore: string;
    preferences: string;
    tagline: string;
    fictional: string;
    crafted: string;
  };
};
