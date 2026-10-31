import AskBox from "@/components/AskBox";
import Backdrop from "@/components/Backdrop";
import Particles from "@/components/Particles";
import BrandHero from "@/components/BrandHero";
import DoorCard from "@/components/DoorCard";
import Icon from "@/components/Icons";
import SceneNav from "@/components/SceneNav";
import Stage from "@/components/Stage";
import { tenant } from "@/config/tenant";

const DOOR_ICONS = ["shop", "sell", "service", "parts", "visit"] as const;

const NAV = [
  { id: "home", label: "Lakeshore" },
  { id: "westwind", label: "Westwind" },
  { id: "woodsaaron", label: "Woods-Aaron" },
  { id: "ia", label: "Interbachen-Antverp" },
  { id: "radium", label: "Radium" },
  { id: "locations", label: "Visit us" },
];

export default function Home() {
  return (
    <>
      <SceneNav items={NAV} />

      {/* GROUP: lakeside dusk. The one idea: a straight answer, then five doors. */}
      <Stage id="home" scene="group" label={tenant.group}>
        <Backdrop k="group" />
        <Particles color="#f2b45a" count={46} drift={[0.05, -0.18]} size={2.4} />
        <div className="hero-copy hero-split">
          <div className="hero-head">
            <p className="eyebrow">Family owned. Three generations.</p>
            <h1>{tenant.group}</h1>
            <p className="lede">{tenant.tagline}</p>
          </div>
          <div className="hero-left">
            <p className="prompt">What do you need today?</p>
            <ul className="doors">
              {tenant.intents.map((d, i) => (
                <li key={d.label}>
                  <DoorCard href={d.href}>
                    <Icon name={DOOR_ICONS[i]} className="door-icon" />
                    <span className="dtext">
                      <strong>{d.label}</strong>
                      <span>{d.hint}</span>
                    </span>
                  </DoorCard>
                </li>
              ))}
            </ul>
          </div>
          <section id="ask" className="hero-ask" aria-label="Ask us about sales, service, or parts">
            <h2>Ask about sales, service, or parts.</h2>
            <p className="ask-lede">Looking for a new or used car? Tell us what you want. You can ask if a certain vehicle is still available, what a service costs, or if we have a part.</p>
            <AskBox />
            <p className="ask-note">Answers come from our posted prices. A person confirms every appointment.</p>
          </section>
        </div>
        <a className="down" href="#westwind">
          <span className="sr">Scroll to our brands</span>
          <span aria-hidden="true">↓</span>
        </a>
      </Stage>

      <BrandHero id="westwind" />
      <BrandHero id="woodsaaron" />
      <BrandHero id="ia" />
      <BrandHero id="radium" />

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
