"use client";
import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowIcon, CloseIcon, Rosette } from "@/components/ui/icons";
import type { Messages } from "@/i18n/types";
export function StoryExplorer({
  title,
  name,
  image,
  alt,
  labels,
  children,
}: {
  title: string;
  name: string;
  image: string;
  alt: string;
  labels: Pick<Messages["common"], "story" | "close" | "readTime">;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backdropDown = useRef(false);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const triggerElement = trigger.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    element.querySelector<HTMLElement>("[data-dialog-title]")?.focus();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.body.style.overflow = previousOverflow;
      triggerElement?.focus({ preventScroll: true });
    };
  }, [open]);
  function close() {
    if (!dialog.current || timer.current) return;
    const finish = () => {
      timer.current = null;
      dialog.current?.close();
      setOpen(false);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    dialog.current.dataset.closing = "true";
    timer.current = setTimeout(finish, 180);
  }
  function keepFocusInside(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      ),
    ).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    const active = document.activeElement as HTMLElement;
    if (!first || !last) return;
    if (event.shiftKey && (active === first || !controls.includes(active))) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      (active === last || !controls.includes(active))
    ) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <>
      <details className="min-w-0">
        <summary
          ref={trigger}
          className="group inline-flex min-h-12 cursor-pointer items-center gap-3 font-sans text-sm font-semibold text-olive underline-offset-8 hover:underline"
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          {labels.story}
          <ArrowIcon
            diagonal
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </summary>
        <div className="story-fallback">
          <h4 className="mb-5 text-2xl text-ink">{title}</h4>
          {children}
        </div>
      </details>
      {open && (
        <dialog
          className="story-dialog"
          ref={dialog}
          aria-labelledby={id}
          onKeyDown={keepFocusInside}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClose={() => setOpen(false)}
          onPointerDown={(event) => {
            backdropDown.current = event.target === event.currentTarget;
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget && backdropDown.current)
              close();
            backdropDown.current = false;
          }}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-3 sm:px-7">
            <span className="flex items-center gap-2 font-sans text-xs tracking-wide text-muted">
              <Rosette className="size-6 text-copper" />
              {labels.readTime}
            </span>
            <button
              type="button"
              aria-label={labels.close}
              onClick={close}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-control bg-surface text-ink hover:bg-surface-alt"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="grid min-w-0 md:grid-cols-[.8fr_1.2fr]">
            <div className="relative aspect-[4/3] min-w-0 bg-surface-alt md:sticky md:top-[69px] md:aspect-[3/4]">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width:767px) 100vw, 400px"
                quality={80}
              />
            </div>
            <div className="min-w-0 px-5 py-7 sm:p-9">
              <p className="mb-3 font-sans text-xs font-semibold tracking-widest text-copper uppercase">
                {name}
              </p>
              <h2
                id={id}
                data-dialog-title
                tabIndex={-1}
                className="mb-7 text-3xl leading-tight tracking-tight sm:text-4xl"
              >
                {title}
              </h2>
              {children}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
