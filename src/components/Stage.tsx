"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A lit set. Publishes two CSS variables to its children:
 *  --mx / --my : pointer position inside the stage, 0..1 (parallax, spotlight)
 *  --p         : scroll progress through the stage, 0..1 (sun, road, charge)
 */
export default function Stage({
  id,
  scene,
  label,
  children,
}: {
  id?: string;
  scene: string;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--p", reduce ? "0.6" : "0");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", String(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))));
      el.style.setProperty("--my", String(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))));
      // Pointer position inside a reveal target (e.g. the lit vehicle), in percent.
      const t = el.querySelector<HTMLElement>(".revealed");
      if (t) {
        const tr = t.getBoundingClientRect();
        el.style.setProperty("--rx", String(Math.min(100, Math.max(0, ((e.clientX - tr.left) / tr.width) * 100))));
        el.style.setProperty("--ry", String(Math.min(100, Math.max(0, ((e.clientY - tr.top) / tr.height) * 100))));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = 1 - (r.bottom - 0) / (vh + r.height);
        const clamped = Math.min(1, Math.max(0, p));
        el.style.setProperty("--p", String(clamped));
        const pct = el.querySelector<HTMLElement>("[data-pct]");
        if (pct) pct.textContent = `${Math.round(clamped * 100)}%`;
      });
    };

    // Scroll-reveal: the stage's copy slides in the first time it is on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) el.classList.add("in");
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    return () => {
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`stage scene-${scene}`} aria-label={label}>
      {children}
    </section>
  );
}
