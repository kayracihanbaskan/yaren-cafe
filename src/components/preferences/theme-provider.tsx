"use client";
import { ThemeProvider as Provider, useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";
function BrowserThemeColor() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  useEffect(() => {
    // A different tab can change storage while this page is still hydrating.
    try {
      const saved = localStorage.getItem("yaren-theme");
      if (["light", "dark", "system"].includes(saved ?? "") && saved !== theme)
        setTheme(saved!);
    } catch {
      // Private browsing may disable storage; the in-memory theme still works.
    }
  }, [theme, setTheme]);
  useEffect(() => {
    if (!resolvedTheme) return;
    // next-themes applies its root attribute in the parent effect first.
    const frame = requestAnimationFrame(() => {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          getComputedStyle(document.documentElement)
            .getPropertyValue("--canvas")
            .trim(),
        );
    });
    return () => cancelAnimationFrame(frame);
  }, [resolvedTheme]);
  return null;
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      storageKey="yaren-theme"
      disableTransitionOnChange
    >
      <BrowserThemeColor />
      {children}
    </Provider>
  );
}
