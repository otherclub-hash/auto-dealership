type IconProps = { name: "shop" | "sell" | "service" | "parts" | "visit"; className?: string };

// Duotone door icons. Strokes and fills are solid; the amber accent comes from the group palette.
export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {name === "shop" && (
        <g strokeWidth="2.5">
          <path d="M5 30 C5 26 8 24 13 23 L19 17 C22 14 26 13 30 13 C35 13 38 15 41 19 L43 23 C45 24 45 26 45 29 L45 33 L5 33 Z" fill="#f2b45a" stroke="#ffffff" />
          <path d="M20 18 L30 18 C33 18 35 20 37 23 L20 23 Z" fill="#14233f" stroke="none" />
          <circle cx="14" cy="34" r="5" fill="#14233f" stroke="#ffffff" />
          <circle cx="36" cy="34" r="5" fill="#14233f" stroke="#ffffff" />
        </g>
      )}
      {name === "sell" && (
        <g strokeWidth="2.5">
          <path d="M8 24 L24 8 L40 8 L40 24 L24 40 Z" fill="#f2b45a" stroke="#ffffff" />
          <circle cx="33" cy="15" r="3" fill="#14233f" stroke="#ffffff" />
          <path d="M20 26 C20 23 28 24 28 21 C28 18 20 19 20 21 M24 16 L24 29" stroke="#14233f" strokeWidth="2.5" />
        </g>
      )}
      {name === "service" && (
        <g strokeWidth="2.5">
          <path d="M24 5 C24 5 11 20 11 29 C11 36 17 42 24 42 C31 42 37 36 37 29 C37 20 24 5 24 5 Z" fill="#f2b45a" stroke="#ffffff" />
          <path d="M18 30 C18 34 21 36 24 36" stroke="#14233f" />
          <path d="M33 8 L41 16 M38 6 C42 8 44 12 42 16 L38 12 Z" stroke="#ffffff" />
        </g>
      )}
      {name === "parts" && (
        <g strokeWidth="2.5" stroke="#ffffff">
          <circle cx="24" cy="24" r="11" fill="#f2b45a" />
          <circle cx="24" cy="24" r="4.5" fill="#14233f" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <rect key={a} x="21.5" y="4" width="5" height="7" rx="1.5" fill="#ffffff" stroke="none" transform={`rotate(${a} 24 24)`} />
          ))}
        </g>
      )}
      {name === "visit" && (
        <g strokeWidth="2.5">
          <path d="M24 44 C24 44 9 29 9 19 C9 11 16 5 24 5 C32 5 39 11 39 19 C39 29 24 44 24 44 Z" fill="#f2b45a" stroke="#ffffff" />
          <circle cx="24" cy="19" r="6" fill="#14233f" stroke="#ffffff" />
        </g>
      )}
    </svg>
  );
}
