"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ArrowIcon } from "@/components/ui/icons";
const links = [
  { label: "Kahvelerimiz", href: "#kahveler", target: "coffee-title" },
  { label: "Hikâyemiz", href: "#hikayemiz", target: "story-title" },
  { label: "Bir merhaba", href: "#iletisim", target: "contact-title" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <div className="container header-inner">
        <a href="#baslangic" aria-label="Yâren — başlangıç">
          <Wordmark />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
          ref={toggle}
        >
          <span>{open ? "KAPAT" : "MENÜ"}</span>
          <span
            className={`menu-lines ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>
        <nav id="site-navigation" aria-label="Ana navigasyon" data-open={open}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => {
                  document
                    .getElementById(link.target)
                    ?.focus({ preventScroll: true });
                });
              }}
            >
              {link.label}
              <ArrowIcon diagonal />
            </a>
          ))}
        </nav>
        <span className="header-tag">KAHVE & YÂRENLİK</span>
      </div>
      <noscript>
        <style>{`@media(max-width:767px){.menu-toggle{display:none!important}#site-navigation{display:flex!important;position:static;flex-direction:row;border:0;padding:0;gap:14px}#site-navigation a{font-size:10px;min-height:44px;padding:0}#site-navigation a:last-child{display:none}#site-navigation .arrow-icon{display:none}}`}</style>
      </noscript>
    </header>
  );
}
