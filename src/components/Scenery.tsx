// Decorative scenery. Everything here is aria-hidden art; colors are solid so nothing washes out text.

export function Stars() {
  const pts = Array.from({ length: 36 }, (_, i) => ({
    x: (i * 53) % 100,
    y: (i * 29) % 46,
    r: 0.6 + ((i * 7) % 5) * 0.25,
    d: (i % 7) * 0.6,
  }));
  return (
    <svg className="stars" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r * 0.2} fill="#ffffff" style={{ animationDelay: `${p.d}s` }} />
      ))}
    </svg>
  );
}

export function Shoreline() {
  return (
    <svg className="shoreline" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 120 L0 70 L40 50 L70 72 L110 38 L150 74 L200 46 L240 78 L300 54 L360 80 L420 42 L470 76 L540 50 L600 82 L660 44 L720 78 L790 52 L850 80 L920 40 L980 76 L1050 54 L1110 80 L1160 58 L1200 74 L1200 120 Z" fill="#0a1220" />
    </svg>
  );
}

export function Shimmer() {
  return (
    <div className="shimmer" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} style={{ top: `${8 + i * 10}%`, width: `${70 - i * 6}%`, animationDelay: `${i * 0.35}s` }} />
      ))}
    </div>
  );
}

export function Sailboat() {
  return (
    <svg className="sailboat" viewBox="0 0 80 70" aria-hidden="true">
      <path d="M38 4 L38 48 L8 48 Z" fill="#f6e3c0" />
      <path d="M42 14 L42 48 L66 48 Z" fill="#e9c58b" />
      <path d="M4 52 L76 52 L66 62 L14 62 Z" fill="#0a1220" />
    </svg>
  );
}

export function Windmill({ className }: { className?: string }) {
  return (
    <svg className={`windmill ${className ?? ""}`} viewBox="0 0 100 160" aria-hidden="true">
      <polygon points="47,70 53,70 56,160 44,160" fill="#f3f6fb" />
      <g className="blades">
        <g transform="translate(50 66)">
          {[0, 120, 240].map((a) => (
            <path key={a} d="M-2 0 L2 0 L1 -56 L-1 -56 Z" fill="#ffffff" transform={`rotate(${a})`} />
          ))}
          <circle r="4" fill="#cfd8e6" />
        </g>
      </g>
    </svg>
  );
}

export function Clouds() {
  return (
    <div className="clouds" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <svg key={i} className={`cloud c${i}`} viewBox="0 0 200 70">
          <ellipse cx="60" cy="46" rx="48" ry="20" fill="#ffffff" />
          <ellipse cx="104" cy="34" rx="46" ry="24" fill="#ffffff" />
          <ellipse cx="146" cy="46" rx="42" ry="19" fill="#ffffff" />
        </svg>
      ))}
    </div>
  );
}

export function Mountains() {
  return (
    <svg className="mountains" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 300 L0 190 L120 120 L220 190 L340 90 L470 200 L590 130 L720 210 L860 100 L990 200 L1100 140 L1200 190 L1200 300 Z" fill="#26362c" />
      <path d="M0 300 L0 230 L160 170 L300 240 L450 160 L600 250 L780 180 L940 250 L1080 190 L1200 240 L1200 300 Z" fill="#1a281f" />
    </svg>
  );
}
