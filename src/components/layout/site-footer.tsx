import { Wordmark } from "@/components/brand/wordmark";
import { BrandMark } from "@/components/brand/brand-mark";
import { Container } from "@/components/ui/container";
import { ArrowIcon, CupIllustration, Rosette } from "@/components/ui/icons";
import { ThemeSwitcher } from "@/components/preferences/theme-switcher";
import { LanguageSwitcher } from "@/components/preferences/language-switcher";
import { eyebrow } from "@/components/ui/button";
import type { Locale, Messages } from "@/i18n/types";
export function SiteFooter({
  locale,
  copy,
  nav,
  theme,
  common,
}: {
  locale: Locale;
  copy: Messages["footer"];
  nav: Messages["nav"];
  theme: Messages["theme"];
  common: Messages["common"];
}) {
  return (
    <footer className="relative overflow-hidden rounded-t-[48px] bg-footer pb-6 pt-12 text-on-footer sm:rounded-t-[80px] sm:pt-16">
      <Rosette className="pointer-events-none absolute -bottom-24 -left-28 size-96 text-footer-muted/5" />
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-footer-muted/25 pb-10 sm:mb-12">
          <div className="min-w-0">
            <p className={`${eyebrow} mb-5 text-footer-muted`}>
              {copy.eyebrow}
            </p>
            <h2 className="text-3xl leading-snug tracking-tight sm:text-4xl lg:text-5xl">
              {copy.title[0]}
              <br />
              <em>{copy.title[1]}</em>
            </h2>
          </div>
          <CupIllustration className="h-36 w-40 shrink-0 text-footer-muted sm:h-44 sm:w-48" />
        </div>
        <div className="grid min-w-0 gap-9 md:grid-cols-[1.2fr_.8fr_1fr]">
          <div className="min-w-0">
            <Wordmark className="-ml-3 h-auto w-56 max-w-full" />
            <p className="mt-1 max-w-xs text-base leading-[1.8] text-footer-muted">
              {copy.intro}
            </p>
            <BrandMark className="mt-5 size-11 text-footer-muted" />
          </div>
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold text-on-footer">
              {copy.explore}
            </h3>
            <nav
              aria-label={copy.explore}
              className="flex flex-col items-start gap-1 text-sm text-footer-muted"
            >
              <a
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                href="#kahveler"
              >
                {nav.coffees}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                href="#kahveni-bul"
              >
                {nav.finder}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                href="#hikayemiz"
              >
                {nav.story}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                href="#iletisim"
              >
                {nav.contact}
              </a>
            </nav>
          </div>
          <div className="min-w-0">
            <h3 className="mb-5 font-sans text-sm font-semibold text-on-footer">
              {copy.preferences}
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <ThemeSwitcher label={nav.theme} messages={theme} />
              <LanguageSwitcher locale={locale} label={nav.language} />
            </div>
            <a
              href="#baslangic"
              className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-footer-muted underline-offset-4 hover:underline"
            >
              {common.backTop}
              <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-footer-muted/25 pt-6 text-xs leading-relaxed text-footer-muted">
          <span>© {new Date().getFullYear()} Yâren</span>
          <span>{copy.crafted}</span>
          <span>{copy.fictional}</span>
        </div>
      </Container>
    </footer>
  );
}
