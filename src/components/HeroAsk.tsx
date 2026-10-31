"use client";

import { useState } from "react";

// Compact Ask bar for a brand hero. It hands the question to the full Ask panel lower on the page.
export default function HeroAsk({ placeholder, examples }: { placeholder: string; examples: string[] }) {
  const [q, setQ] = useState("");
  const go = (text: string) => {
    const t = text.trim();
    if (!t) return;
    document.getElementById("ask")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("lakeshore-ask", { detail: t }));
  };
  return (
    <div className="heroask">
      <form
        className="askbar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <label htmlFor="hero-q" className="sr">Ask about sales, service, or parts</label>
        <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} autoComplete="off" enterKeyHint="search" />
        <button type="submit" className="btn">Ask</button>
      </form>
      <ul className="chips" aria-label="Examples">
        {examples.slice(0, 2).map((ex) => (
          <li key={ex}>
            <button type="button" className="chip" onClick={() => go(ex)}>{ex}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
