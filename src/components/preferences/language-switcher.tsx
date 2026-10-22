"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/types";
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();
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
          <Link
            key={language}
            href={`/${language}`}
            scroll={false}
            hrefLang={language}
            lang={language}
            aria-label={language === "en" ? "English" : "Türkçe"}
            onNavigate={(event) => {
              const hash = window.location.hash;
              if (!hash) return;
              event.preventDefault();
              router.push(`/${language}${hash}`, { scroll: false });
            }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 transition-colors duration-300 ease-courtyard hover:bg-current/10"
          >
            {language.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
