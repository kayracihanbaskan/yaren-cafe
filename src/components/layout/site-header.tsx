"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Spark } from "@/components/brand/coffee-art";
import { ArrowIcon } from "@/components/ui/icons";
import { useHeaderHeight } from "@/hooks/use-header-height";
import type { DesignCopy } from "@/i18n/design-copy";
import type { Locale } from "@/i18n/types";

export const sectionLinks = [
  "#hikayemiz",
  "#kahveler",
  "#ritueller",
  "#iletisim",
];

export function SiteHeader({
  locale,
  copy,
}: {
  locale: Locale;
  copy: DesignCopy;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useHeaderHeight(header);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  function keyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  return (
    <header
      className="creative-header paper"
      ref={header}
      onKeyDown={keyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="header-shell section-shell">
        <a className="header-logo" href="#baslangic" aria-label="Yâren">
          <Wordmark />
        </a>
        <span className="header-motto" aria-hidden="true">
          {copy.stamp}
          <Spark />
        </span>
        <button
          ref={toggle}
          className="mobile-toggle"
          aria-label={open ? copy.closeMenu : copy.menu}
          aria-expanded={open}
          aria-controls="creative-navigation"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span>{locale === "tr" ? "Menü" : "Menu"}</span>
          <span
            className={`menu-lines ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          id="creative-navigation"
          className={`creative-nav ${open ? "is-open" : ""}`}
          aria-label={copy.navigation}
        >
          {sectionLinks.map((href, index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span className="mobile-nav-index" aria-hidden="true">
                0{index + 1}
              </span>
              {copy.nav[index]}
            </a>
          ))}
          <a
            className="language-link"
            href={locale === "tr" ? "/en" : "/tr"}
            aria-label={copy.language}
          >
            {locale === "tr" ? "EN" : "TR"}
            <ArrowIcon diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}
