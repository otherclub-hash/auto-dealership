"use client";

import { useEffect, useRef, useState } from "react";
import { PHOTOS, REAR, type PhotoKey } from "@/data/catalog";
import { sidePhoto } from "@/components/Vehicles";

const VIEWS = ["side", "front", "rear"] as const;
type View = (typeof VIEWS)[number];

/**
 * Switches the vehicle view for its stage by setting data-view on the closest .stage.
 * Works by tap, by swipe on the stage, and with the left and right arrow keys while a button has focus.
 */
export default function ViewSwitch({ kind }: { kind: PhotoKey }) {
  const [view, setView] = useState<View>("side");
  const root = useRef<HTMLDivElement>(null);

  const apply = (v: View) => {
    setView(v);
    root.current?.closest<HTMLElement>(".stage")?.setAttribute("data-view", v);
  };

  useEffect(() => {
    const stage = root.current?.closest<HTMLElement>(".stage");
    if (!stage) return;
    let x0 = 0;
    let y0 = 0;
    const down = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const up = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const cur = (stage.getAttribute("data-view") as View) || "side";
      const i = VIEWS.indexOf(cur);
      const next = VIEWS[(i + (dx < 0 ? 1 : VIEWS.length - 1)) % VIEWS.length];
      stage.setAttribute("data-view", next);
      setView(next);
    };
    stage.addEventListener("touchstart", down, { passive: true });
    stage.addEventListener("touchend", up, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", down);
      stage.removeEventListener("touchend", up);
    };
  }, []);

  const src: Record<View, string> = { side: sidePhoto(kind).src, front: PHOTOS[kind].src, rear: REAR[kind].src };

  return (
    <div
      ref={root}
      className="views"
      role="group"
      aria-label="Vehicle view"
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const i = VIEWS.indexOf(view);
        apply(VIEWS[(i + (e.key === "ArrowRight" ? 1 : VIEWS.length - 1)) % VIEWS.length]);
      }}
    >
      {VIEWS.map((v) => (
        <button key={v} type="button" className={`vbtn ${view === v ? "on" : ""}`} aria-pressed={view === v} onClick={() => apply(v)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src[v]} alt="" aria-hidden="true" draggable={false} />
          <span>{v === "side" ? "Side" : v === "front" ? "Front" : "Rear"}</span>
        </button>
      ))}
    </div>
  );
}
