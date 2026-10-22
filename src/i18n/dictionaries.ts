import "server-only";
import type { Locale, Messages } from "./types";
const dictionaries = {
  tr: () => import("./messages/tr").then((module) => module.default),
  en: () => import("./messages/en").then((module) => module.default),
};
export function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
}
