"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type ScrollInstance = { destroy(): void; layout(): void; read(): void };
declare global {
  interface Window {
    ScrollCraft?: {
      mount(root: HTMLElement): ScrollInstance;
      instances: ScrollInstance[];
    };
  }
}

/** Progressive enhancement. The original reading order is the fallback. */
export function ScrollCraftController() {
  const [ready, setReady] = useState(false);
  const [load, setLoad] = useState(false);
  const positioned = useRef(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const enable = () => {
      if (!preference.matches) setLoad(true);
      else if (!window.ScrollCraft?.instances.length) {
        positioned.current = true;
        // The static fallback is ready without downloading the motion runtime.
        document.documentElement.classList.add("sc-ready");
        const root = document.getElementById("icerik");
        if (root) root.dataset.yarenMotion = "reduced";
      }
    };
    enable();
    preference.addEventListener("change", enable);
    return () => {
      preference.removeEventListener("change", enable);
      if (!window.ScrollCraft?.instances.length)
        document.documentElement.classList.remove("sc-ready");
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById("icerik");
    if (!ready || !root || !window.ScrollCraft) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 1000px) and (min-height: 760px)");
    const collection = document.getElementById("kahveler");
    const ritual = document.getElementById("ritueller");
    const rail = collection?.querySelector<HTMLElement>(".coffee-grid");
    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-sc-act], [data-sc-stage], [data-sc-parallax], [data-sc-pan], [data-sc-reveal]",
      ),
    );
    const styles = elements.map(
      (element) => [element, element.getAttribute("style")] as const,
    );
    let instance: ScrollInstance | undefined;
    let positionFrame = 0;
    let anchorFrame = 0;
    let readingPosition: { element: HTMLElement; top: number } | undefined;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("section[id]"),
    );
    function rememberPosition() {
      const header =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) || 100;
      let largest = 0;
      for (const element of sections) {
        const rect = element.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(innerHeight, rect.bottom) - Math.max(header, rect.top),
        );
        if (visible > largest) {
          largest = visible;
          readingPosition = { element, top: rect.top };
        }
      }
    }
    function trackPosition() {
      cancelAnimationFrame(positionFrame);
      positionFrame = requestAnimationFrame(rememberPosition);
    }

    function restore() {
      instance?.destroy();
      instance = undefined;
      document.documentElement.classList.remove(
        "yaren-scroll-desktop",
        "yaren-scroll-mobile",
      );
      delete root!.dataset.yarenMotion;
      for (const [element, style] of styles) {
        if (style === null) element.removeAttribute("style");
        else element.setAttribute("style", style);
        element.classList.remove("sc-act--pinned", "sc-stage");
      }
      if (collection) collection.dataset.scAct = "flow";
      if (ritual) ritual.dataset.scAct = "flow";
      rail?.setAttribute("data-sc-pan", "0");
    }

    function sync() {
      cancelAnimationFrame(positionFrame);
      cancelAnimationFrame(anchorFrame);
      const section = positioned.current ? readingPosition?.element : undefined;
      const previousTop = readingPosition?.top;
      restore();
      if (reduce.matches) {
        root!.dataset.yarenMotion = "reduced";
        document.documentElement.classList.add("sc-ready");
        window.dispatchEvent(new Event("yaren:scroll-mode"));
        if (section && previousTop !== undefined)
          window.scrollBy({
            top: section.getBoundingClientRect().top - previousTop,
            behavior: "instant",
          });
        rememberPosition();
        return;
      }
      const wide = desktop.matches;
      document.documentElement.classList.add(
        wide ? "yaren-scroll-desktop" : "yaren-scroll-mobile",
      );
      root!.dataset.yarenMotion = wide ? "desktop" : "mobile";
      if (collection) collection.dataset.scAct = wide ? "pan" : "flow";
      if (ritual) ritual.dataset.scAct = wide ? "pin" : "flow";
      if (!wide) rail?.removeAttribute("data-sc-pan");
      instance = window.ScrollCraft!.mount(root!);
      // The browser can apply a queued scroll adjustment after pin heights
      // change. Align the initial anchor once the new layout has committed.
      if (!positioned.current && location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        anchorFrame = requestAnimationFrame(() => {
          anchorFrame = requestAnimationFrame(() => {
            target?.scrollIntoView({ behavior: "instant" });
            rememberPosition();
          });
        });
      }
      else if (section && previousTop !== undefined)
        window.scrollBy({
          top: section.getBoundingClientRect().top - previousTop,
          behavior: "instant",
        });
      positioned.current = true;
      rememberPosition();
      window.dispatchEvent(new Event("yaren:scroll-mode"));
    }

    function focusCard(event: FocusEvent) {
      if (
        !desktop.matches ||
        reduce.matches ||
        !(event.target instanceof HTMLElement)
      )
        return;
      const card = event.target.closest<HTMLElement>(".coffee-product");
      if (!card || !collection || !event.target.matches(":focus-visible"))
        return;
      const cards = Array.from(collection.querySelectorAll(".coffee-product"));
      const index = cards.indexOf(card);
      const travel = Math.max(0, collection.offsetHeight - innerHeight);
      collection
        .querySelector(".coffee-viewport")
        ?.scrollTo({ left: 0, behavior: "instant" });
      window.scrollTo({
        top:
          collection.getBoundingClientRect().top +
          scrollY +
          (travel * index) / Math.max(1, cards.length - 1),
        behavior: "instant",
      });
      instance?.read();
    }

    sync();
    reduce.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    root.addEventListener("focusin", focusCard);
    window.addEventListener("scroll", trackPosition, { passive: true });
    return () => {
      reduce.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      root.removeEventListener("focusin", focusCard);
      window.removeEventListener("scroll", trackPosition);
      cancelAnimationFrame(positionFrame);
      cancelAnimationFrame(anchorFrame);
      restore();
    };
  }, [ready]);

  return load ? (
    <Script
      src="/vendor/scrollcraft/scrollcraft.js"
      strategy="afterInteractive"
      onReady={() => setReady(true)}
    />
  ) : null;
}
