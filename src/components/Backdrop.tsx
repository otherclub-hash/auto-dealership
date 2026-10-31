"use client";

import { useEffect } from "react";
import { BACKDROPS, type BackdropKey } from "@/data/backdrops";

// Photo layer behind a scene, with the photographer credit Unsplash asks for.
export default function Backdrop({ k }: { k: BackdropKey }) {
  const b = BACKDROPS[k];
  useEffect(() => {
    // Unsplash wants a download ping when a photo is used; the key stays on the server.
    fetch(`/api/backdrop?id=${b.id}`, { method: "POST" }).catch(() => {});
  }, [b.id]);
  return (
    <>
      <div
        className="bd"
        aria-hidden="true"
        style={{ backgroundImage: `url(${b.src}?w=1920&q=75&fit=crop&auto=format)`, backgroundPosition: b.position }}
      />
      <p className="credit">
        Photo by <a href={b.profile} target="_blank" rel="noreferrer">{b.photographer}</a> on{" "}
        <a href="https://unsplash.com/?utm_source=lakeshore_auto_family&utm_medium=referral" target="_blank" rel="noreferrer">Unsplash</a>
      </p>
    </>
  );
}
