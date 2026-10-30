export type VehicleKind = "sedan" | "pickup" | "coupe" | "ev";

type Spec = {
  body: string;
  glass: string;
  shoulder: string;
  wheels: [number, number];
  head: [number, number];
  tail: [number, number];
};

// Fictional vehicle shapes, all facing right. Viewbox is 600 x 210.
const SPECS: Record<VehicleKind, Spec> = {
  sedan: {
    body: "M30 152 C30 134 52 126 90 120 L170 108 C205 76 255 58 320 58 C385 58 435 74 468 106 L530 116 C566 122 580 134 580 152 L580 168 L30 168 Z",
    glass: "M184 108 C212 84 256 70 306 70 L306 108 Z M322 70 C372 70 414 82 446 106 L322 108 Z",
    shoulder: "M96 124 L170 112 C205 82 255 62 320 62 C385 62 430 78 462 110",
    wheels: [132, 468],
    head: [566, 132],
    tail: [38, 136],
  },
  pickup: {
    body: "M24 112 L226 112 L236 76 C246 58 272 52 302 52 L384 52 C402 52 412 62 420 78 L436 102 L556 106 C574 108 582 120 582 138 L582 168 L24 168 Z",
    glass: "M248 80 C254 68 272 62 298 62 L334 62 L334 100 L242 100 Z M346 62 L384 62 C396 62 402 70 408 82 L418 100 L346 100 Z",
    shoulder: "M240 110 L556 110",
    wheels: [130, 486],
    head: [570, 128],
    tail: [30, 130],
  },
  coupe: {
    body: "M20 150 C20 136 44 130 84 126 L190 114 C230 88 290 70 350 70 C400 70 440 84 474 106 L542 116 C574 122 586 134 586 150 L586 168 L20 168 Z",
    glass: "M206 114 C238 92 288 80 336 80 L336 114 Z M350 80 C392 80 428 90 456 108 L350 114 Z",
    shoulder: "M90 128 L190 116 C230 92 290 74 350 74 C400 74 436 88 468 108",
    wheels: [126, 484],
    head: [574, 134],
    tail: [28, 138],
  },
  ev: {
    body: "M26 152 C26 132 46 122 84 116 L158 102 C190 64 250 50 318 50 C386 50 440 66 476 102 L540 114 C570 120 582 134 582 152 L582 168 L26 168 Z",
    glass: "M174 102 C200 74 252 62 304 62 L304 102 Z M320 62 C372 62 420 74 454 102 L320 102 Z",
    shoulder: "M90 118 L158 104 C190 68 250 54 318 54 C386 54 436 70 470 104",
    wheels: [130, 478],
    head: [572, 130],
    tail: [32, 132],
  },
};

type Props = {
  kind: VehicleKind;
  id: string;
  /** Paint gradient, top then bottom. */
  paint: [string, string];
  glow?: string;
  className?: string;
};

export default function Vehicle({ kind, id, paint, glow = "#fff3c4", className }: Props) {
  const s = SPECS[kind];
  const cy = 160;
  return (
    <svg className={className} viewBox="0 0 600 210" role="img" aria-label={`${kind} illustration`}>
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint[0]} />
          <stop offset="1" stopColor={paint[1]} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#223046" />
          <stop offset="0.6" stopColor="#0d1522" />
          <stop offset="1" stopColor="#3a4c68" />
        </linearGradient>
        <radialGradient id={`${id}-rim`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f4f6fa" />
          <stop offset="0.6" stopColor="#a9b2c0" />
          <stop offset="1" stopColor="#5d6674" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="300" cy="196" rx="278" ry="9" fill="#000000" filter={`url(#${id}-blur)`} />

      <path d={s.body} fill={`url(#${id}-paint)`} />
      <path d={s.glass} fill={`url(#${id}-glass)`} />
      <path d={s.shoulder} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      {kind === "pickup" && <path d="M30 116 L222 116 L222 126 L30 126 Z" fill="#000000" opacity="0.28" />}

      {s.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={cy - 4} r="42" fill="#0a0d14" />
          <g className="wheel">
            <circle cx={cx} cy={cy} r="32" fill="#0c0d11" />
            <circle cx={cx} cy={cy} r="21" fill={`url(#${id}-rim)`} />
            {[0, 72, 144, 216, 288].map((a) => (
              <line
                key={a}
                x1={cx}
                y1={cy}
                x2={cx + 19 * Math.cos((a * Math.PI) / 180)}
                y2={cy + 19 * Math.sin((a * Math.PI) / 180)}
                stroke="#4a5160"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            <circle cx={cx} cy={cy} r="5" fill="#2b303b" />
          </g>
        </g>
      ))}

      <ellipse cx={s.head[0]} cy={s.head[1]} rx="16" ry="7" fill={glow} filter={`url(#${id}-blur)`} />
      <ellipse cx={s.head[0] - 4} cy={s.head[1]} rx="9" ry="4" fill="#ffffff" />
      {kind === "ev" && <rect x="522" y="124" width="58" height="4" rx="2" fill="#47e6ff" />}
      <ellipse cx={s.tail[0]} cy={s.tail[1]} rx="8" ry="4" fill="#ff3b3b" />
    </svg>
  );
}
