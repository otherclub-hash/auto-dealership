import Particles from "@/components/Particles";
import Stage from "@/components/Stage";
import { tenant, type Scene } from "@/config/tenant";

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
      <a className="btn" href="#locations">
        {s.cta}
      </a>
    </div>
  );
}

function Car({ className }: { className?: string }) {
  // Placeholder silhouette until real vehicle photography is licensed.
  return (
    <svg className={className} viewBox="0 0 600 180" role="img" aria-label="Vehicle silhouette">
      <path
        d="M20 130 C20 112 40 104 70 100 L150 86 C190 52 240 38 300 38 C360 38 410 52 450 86 L520 98 C560 104 580 114 580 130 L580 146 L20 146 Z"
        fill="currentColor"
      />
      <circle cx="132" cy="146" r="30" fill="currentColor" />
      <circle cx="468" cy="146" r="30" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const ww = scene("westwind");
  const wa = scene("woodsaaron");
  const ia = scene("ia");
  const ra = scene("radium");

  return (
    <>
      {/* GROUP: lakeside dusk. The one idea: a straight answer, then five doors. */}
      <Stage scene="group" label={tenant.group}>
        <div className="sky" aria-hidden="true" />
        <div className="lake" aria-hidden="true" />
        <Particles color="#f2b45a" count={46} drift={[0.05, -0.18]} size={2.4} />
        <div className="hero-copy">
          <p className="eyebrow">Family owned. Three generations.</p>
          <h1>{tenant.group}</h1>
          <p className="lede">{tenant.tagline}</p>
          <p className="prompt">What do you need today?</p>
          <ul className="doors">
            {tenant.intents.map((d) => (
              <li key={d.label}>
                <a href={d.href} className="door">
                  <strong>{d.label}</strong>
                  <span>{d.hint}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="down" href="#brands">
          <span className="sr">Scroll to our brands</span>
          <span aria-hidden="true">↓</span>
        </a>
      </Stage>

      <div id="brands" />

      {/* WESTWIND: the horizon. One idea: the sun rises as you scroll. */}
      <Stage scene="westwind" label={ww.brand}>
        <div className="sunwrap" aria-hidden="true">
          <div className="sun" />
        </div>
        <div className="ground" aria-hidden="true" />
        <svg className="road" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="170,0 230,0 400,200 0,200" fill="#0a1626" />
          <polygon points="198,0 202,0 214,200 186,200" fill="#f7d58a" />
        </svg>
        <Copy s={ww} />
      </Stage>

      {/* WOODS-AARON: the long road. One idea: pines drift past, copper dust rises. */}
      <Stage scene="woodsaaron" label={wa.brand}>
        <div className="glow" aria-hidden="true" />
        <div className="pines far" aria-hidden="true" />
        <div className="pines mid" aria-hidden="true" />
        <div className="pines near" aria-hidden="true" />
        <Particles color="#e08a4b" count={38} drift={[0.2, -0.2]} size={2.6} />
        <Copy s={wa} />
      </Stage>

      {/* IA: the spotlight. One idea: your pointer is the light that reveals the car. */}
      <Stage scene="ia" label={ia.brand}>
        <div className="beam" aria-hidden="true" />
        <Car className="ghost" />
        <Car className="revealed" />
        <Copy s={ia} />
      </Stage>

      {/* RADIUM: the charge. One idea: a ring fills as you scroll. */}
      <Stage scene="radium" label={ra.brand}>
        <div className="horizon" aria-hidden="true" />
        <Particles color="#47e6ff" count={52} drift={[0, -0.4]} size={2} />
        <svg className="ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="track" />
          <circle cx="60" cy="60" r="52" className="fill" pathLength="1" />
        </svg>
        <Copy s={ra} />
      </Stage>

      <section id="locations" className="locations" aria-label="Locations">
        <h2>Five places to find us</h2>
        <ul>
          {tenant.locations.map((l) => (
            <li key={l.name}>
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
