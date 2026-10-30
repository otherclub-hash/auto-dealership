"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * A road with a little car on it: the progress object. Dots jump between scenes;
 * arrow keys and Page Up/Down do the same.
 */
export default function SceneNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id));

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      els.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (r.top < mid && r.bottom > mid) {
          best = idx;
          bestDist = -1;
        } else if (bestDist >= 0 && d < bestDist) {
          best = idx;
          bestDist = d;
        }
      });
      setActive(best);
    };

    const go = (idx: number) => {
      const el = els[Math.min(els.length - 1, Math.max(0, idx))];
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", onKey);
    };
  }, [items, active]);

  return (
    <nav className="rail" aria-label="Scenes">
      <div className="rail-road" aria-hidden="true">
        <div className="rail-car" style={{ top: `${progress * 100}%` }}>
          <svg viewBox="0 0 24 40" width="22" height="36">
            <rect x="4" y="2" width="16" height="36" rx="7" fill="#f2b45a" stroke="#ffffff" strokeWidth="2" />
            <rect x="7" y="9" width="10" height="8" rx="2" fill="#0b1424" />
            <rect x="7" y="24" width="10" height="6" rx="2" fill="#0b1424" />
          </svg>
        </div>
      </div>
      <ul>
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={i === active ? "dot on" : "dot"}
              aria-label={it.label}
              aria-current={i === active ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="dot-tip">{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
