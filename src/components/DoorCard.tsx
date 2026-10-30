"use client";

import type { ReactNode } from "react";

/** A door with a little 3D tilt that follows the pointer or finger. */
export default function DoorCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="door"
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--tx", String(y * -10));
        el.style.setProperty("--ty", String(x * 12));
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--tx", "0");
        e.currentTarget.style.setProperty("--ty", "0");
      }}
    >
      {children}
    </a>
  );
}
