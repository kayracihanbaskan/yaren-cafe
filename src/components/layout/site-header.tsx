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
    const media = window.matchMedia("(min-width:768px)");
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
    <>
      <header
        className="site-header sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm"
        ref={header}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (open && !event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <Container className="relative grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-3 md:grid-cols-[auto_minmax(0,1fr)] md:gap-y-2 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-8">
          <a
            href="#baslangic"
            aria-label="Yâren"
            className="-ml-2 inline-flex min-h-11 items-center text-ink"
          >
            <Wordmark />
          </a>
          <button
            type="button"
            className="menu-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line p-3 text-ink md:hidden"
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
            className={`site-nav ${open ? "flex" : "hidden"} absolute inset-x-4 top-[calc(100%+8px)] max-h-[calc(100dvh-var(--header-height)-24px)] min-w-0 flex-col gap-4 overflow-y-auto rounded-3xl border border-line bg-surface p-4 shadow-warm md:contents`}
          >
            <div className="flex min-w-0 flex-col md:col-span-2 md:row-start-2 md:grid md:grid-cols-4 md:gap-3 md:border-t md:border-line md:pt-1 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-row lg:justify-end lg:gap-5 lg:border-0 lg:pt-0">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-11 min-w-0 items-center justify-between gap-3 py-2 text-sm leading-relaxed text-ink underline decoration-transparent underline-offset-8 transition-[color,text-decoration-color] duration-300 ease-courtyard hover:decoration-current md:justify-center md:text-center lg:text-left"
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
                  <ArrowIcon diagonal className="md:hidden" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4 text-ink md:col-start-2 md:row-start-1 md:justify-self-end md:border-0 md:pt-0 lg:col-start-3">
              <ThemeSwitcher label={nav.theme} messages={theme} />
              <LanguageSwitcher locale={locale} label={nav.language} />
            </div>
          </nav>
        </Container>
        <noscript>
          <style>{`.site-header{position:static!important}@media(max-width:767px){.menu-toggle{display:none!important}.site-nav{position:static!important;display:flex!important;grid-column:1/-1;max-height:none;margin-top:8px;border:0;box-shadow:none}}`}</style>
        </noscript>
      </header>
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => {
            setOpen(false);
            toggle.current?.focus();
          }}
          className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-30 bg-ink/15 backdrop-blur-[2px] md:hidden"
        />
      )}
    </>
  );
}
