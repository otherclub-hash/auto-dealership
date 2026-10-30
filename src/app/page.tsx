import AskBox from "@/components/AskBox";
import DoorCard from "@/components/DoorCard";
import Icon from "@/components/Icons";
import Particles from "@/components/Particles";
import SceneNav from "@/components/SceneNav";
import { Clouds, Mountains, Sailboat, Shimmer, Shoreline, Stars, Windmill } from "@/components/Scenery";
import Stage from "@/components/Stage";
import Vehicle, { vehicleRatio } from "@/components/Vehicles";
import { tenant, type Scene } from "@/config/tenant";

const DOOR_ICONS = ["shop", "sell", "service", "parts", "visit"] as const;

const NAV = [
  { id: "home", label: "Lakeshore" },
  { id: "ask", label: "Ask us" },
  { id: "westwind", label: "Westwind" },
  { id: "woodsaaron", label: "Woods-Aaron" },
  { id: "ia", label: "Interbachen-Antverp" },
  { id: "radium", label: "Radium" },
  { id: "locations", label: "Visit us" },
];

function scene(id: Scene["id"]) {
  const s = tenant.scenes.find((x) => x.id === id);
  if (!s) throw new Error(`Missing scene ${id}`);
  return s;
}

function Copy({ s }: { s: Scene }) {
  return (
    <div className="copy">
      <p className="eyebrow">
        {s.brand} · {s.segment}
      </p>
      <h2>{s.headline}</h2>
      <p className="lede">{s.line}</p>
      <ul className="perks">
        {s.perks.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <a className="btn" href="#locations">
        <span>{s.cta}</span>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12 H19 M13 6 L19 12 L13 18" />
        </svg>
      </a>
    </div>
  );
}

export default function Home() {
  const ww = scene("westwind");
  const wa = scene("woodsaaron");
  const ia = scene("ia");
  const ra = scene("radium");

  return (
    <>
      <SceneNav items={NAV} />

      {/* GROUP: lakeside dusk. The one idea: a straight answer, then five doors. */}
      <Stage id="home" scene="group" label={tenant.group}>
        <div className="sky" aria-hidden="true" />
        <Stars />
        <div className="moon" aria-hidden="true" />
        <Shoreline />
        <div className="lake" aria-hidden="true">
          <Shimmer />
        </div>
        <Sailboat />
        <Particles color="#f2b45a" count={46} drift={[0.05, -0.18]} size={2.4} />
        <div className="hero-copy">
          <p className="eyebrow">Family owned. Three generations.</p>
          <h1>{tenant.group}</h1>
          <p className="lede">{tenant.tagline}</p>
          <p className="prompt">What do you need today?</p>
          <ul className="doors">
            {tenant.intents.map((d, i) => (
              <li key={d.label}>
                <DoorCard href={d.href}>
                  <Icon name={DOOR_ICONS[i]} className="door-icon" />
                  <strong>{d.label}</strong>
                  <span>{d.hint}</span>
                </DoorCard>
              </li>
            ))}
          </ul>
        </div>
        <a className="down" href="#ask">
          <span className="sr">Scroll to our brands</span>
          <span aria-hidden="true">↓</span>
        </a>
      </Stage>

      {/* ASK: straight answers from the dealer's own price list. */}
      <section id="ask" className="ask" aria-label="Ask us about service or parts">
        <div className="ask-head">
          <p className="eyebrow">Straight answers</p>
          <h2>Ask about service or parts.</h2>
          <p className="lede">Your price, from our own price list, in seconds. Then book it, or have a person call you.</p>
        </div>
        <AskBox />
        <p className="ask-note">Answers come from our posted prices. A person confirms every appointment.</p>
      </section>

      {/* WESTWIND: the horizon. One idea: the sun rises and the car drives as you scroll. */}
      <Stage id="westwind" scene="westwind" label={ww.brand}>
        <div className="sunwrap" aria-hidden="true">
          <div className="sun" />
        </div>
        <Clouds />
        <div className="ground" aria-hidden="true" />
        <Windmill className="wm1" />
        <Windmill className="wm2" />
        <Windmill className="wm3" />
        <div className="roadstrip" aria-hidden="true" />
        <div className="rig drive" style={{ aspectRatio: vehicleRatio("sedan") }}>
          <Vehicle kind="sedan" />
        </div>
        <Copy s={ww} />
      </Stage>

      {/* WOODS-AARON: the long road. One idea: headlights cut through the pines. */}
      <Stage id="woodsaaron" scene="woodsaaron" label={wa.brand}>
        <div className="glow" aria-hidden="true" />
        <Mountains />
        <div className="pines far" aria-hidden="true" />
        <div className="pines mid" aria-hidden="true" />
        <div className="gravel" aria-hidden="true" />
        <div className="rig idle beams" style={{ aspectRatio: vehicleRatio("pickup") }}>
          <Vehicle kind="pickup" />
        </div>
        <div className="pines near" aria-hidden="true" />
        <Particles color="#e08a4b" count={38} drift={[0.2, -0.2]} size={2.6} />
        <Copy s={wa} />
      </Stage>

      {/* IA: the spotlight. One idea: your pointer is the light that reveals the car. */}
      <Stage id="ia" scene="ia" label={ia.brand}>
        <div className="beam" aria-hidden="true" />
        <Particles color="#d9bf7a" count={30} drift={[0.02, -0.08]} size={1.6} />
        <div className="rig floor" style={{ aspectRatio: vehicleRatio("coupe") }}>
          <Vehicle kind="coupe" className="ghost" decorative />
          <Vehicle kind="coupe" className="revealed" />
        </div>
        <Copy s={ia} />
      </Stage>

      {/* RADIUM: the charge. One idea: a ring fills as you scroll while the car waits on a grid. */}
      <Stage id="radium" scene="radium" label={ra.brand}>
        <div className="horizon" aria-hidden="true" />
        <div className="gridfloor" aria-hidden="true" />
        <Particles color="#47e6ff" count={52} drift={[0, -0.4]} size={2} />
        <div className="ringwrap">
          <svg className="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="track" />
            <circle cx="60" cy="60" r="52" className="fill" pathLength="1" />
          </svg>
          <div className="pct" aria-hidden="true">
            <strong data-pct>50%</strong>
            <span>charged</span>
          </div>
        </div>
        <div className="rig floor ev" style={{ aspectRatio: vehicleRatio("ev") }}>
          <Vehicle kind="ev" />
        </div>
        <Copy s={ra} />
      </Stage>

      <section id="locations" className="locations" aria-label="Locations">
        <h2>Five places to find us</h2>
        <ul>
          {tenant.locations.map((l) => (
            <li key={l.name}>
              <Icon name="visit" className="loc-icon" />
              <strong>{l.name}</strong>
              <span>{l.town}</span>
              <span>{l.role}</span>
            </li>
          ))}
        </ul>
        <p className="note">
          Demonstration build. Inventory, service pricing, booking and the dealer dashboard come next.
        </p>
      </section>
    </>
  );
}
