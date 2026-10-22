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
        <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-footer-muted/25 pb-10 sm:mb-12 sm:gap-8">
          <div className="min-w-0">
            <p className={`${eyebrow} mb-5 text-footer-muted`}>
              {copy.eyebrow}
            </p>
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] leading-snug tracking-tight [text-wrap:balance]">
              {copy.title[0]}
              <br />
              <em>{copy.title[1]}</em>
            </h2>
          </div>
          <CupIllustration className="h-auto w-16 text-footer-muted sm:w-32 lg:w-44" />
        </div>
        <div className="grid min-w-0 gap-x-8 gap-y-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)_minmax(260px,1fr)]">
          <div className="min-w-0 md:row-span-2 xl:row-span-1">
            <Wordmark className="-ml-3 h-auto w-56 max-w-full" />
            <p className="mt-1 max-w-xs text-base leading-[1.8] text-footer-muted">
              {copy.intro}
            </p>
            <BrandMark className="mt-5 size-11 text-footer-muted" />
          </div>
          <div className="min-w-0">
            <h3 className="mb-4 font-sans text-sm font-semibold text-on-footer">
              {copy.explore}
            </h3>
            <nav
              aria-label={copy.explore}
              className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-footer-muted xl:grid-cols-1"
            >
              <a
                className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current"
                href="#kahveler"
              >
                {nav.coffees}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current"
                href="#kahveni-bul"
              >
                {nav.finder}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current"
                href="#hikayemiz"
              >
                {nav.story}
              </a>
              <a
                className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current"
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
            <div className="flex flex-wrap items-center gap-2">
              <ThemeSwitcher label={nav.theme} messages={theme} />
              <LanguageSwitcher locale={locale} label={nav.language} />
            </div>
            <a
              href="#baslangic"
              className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-footer-muted underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current"
            >
              {common.backTop}
              <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-3 border-t border-footer-muted/25 pt-6 text-xs leading-relaxed text-footer-muted md:grid-cols-2 xl:grid-cols-[auto_1fr_auto]">
          <span>© {new Date().getFullYear()} Yâren</span>
          <span className="xl:text-center">{copy.crafted}</span>
          <span className="md:col-span-2 xl:col-span-1">{copy.fictional}</span>
        </div>
      </Container>
    </footer>
  );
}
