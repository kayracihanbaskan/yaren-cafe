"use client";
import { useEffect, type RefObject } from "react";
/** Keep native anchor targets clear when text enlargement wraps the header. */
export function useHeaderHeight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const header = ref.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      ),
    );
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, [ref]);
}
