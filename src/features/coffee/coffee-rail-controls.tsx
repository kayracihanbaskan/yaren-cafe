"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/ui/icons";

export function CoffeeRailControls({
  names,
  previous,
  next,
}: {
  names: string[];
  previous: string;
  next: string;
}) {
  const [active, setActive] = useState(0);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const collection = document.getElementById("kahveler");
    const viewport = collection?.querySelector<HTMLElement>(".coffee-viewport");
    if (!collection || !viewport) return;
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const desktop = document.documentElement.classList.contains(
          "yaren-scroll-desktop",
        );
        setAvailable(
          desktop || viewport!.scrollWidth > viewport!.clientWidth + 2,
        );
        const progress = desktop
          ? -collection!.getBoundingClientRect().top /
            Math.max(1, collection!.offsetHeight - innerHeight)
          : viewport!.scrollLeft /
            Math.max(1, viewport!.scrollWidth - viewport!.clientWidth);
        setActive(
          Math.max(
            0,
            Math.min(
              names.length - 1,
              Math.round(progress * (names.length - 1)),
            ),
          ),
        );
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("yaren:scroll-mode", update);
    window.addEventListener("resize", update);
    viewport.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("yaren:scroll-mode", update);
      window.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, [names.length]);

  function move(direction: number) {
    const collection = document.getElementById("kahveler");
    const viewport = collection?.querySelector<HTMLElement>(".coffee-viewport");
    const cards = collection?.querySelectorAll<HTMLElement>(".coffee-product");
    if (!collection || !viewport || !cards?.length) return;
    const target = Math.max(0, Math.min(cards.length - 1, active + direction));
    if (document.documentElement.classList.contains("yaren-scroll-desktop")) {
      const travel = Math.max(0, collection.offsetHeight - innerHeight);
      window.scrollTo({
        top:
          collection.getBoundingClientRect().top +
          scrollY +
          (travel * target) / Math.max(1, cards.length - 1),
        behavior: "smooth",
      });
    } else {
      viewport.scrollTo({
        left:
          viewport.scrollLeft +
          cards[target].getBoundingClientRect().left -
          viewport.getBoundingClientRect().left +
          cards[target].offsetWidth / 2 -
          viewport.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }

  if (!available) return null;
  return (
    <div className="coffee-rail-controls" aria-controls="coffee-viewport">
      <button
        type="button"
        aria-label={previous}
        disabled={active === 0}
        onClick={() => move(-1)}
      >
        <ArrowIcon />
      </button>
      <span aria-live="polite" aria-atomic="true">
        {names[active]}
      </span>
      <button
        type="button"
        aria-label={next}
        disabled={active === names.length - 1}
        onClick={() => move(1)}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}
