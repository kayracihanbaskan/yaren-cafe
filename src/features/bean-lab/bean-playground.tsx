"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { BeanWorld } from "./bean-world";
import { Spark } from "@/components/brand/coffee-art";
import type { BeanLabCopy } from "./copy";

type Controls = {
  toggle(): void;
  pour(): void;
  scatter(direction?: number): void;
};

export function BeanPlayground({
  copy,
  children,
}: {
  copy: BeanLabCopy;
  children: ReactNode;
}) {
  const area = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef<Controls | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const surface = area.current;
    const element = canvas.current;
    const context = element?.getContext("2d", { alpha: true });
    if (!surface || !element || !context) return;
    const box = surface.getBoundingClientRect();
    const world = new BeanWorld(box.width, box.height);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let running = !reduce.matches;
    let staticPile = reduce.matches;
    let visible = false;
    let disposed = false;
    let frame = 0;
    let last = 0;
    let accumulator = 0;
    let measured = 0;
    let pointer: { x: number; y: number; time: number; id: number } | null =
      null;

    function draw() {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      world.draw(context!);
      const state = world.measure();
      element!.dataset.beans = String(state.count);
      element!.dataset.energy = state.energy.toFixed(1);
      element!.dataset.state = !running
        ? "paused"
        : state.settled
          ? "resting"
          : "playing";
    }
    function schedule() {
      if (!disposed && running && visible && !document.hidden && !frame)
        frame = requestAnimationFrame(tick);
    }
    function tick(time: number) {
      frame = 0;
      if (!running || !visible || document.hidden || disposed) return;
      accumulator += last ? Math.min((time - last) / 1000, 0.035) : 1 / 60;
      last = time;
      while (accumulator >= 1 / 120) {
        world.advance(1 / 120);
        accumulator -= 1 / 120;
      }
      const ratio = Math.min(devicePixelRatio || 1, 2);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      world.draw(context!);
      if (time - measured > 250) {
        measured = time;
        draw();
      }
      if (!world.measure().settled) schedule();
      else draw();
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      accumulator = 0;
    }
    function play() {
      if (staticPile) {
        world.reset();
        staticPile = false;
      }
      running = true;
      setPlaying(true);
      last = 0;
      draw();
      schedule();
    }
    function pause() {
      running = false;
      setPlaying(false);
      stop();
      draw();
    }
    controls.current = {
      toggle: () => (running ? pause() : play()),
      pour: () => {
        world.reset();
        staticPile = false;
        play();
      },
      scatter: (direction = 0) => {
        if (!running) play();
        world.scatter(direction);
        last = 0;
        schedule();
      },
    };
    function resize() {
      const rect = surface!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      element!.width = Math.round(rect.width * ratio);
      element!.height = Math.round(rect.height * ratio);
      world.resize(rect.width, rect.height);
      draw();
      last = 0;
      schedule();
    }
    function point(event: PointerEvent) {
      const rect = element!.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        time: performance.now(),
        id: event.pointerId,
      };
    }
    function down(event: PointerEvent) {
      if (!running || !event.isPrimary) return;
      pointer = point(event);
      world.nudge(
        pointer.x,
        pointer.y,
        pointer.x,
        pointer.y,
        0,
        -550,
        event.pointerType !== "mouse",
      );
      last = 0;
      schedule();
    }
    function move(event: PointerEvent) {
      if (!running || !event.isPrimary) return;
      if (event.pointerType !== "mouse" && pointer?.id !== event.pointerId)
        return;
      const next = point(event);
      if (pointer) {
        const dt = Math.max(
          0.008,
          Math.min(0.08, (next.time - pointer.time) / 1000),
        );
        if (
          world.nudge(
            next.x,
            next.y,
            pointer.x,
            pointer.y,
            (next.x - pointer.x) / dt,
            (next.y - pointer.y) / dt,
            event.pointerType !== "mouse",
          )
        ) {
          last = 0;
          schedule();
        }
      }
      pointer = next;
    }
    function release() {
      pointer = null;
    }
    function motionChange() {
      if (reduce.matches) pause();
    }
    function visibility() {
      if (document.hidden) stop();
      else {
        last = 0;
        schedule();
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = (entries[0]?.intersectionRatio ?? 0) >= 0.2;
        if (!visible) stop();
        else {
          last = 0;
          schedule();
        }
      },
      { threshold: 0.2 },
    );
    const size = new ResizeObserver(resize);
    world.reset(staticPile);
    setPlaying(running);
    resize();
    observer.observe(surface);
    size.observe(surface);
    const image = new Image();
    image.onload = () => {
      if (!disposed) {
        world.setImage(image);
        draw();
      }
    };
    image.src = "/images/coffee-bean.webp";
    element.addEventListener("pointerdown", down, { passive: true });
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", release);
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      size.disconnect();
      image.onload = null;
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", release);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("visibilitychange", visibility);
      reduce.removeEventListener("change", motionChange);
      controls.current = null;
    };
  }, []);

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.code === "Space") {
      event.preventDefault();
      controls.current?.toggle();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      controls.current?.scatter(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <div
      className="bean-playground"
      ref={area}
      role="region"
      tabIndex={0}
      aria-label={copy.region}
      aria-describedby="bean-instructions bean-keyboard"
      onKeyDown={keyboard}
    >
      <canvas className="bean-canvas" ref={canvas} aria-hidden="true" />
      {children}
      <div className="bean-lab-controls section-shell">
        <p className="bean-pause-status" role="status">
          {playing ? "" : copy.paused}
        </p>
        <div className="bean-button-row">
          <button
            type="button"
            className="bean-pause"
            onClick={() => controls.current?.toggle()}
          >
            <span
              className={`play-glyph ${playing ? "is-playing" : ""}`}
              aria-hidden="true"
            />
            {playing ? copy.pause : copy.play}
          </button>
          <button type="button" onClick={() => controls.current?.pour()}>
            <span aria-hidden="true">↻</span>
            {copy.pour}
          </button>
          <button
            type="button"
            className="bean-mix"
            onClick={() => controls.current?.scatter()}
          >
            <Spark className="bean-mix-icon" />
            {copy.scatter}
          </button>
        </div>
      </div>
      <p id="bean-keyboard" className="bean-keyboard">
        {copy.keyboard}
      </p>
      <noscript>
        <p className="bean-no-js">{copy.noJs}</p>
        <style>{`.bean-lab-controls,.bean-keyboard{display:none}`}</style>
      </noscript>
    </div>
  );
}
