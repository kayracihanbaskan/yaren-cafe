"use client";
import { useEffect } from "react";

/** Enhance below-the-fold decoration only; SSR and unsupported browsers stay visible. */
export function useScrollReveal(): void {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    function revealAll() {
      observer?.disconnect();
      for (const target of targets) target.dataset.reveal = "visible";
    }
    function setup() {
      revealAll();
      if (
        preference.matches ||
        typeof window.IntersectionObserver !== "function"
      )
        return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.reveal = "visible";
              observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.08 },
      );
      for (const target of targets) {
        if (
          target.getBoundingClientRect().top > window.innerHeight &&
          !target.contains(document.activeElement) &&
          !target.querySelector("a, button, input, textarea")
        ) {
          target.dataset.reveal = "pending";
          observer.observe(target);
        }
      }
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      preference.removeEventListener("change", setup);
      revealAll();
    };
  }, []);
}
