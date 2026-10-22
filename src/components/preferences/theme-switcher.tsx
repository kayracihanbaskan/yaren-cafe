"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, MonitorIcon } from "@/components/ui/icons";
import type { Messages } from "@/i18n/types";
const subscribe = () => () => {};
export function ThemeSwitcher({
  label,
  messages,
}: {
  label: string;
  messages: Messages["theme"];
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex shrink-0 items-center rounded-full border border-current/40 px-1"
    >
      {(
        [
          ["light", SunIcon],
          ["dark", MoonIcon],
          ["system", MonitorIcon],
        ] as const
      ).map(([value, Icon]) => (
        <button
          key={value}
          type="button"
          aria-label={messages[value]}
          title={messages[value]}
          aria-pressed={(mounted ? theme : "light") === value}
          disabled={!mounted}
          onClick={() => setTheme(value)}
          className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-300 ease-courtyard hover:bg-current/10 aria-pressed:bg-current/15 disabled:cursor-default"
        >
          <Icon className="size-[18px]" />
        </button>
      ))}
    </div>
  );
}
