"use client";
import type { MouseEvent } from "react";
import type { Locale } from "@/i18n/types";
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !window.location.hash
    )
      return;
    event.preventDefault();
    const target = new URL(event.currentTarget.href);
    target.hash = window.location.hash;
    window.location.assign(target.href);
  }
  return (
    <div
      className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-current/40 px-1 font-sans text-sm"
      role="group"
      aria-label={label}
    >
      {(["tr", "en"] as const).map((language) =>
        locale === language ? (
          <span
            className="inline-flex min-h-10 min-w-11 items-center justify-center rounded-full bg-current/10 px-2 font-semibold"
            aria-current="page"
            key={language}
          >
            {language.toUpperCase()}
          </span>
        ) : (
          <a
            key={language}
            href={`/${language}`}
            hrefLang={language}
            lang={language}
            aria-label={language === "en" ? "English" : "Türkçe"}
            onClick={navigate}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 transition-colors hover:bg-current/10"
          >
            {language.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}
