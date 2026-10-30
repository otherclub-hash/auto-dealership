export type VehicleKind = "sedan" | "pickup" | "coupe" | "ev";

// Cut-out concept vehicles (fictional designs, all facing right). Intrinsic sizes keep layout stable.
const SIZES: Record<VehicleKind, { w: number; h: number; alt: string }> = {
  sedan: { w: 589, h: 197, alt: "Westwind Aurelia midsize sedan in pearl white" },
  pickup: { w: 586, h: 226, alt: "Woods-Aaron Ridgeback pickup truck in copper orange" },
  coupe: { w: 579, h: 179, alt: "Interbachen-Antverp coupe in champagne gold" },
  ev: { w: 590, h: 213, alt: "Radium One electric crossover in midnight blue" },
};

export default function Vehicle({ kind, className, decorative = false }: { kind: VehicleKind; className?: string; decorative?: boolean }) {
  const s = SIZES[kind];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/vehicles/${kind}.png`}
      width={s.w}
      height={s.h}
      alt={decorative ? "" : s.alt}
      aria-hidden={decorative ? true : undefined}
      decoding="async"
      draggable={false}
    />
  );
}

export const vehicleRatio = (kind: VehicleKind) => `${SIZES[kind].w} / ${SIZES[kind].h}`;
