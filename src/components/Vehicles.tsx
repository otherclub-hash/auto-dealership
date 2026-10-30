import { PHOTOS, REAR, type PhotoKey } from "@/data/catalog";

export type VehicleKind = PhotoKey;

// Cut-out concept vehicles (fictional designs). Side views face right. Intrinsic sizes keep layout stable.
const SIDE: Record<VehicleKind, { w: number; h: number; alt: string }> = {
  sedan: { w: 589, h: 197, alt: "Westwind Aurelia midsize sedan in pearl white" },
  pickup: { w: 586, h: 226, alt: "Woods-Aaron Ridgeback pickup truck in copper orange" },
  coupe: { w: 579, h: 179, alt: "Interbachen-Antverp coupe in champagne gold" },
  ev: { w: 590, h: 213, alt: "Radium One electric crossover in midnight blue" },
};

export const sidePhoto = (k: VehicleKind) => ({ src: `/vehicles/${k}.png`, w: SIDE[k].w, h: SIDE[k].h });
export const vehicleRatio = (kind: VehicleKind) => `${SIDE[kind].w} / ${SIDE[kind].h}`;

/**
 * All three views stacked; CSS shows the one matching the stage's data-view (side by default).
 * `decorative` hides the set from assistive tech (used for the dim layer in the spotlight scene).
 */
export default function VehicleViews({ kind, className, decorative = false }: { kind: VehicleKind; className?: string; decorative?: boolean }) {
  const side = sidePhoto(kind);
  const front = PHOTOS[kind];
  const rear = REAR[kind];
  const alt = (v: string) => (decorative ? "" : `${SIDE[kind].alt}, ${v} view`);
  return (
    <span className={`views3 ${className ?? ""}`} aria-hidden={decorative ? true : undefined}>
      {/* eslint-disable @next/next/no-img-element */}
      <img className="v-side" src={side.src} width={side.w} height={side.h} alt={alt("side")} decoding="async" draggable={false} />
      <img className="v-front" src={front.src} width={front.w} height={front.h} alt={alt("front")} decoding="async" draggable={false} />
      <img className="v-rear" src={rear.src} width={rear.w} height={rear.h} alt={alt("rear")} decoding="async" draggable={false} />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
