"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { ArrowIcon } from "@/components/ui/icons";
import { ThemeSwitcher } from "@/components/preferences/theme-switcher";
import { LanguageSwitcher } from "@/components/preferences/language-switcher";
import { useHeaderHeight } from "@/hooks/use-header-height";
import type { Locale, Messages } from "@/i18n/types";
export function SiteHeader({
  locale,
  nav,
  theme,
}: {
  locale: Locale;
  nav: Messages["nav"];
  theme: Messages["theme"];
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useHeaderHeight(header);
  useEffect(() => {
    const media = window.matchMedia("(min-width:1024px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  const links = [
    { label: nav.coffees, href: "#kahveler", target: "coffee-title" },
    { label: nav.finder, href: "#kahveni-bul", target: "finder-title" },
    { label: nav.story, href: "#hikayemiz", target: "story-title" },
    { label: nav.contact, href: "#iletisim", target: "contact-title" },
  ];
  return (
    <header
      className="site-header sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm"
      ref={header}
      onKeyDown={handleKeyDown}
    >
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-x-5 py-2 lg:gap-x-8 lg:py-3">
        <a
          href="#baslangic"
          aria-label="Yâren"
          className="-ml-2 inline-flex min-h-11 items-center text-ink"
        >
          <Wordmark />
        </a>
        <button
          type="button"
          className="menu-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line p-3 text-ink lg:hidden"
          ref={toggle}
          aria-label={open ? nav.closeMenu : nav.menu}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-1 left-0 h-px w-5 bg-current transition-transform ${open ? "-translate-y-0.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
        <nav
          id="site-navigation"
          aria-label={nav.label}
          data-open={open}
          className={`site-nav ${open ? "flex" : "hidden"} min-w-0 basis-full flex-col gap-5 pb-5 pt-3 lg:flex lg:basis-auto lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-6 lg:gap-y-3 lg:p-0`}
        >
          <div className="flex min-w-0 flex-col lg:flex-row lg:flex-wrap lg:gap-x-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex min-h-12 items-center justify-between gap-4 py-2 text-sm text-ink underline-offset-8 hover:underline lg:min-h-11"
                onClick={() => {
                  setOpen(false);
                  requestAnimationFrame(() =>
                    document
                      .getElementById(link.target)
                      ?.focus({ preventScroll: true }),
                  );
                }}
              >
                {link.label}
                <ArrowIcon diagonal className="lg:hidden" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4 text-ink lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
            <ThemeSwitcher label={nav.theme} messages={theme} />
            <LanguageSwitcher locale={locale} label={nav.language} />
          </div>
        </nav>
      </Container>
      <noscript>
        <style>{`.site-header{position:static!important}@media(max-width:1023px){.menu-toggle{display:none!important}.site-nav{display:flex!important}}`}</style>
      </noscript>
    </header>
  );
}
