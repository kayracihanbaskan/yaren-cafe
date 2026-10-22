"use client";
import { useId, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@/components/ui/icons";
import type { Messages } from "@/i18n/types";
const subscribe = () => () => {};
export function ThemeSwitcher({
  label,
  messages,
}: {
  label: string;
  messages: Messages["theme"];
}) {
  const id = useId();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex min-w-0 items-center gap-2">
      <SunIcon className="size-4" />
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={mounted ? theme : "light"}
        disabled={!mounted}
        onChange={(event) => setTheme(event.target.value)}
        className="min-h-11 min-w-24 rounded-full border border-current/40 bg-transparent px-3 py-2 font-sans text-sm"
      >
        <option className="bg-surface text-ink" value="light">
          {messages.light}
        </option>
        <option className="bg-surface text-ink" value="dark">
          {messages.dark}
        </option>
        <option className="bg-surface text-ink" value="system">
          {messages.system}
        </option>
      </select>
    </div>
  );
}
