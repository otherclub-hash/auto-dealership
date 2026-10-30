"use client";

import { useEffect, useRef } from "react";

type Props = {
  color: string;
  count?: number;
  /** Drift direction in pixels per frame: [x, y] */
  drift?: [number, number];
  size?: number;
};

type P = { x: number; y: number; r: number; v: number; a: number };

export default function Particles({ color, count = 40, drift = [0, -0.25], size = 2.2 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (0.4 + Math.random()) * size,
        v: 0.4 + Math.random() * 0.9,
        a: 0.35 + Math.random() * 0.65,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of parts) {
        if (!reduce) {
          p.x += drift[0] * p.v;
          p.y += drift[1] * p.v;
          if (p.y < -4) p.y = h + 4;
          if (p.y > h + 4) p.y = -4;
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
        }
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, count, drift, size]);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
