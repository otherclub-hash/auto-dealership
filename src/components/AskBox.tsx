"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Photo from "@/components/Photo";
import type { PhotoKey } from "@/data/catalog";
import { answer, money, type Answer, type Row } from "@/lib/ask";

const EXAMPLES = [
  "Oil change for a 2019 Ridgeback",
  "How much for brakes on my Boundary?",
  "Oil filter for a Tamarack",
  "Tire rotation Aurelia",
  "Used 3-row SUV under $40,000",
  "Is a new Ridgeback still available?",
];

type Garage = { name: string; contact: string; vehicle: string };
type Mode = { type: "book"; row: Row; vehicle: string; store: string } | { type: "callback"; topic: string; question: string } | null;

const GARAGE_KEY = "lakeshore-garage";

function slots() {
  const out: { day: string; times: string[] }[] = [];
  const d = new Date();
  while (out.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    const label = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    out.push({ day: label, times: d.getDay() === 6 ? ["8:30 AM", "10:30 AM", "12:00 PM"] : ["7:30 AM", "10:00 AM", "1:00 PM", "3:30 PM"] });
  }
  return out;
}

export default function AskBox() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Answer | null>(null);
  const [asked, setAsked] = useState("");
  const [mode, setMode] = useState<Mode>(null);
  const [days, setDays] = useState<{ day: string; times: string[] }[]>([]);
  const [when, setWhen] = useState("");
  const [done, setDone] = useState<{ id: string; summary: string; name: string; contact: string; vehicle: string; photo?: PhotoKey } | null>(null);
  const [saved, setSaved] = useState<"idle" | "yes" | "no">("idle");
  const [garage, setGarage] = useState<Garage | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDays(slots());
    try {
      const raw = localStorage.getItem(GARAGE_KEY);
      if (raw) setGarage(JSON.parse(raw) as Garage);
    } catch {
      /* storage can be unavailable; the site works without it */
    }
  }, []);

  const run = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setQ(t);
    setAsked(t);
    setRes(answer(t));
    setMode(null);
    setDone(null);
    setError("");
    requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  const vehicleOf = useMemo(() => (res && res.kind === "quote" ? res.vehicle : ""), [res]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!mode) return;
    const f = new FormData(e.currentTarget);
    const body = {
      kind: mode.type === "book" ? "book" : mode.topic === "sales" ? "sales" : "callback",
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      when: mode.type === "book" ? when : "",
      note: mode.type === "book" ? `${mode.row.title}: ${money(mode.row.price)} for ${mode.vehicle}` : mode.question,
      consent: f.get("consent") === "on",
      website: String(f.get("website") ?? ""),
    };
    if (mode.type === "book" && !when) {
      setError("Please pick a day and time.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = (await r.json()) as { ok: boolean; id?: string; error?: string };
      if (!j.ok) {
        setError(j.error ?? "Something went wrong. Please try again.");
      } else {
        setDone({
          id: j.id ?? "",
          summary: mode.type === "book" ? `${mode.row.title} for your ${mode.vehicle}, ${when}` : "An advisor will reach out about your question.",
          name: body.name,
          contact: body.phone || body.email,
          vehicle: mode.type === "book" ? mode.vehicle : "",
          photo: mode.type === "book" && res && res.kind === "quote" ? res.photo : undefined,
        });
        setMode(null);
        setSaved("idle");
      }
    } catch {
      setError("We could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function remember() {
    if (!done) return;
    const g: Garage = { name: done.name, contact: done.contact, vehicle: done.vehicle };
    try {
      localStorage.setItem(GARAGE_KEY, JSON.stringify(g));
    } catch {
      /* ignore */
    }
    setGarage(g);
    setSaved("yes");
  }

  function forget() {
    try {
      localStorage.removeItem(GARAGE_KEY);
    } catch {
      /* ignore */
    }
    setGarage(null);
  }

  return (
    <div className="ask-inner">
      {garage && (
        <p className="welcome">
          Welcome back, {garage.name.split(" ")[0]}.{" "}
          {garage.vehicle && (
            <button type="button" className="linkbtn" onClick={() => run(`Oil change ${garage.vehicle}`)}>
              Price an oil change for your {garage.vehicle}
            </button>
          )}{" "}
          <button type="button" className="linkbtn quiet" onClick={forget}>
            Forget me on this device
          </button>
        </p>
      )}

      <form
        className="askbar"
        onSubmit={(e) => {
          e.preventDefault();
          run(q);
        }}
        role="search"
      >
        <label htmlFor="ask-q" className="sr">Ask about sales, service, or parts</label>
        <input
          id="ask-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: oil change for a 2019 Ridgeback"
          autoComplete="off"
          enterKeyHint="search"
        />
        <button type="submit" className="btn">Get my price</button>
      </form>

      <ul className="chips" aria-label="Examples">
        {EXAMPLES.map((ex) => (
          <li key={ex}>
            <button type="button" className="chip" onClick={() => run(ex)}>{ex}</button>
          </li>
        ))}
      </ul>

      <div ref={panel} className="result" aria-live="polite">
        {res && (
          <div className="card">
            <p className="you">{asked}</p>

            {res.kind === "quote" && (
              <>
                <div className="qhead">
                  <Photo k={res.photo} className="qphoto" />
                  <div>
                    <h3>{res.heading}</h3>
                    {!res.photoExact && <p className="foot tight">Representative photo of this brand&apos;s lineup.</p>}
                  </div>
                </div>
                <ul className="rows">
                  {res.rows.map((r) => (
                    <li key={r.key} className="qrow">
                      <div>
                        <strong>{r.title}</strong>
                        <span>{r.detail}</span>
                      </div>
                      <div className="qprice">{money(r.price)}</div>
                      <button type="button" className="btn small" onClick={() => { setDone(null); setWhen(""); setMode({ type: "book", row: r, vehicle: res.vehicle, store: res.store }); }}>
                        Book this
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="foot">{res.footnote}</p>
                <p className="foot">At {res.store}. Demonstration prices.</p>
                <p>
                  <button type="button" className="btn ghost" onClick={() => { setDone(null); setMode({ type: "callback", topic: "service", question: `${asked} (${vehicleOf})` }); }}>
                    Have an advisor call me instead
                  </button>
                </p>
              </>
            )}

            {(res.kind === "ask-vehicle" || res.kind === "ask-service") && (
              <>
                <p className="msg">{res.message}</p>
                <ul className="chips">
                  {res.chips.map((c) => (
                    <li key={c.ask}>
                      <button type="button" className="chip withphoto" onClick={() => run(c.ask)}>
                        {c.photo && <Photo k={c.photo} className="chipphoto" />}
                        <span>{c.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {res.kind === "handoff" && (
              <>
                <p className="msg">{res.message}</p>
                <button type="button" className="btn" onClick={() => { setDone(null); setMode({ type: "callback", topic: res.topic, question: asked }); }}>
                  {res.topic === "sales" ? "Have a sales consultant text me" : "Have an advisor reply"}
                </button>
              </>
            )}

            {mode && (
              <form className="leadform" onSubmit={submit}>
                <h4>{mode.type === "book" ? `Book: ${mode.row.title}, ${money(mode.row.price)}` : "Where should we reach you?"}</h4>
                {mode.type === "book" && (
                  <fieldset>
                    <legend>Pick a time at {mode.store}</legend>
                    <div className="days">
                      {days.map((d) => (
                        <div key={d.day} className="day">
                          <span className="dlabel">{d.day}</span>
                          {d.times.map((t) => {
                            const v = `${d.day}, ${t}`;
                            return (
                              <button type="button" key={v} className={`chip ${when === v ? "on" : ""}`} aria-pressed={when === v} onClick={() => setWhen(v)}>{t}</button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </fieldset>
                )}
                <div className="fields">
                  <label>Name<input name="name" required autoComplete="name" /></label>
                  <label>Mobile phone<input name="phone" type="tel" autoComplete="tel" inputMode="tel" /></label>
                  <label>Email (optional if you gave a phone)<input name="email" type="email" autoComplete="email" /></label>
                </div>
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
                <label className="consent">
                  <input name="consent" type="checkbox" required />
                  <span>I agree to be contacted about this request. See the <a href="/privacy">Privacy Policy</a>.</span>
                </label>
                {error && <p className="err" role="alert">{error}</p>}
                <div className="formbtns">
                  <button type="submit" className="btn" disabled={busy}>{busy ? "Sending..." : mode.type === "book" ? "Confirm appointment" : "Send"}</button>
                  <button type="button" className="btn ghost" onClick={() => setMode(null)}>Cancel</button>
                </div>
              </form>
            )}

            {done && (
              <div className="done" role="status">
                <div className="donehead">
                  <div>
                    <h4>You are all set. Reference {done.id}</h4>
                    <p>{done.summary}</p>
                  </div>
                  {done.photo && <Photo k={done.photo} rear className="rearphoto" />}
                </div>
                <p className="foot">Demo mode: this does not create a real appointment or contact a real dealership.</p>
                {done.vehicle && saved === "idle" && (
                  <div className="remember">
                    <p><strong>Want us to remember you?</strong> Save your name and vehicle on this device so next time takes one tap. Optional.</p>
                    <button type="button" className="btn small" onClick={remember}>Yes, remember me</button>{" "}
                    <button type="button" className="btn ghost small" onClick={() => setSaved("no")}>No thanks</button>
                  </div>
                )}
                {saved === "yes" && <p><strong>Saved on this device.</strong> You can forget it any time above.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
