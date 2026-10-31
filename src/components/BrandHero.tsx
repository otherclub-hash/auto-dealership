import HeroAsk from "@/components/HeroAsk";
import Backdrop from "@/components/Backdrop";
import Particles from "@/components/Particles";
import Photo from "@/components/Photo";
import Stage from "@/components/Stage";
import VehicleViews, { vehicleRatio } from "@/components/Vehicles";
import ViewSwitch from "@/components/ViewSwitch";
import { BRAND_SITE, SLUG, type BrandKey } from "@/config/brands";
import { tenant } from "@/config/tenant";

function Copy({ id, onBrandPage }: { id: BrandKey; onBrandPage: boolean }) {
  const s = tenant.scenes.find((x) => x.id === id)!;
  const href = onBrandPage ? "#models" : `/${SLUG[id]}`;
  const Title = onBrandPage ? "h1" : "h2";
  return (
    <div className="copy">
      <p className="eyebrow">
        {s.brand} · {s.segment}
      </p>
      <Title>{s.headline}</Title>
      <p className="lede">{s.line}</p>
      <ul className="perks">
        {s.perks.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="cta-row">
        <a className="btn withphoto" href={href}>
          <Photo k={s.photo} className="btnphoto" />
          <span>{onBrandPage ? `See the ${s.brand} lineup` : s.cta}</span>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12 H19 M13 6 L19 12 L13 18" />
          </svg>
        </a>
        <ViewSwitch kind={s.photo} />
      </div>
      {onBrandPage && <HeroAsk placeholder={`Ask about sales, service, or parts`} examples={BRAND_SITE[id].asks} />}
    </div>
  );
}

// One cinematic scene per brand. The home page links each to its own site; the brand site opens with the same scene.
export default function BrandHero({ id, onBrandPage = false }: { id: BrandKey; onBrandPage?: boolean }) {
  const s = tenant.scenes.find((x) => x.id === id)!;
  const stageId = onBrandPage ? "top" : id;
  return (
    <Stage id={stageId} scene={id} label={s.brand}>
      {id === "westwind" && (
        <>
          <Backdrop k="westwind" />
          <div className="roadstrip" aria-hidden="true" />
          <div className="rig drive" style={{ aspectRatio: vehicleRatio("sedan") }}>
            <VehicleViews kind="sedan" />
          </div>
        </>
      )}
      {id === "woodsaaron" && (
        <>
          <Backdrop k="woodsaaron" />
          <div className="gravel" aria-hidden="true" />
          <div className="rig idle beams" style={{ aspectRatio: vehicleRatio("pickup") }}>
            <VehicleViews kind="pickup" />
          </div>
          <div className="pines near" aria-hidden="true" />
          <Particles color="#e08a4b" count={38} drift={[0.2, -0.2]} size={2.6} />
        </>
      )}
      {id === "ia" && (
        <>
          <div className="beam" aria-hidden="true" />
          <Particles color="#d9bf7a" count={30} drift={[0.02, -0.08]} size={1.6} />
          <div className="rig floor" style={{ aspectRatio: vehicleRatio("coupe") }}>
            <VehicleViews kind="coupe" className="ghost" decorative />
            <VehicleViews kind="coupe" className="revealed" />
          </div>
        </>
      )}
      {id === "radium" && (
        <>
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
            <VehicleViews kind="ev" />
          </div>
        </>
      )}
      <Copy id={id} onBrandPage={onBrandPage} />
    </Stage>
  );
}
