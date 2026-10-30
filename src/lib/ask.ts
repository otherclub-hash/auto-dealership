import {
  BRAND_ALIASES, LOCATION_FOR_BRAND, MODELS, OIL, OTHER_MAKES, PARTS, SERVICES,
  type Engine, type Model, type PhotoKey, type ServiceId,
} from "@/data/catalog";

export type Row = {
  key: string;
  title: string;
  detail: string;
  price: number;
  /** Not-to-exceed amount, when quantity can vary. */
  cap?: number;
};

export type Chip = { label: string; ask: string; photo?: PhotoKey };

export type Answer =
  | { kind: "quote"; heading: string; vehicle: string; rows: Row[]; footnote: string; store: string; photo: PhotoKey; photoExact: boolean }
  | { kind: "ask-vehicle"; message: string; chips: Chip[] }
  | { kind: "ask-service"; message: string; chips: Chip[] }
  | { kind: "handoff"; topic: "other-make" | "sales" | "year" | "unknown"; message: string };

export const displayName = (m: Model) =>
  m.name.startsWith(m.brand) ? m.name : `${m.brand} ${m.name}`;

export const money = (n: number) => `$${n.toFixed(2)}`;
const round = (n: number) => Math.round(n * 100) / 100;

function oilPrice(m: Model, e: Engine) {
  const labor = e.diesel ? OIL.labor.diesel : m.cls === "luxury" ? OIL.labor.luxury : OIL.labor.default;
  const perQ = m.cls === "luxury" ? OIL.perQuart.luxury : OIL.perQuart.default;
  const filter = e.diesel ? OIL.filter.diesel : m.cls === "luxury" ? OIL.filter.luxury : e.tags.includes("v8") ? OIL.filter.v8 : OIL.filter.default;
  const price = round(labor + e.quarts * perQ + filter + OIL.fee);
  return { price, cap: round(price + OIL.capQuarts * perQ) };
}

function has(text: string, phrase: string) {
  const p = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "[ -]?");
  return new RegExp(`(^|[^a-z0-9])${p}($|[^a-z0-9])`).test(text);
}

function findModels(text: string): Model[] {
  const direct = MODELS.filter((m) => m.aliases.some((a) => has(text, a)));
  if (direct.length) return direct;
  if (/\b(pickup|pick up|truck)\b/.test(text)) return MODELS.filter((m) => m.id === "ridgeback");
  if (/\b(minivan|mini van|van)\b/.test(text)) return MODELS.filter((m) => m.id === "voyageur");
  if (/\bsedan\b/.test(text)) return MODELS.filter((m) => m.id === "aurelia");
  return [];
}

function findBrand(text: string) {
  return (Object.keys(BRAND_ALIASES) as Model["brandKey"][]).find((k) => BRAND_ALIASES[k].some((a) => has(text, a)));
}

function findService(text: string): ServiceId | undefined {
  return (Object.keys(SERVICES) as ServiceId[]).find((id) => SERVICES[id].keywords.test(text));
}

function chipsForModels(models: Model[], service: string, year?: number): Chip[] {
  return models.map((m) => ({ label: displayName(m), ask: `${service} ${year ?? ""} ${displayName(m)}`.replace(/\s+/g, " ").trim(), photo: m.photo }));
}

const SALES = /\b(lease|financ\w*|payments?|trade[- ]?in|used|pre-?owned|certified|cpo|inventory|test drive|msrp|for sale|buy (a|an|my)|new (car|truck|suv|vehicle|ridgeback|aurelia|tamarack|boundary|voyageur|summit))\b/;

export function answer(raw: string): Answer {
  const text = ` ${raw.toLowerCase().replace(/[^a-z0-9.\- ]/g, " ").replace(/\s+/g, " ").trim()} `.trim();
  const year = Number(text.match(/\b(19[89]\d|20[0-3]\d)\b/)?.[1]) || undefined;
  const service = findService(text);
  const partsIntent = /\bparts?\b|part number|\bbuy\b|in stock|\bfilter\b/.test(text) && !/\bchange\b/.test(text);
  let models = findModels(text);
  const brand = findBrand(text);
  if (!models.length && brand) models = MODELS.filter((m) => m.brandKey === brand);
  const exact = models.length === 1 ? models[0] : undefined;

  // Sales questions go to a person, with context attached.
  if (SALES.test(text) && !service) {
    return {
      kind: "handoff",
      topic: "sales",
      message: "A sales consultant can answer that with current inventory and numbers. Leave a name and number and they will text you the details.",
    };
  }

  // A make we do not carry: say so and offer a person.
  if (!exact && OTHER_MAKES.some((m) => has(text, m))) {
    return {
      kind: "handoff",
      topic: "other-make",
      message: "In this demo we price Westwind, Woods-Aaron, Interbachen-Antverp and Radium. For other makes an advisor can confirm a price quickly.",
    };
  }

  const wantsParts = partsIntent || (/\bfilter\b/.test(text) && !/\bchange\b/.test(text));
  const svc: ServiceId | undefined = service ?? (wantsParts ? (text.includes("oil") ? "oil" : text.includes("cabin") ? "cabin" : undefined) : undefined);
  const label = wantsParts ? "Parts" : service ? SERVICES[service].label : "Oil change";

  if (!svc) {
    if (exact) {
      return {
        kind: "ask-service",
        message: `What do you need for your ${displayName(exact)}?`,
        chips: (Object.keys(SERVICES) as ServiceId[]).map((id) => ({ label: SERVICES[id].label, ask: `${SERVICES[id].label} ${year ?? ""} ${displayName(exact)}`.replace(/\s+/g, " ").trim() })),
      };
    }
    return {
      kind: "handoff",
      topic: "unknown",
      message: "I can price oil changes, tires, brakes, batteries and common parts. Try \"oil change for a 2019 Ridgeback\", or leave a note and an advisor will reply.",
    };
  }

  if (!models.length) {
    const s = OIL;
    const lows = MODELS.filter((m) => !m.engines.every((e) => e.electric)).flatMap((m) => m.engines.filter((e) => !e.electric).map((e) => oilPrice(m, e).price));
    const startingAt = svc === "oil" ? ` Oil changes run from ${money(Math.min(...lows))} to ${money(Math.max(...lows))} depending on the engine.` : "";
    void s;
    return {
      kind: "ask-vehicle",
      message: `Which vehicle?${startingAt} Pick yours for an exact price.`,
      chips: chipsForModels(MODELS, wantsParts ? `${SERVICES[svc].label} part` : SERVICES[svc].label, year),
    };
  }

  if (!exact) {
    return { kind: "ask-vehicle", message: "Which model?", chips: chipsForModels(models, wantsParts ? `${SERVICES[svc].label} part` : SERVICES[svc].label, year) };
  }

  const m = exact;
  if (m.cls === "ev" && svc === "oil") {
    return {
      kind: "ask-service",
      message: `The ${displayName(m)} is electric, so there is no engine oil to change. Popular services for it:`,
      chips: (["rotation", "cabin", "brakes", "battery"] as ServiceId[]).map((id) => ({ label: `${SERVICES[id].label}`, ask: `${SERVICES[id].label} ${year ?? ""} ${displayName(m)}`.replace(/\s+/g, " ").trim() })),
    };
  }

  // Year check against the engines we have in the demo data.
  let engines = m.engines;
  if (year) {
    const inYear = engines.filter((e) => year >= e.years[0] && year <= e.years[1]);
    if (!inYear.length) {
      return {
        kind: "handoff",
        topic: "year",
        message: `In this demo we cover ${displayName(m)} model years ${Math.min(...m.engines.map((e) => e.years[0]))} to ${Math.max(...m.engines.map((e) => e.years[1]))}. An advisor can confirm a ${year}.`,
      };
    }
    engines = inYear;
  }

  // Narrow by anything the customer said about the engine; otherwise show every variant.
  const hinted = engines.filter((e) => e.tags.some((t) => has(text, t)));
  const shown = hinted.length ? hinted : engines;
  const vehicle = `${year ? year + " " : ""}${displayName(m)}`;
  const store = LOCATION_FOR_BRAND[m.brandKey];
  const showAll = shown.length > 1;

  if (wantsParts) {
    const part = PARTS[svc === "oil" ? "oil" : svc];
    if (!part || (svc === "oil" && m.cls === "ev")) {
      return { kind: "handoff", topic: "unknown", message: "An advisor at the parts counter can check that one for you." };
    }
    const rows: Row[] = shown.map((e) => ({
      key: `${m.id}-${e.id}`,
      title: showAll ? `${e.label}` : part.label,
      detail: `${part.label} · Part ${m.brandKey.slice(0, 2).toUpperCase()}-${part.code}-${m.id.toUpperCase()}-${e.id.toUpperCase()} · In stock`,
      price: part.price[m.cls],
    }));
    return {
      kind: "quote", heading: `${part.label} for your ${vehicle}`, vehicle, rows, store, photo: m.photo, photoExact: m.photoExact,
      footnote: "Fit is checked against your vehicle. Pick up in store or ask us to hold it.",
    };
  }

  if (svc === "oil") {
    const rows: Row[] = shown.map((e) => {
      const p = oilPrice(m, e);
      return { key: `${m.id}-${e.id}`, title: e.label, detail: `${e.oil} synthetic · ${e.quarts} quarts · filter and fees included`, price: p.price, cap: p.cap };
    });
    return {
      kind: "quote", heading: `Oil change for your ${vehicle}`, vehicle, rows, store, photo: m.photo, photoExact: m.photoExact,
      footnote: showAll
        ? "Not sure which engine you have? It is on the door-jamb sticker, or tell us your VIN and we will confirm. Each price is firm, and we text you before anything else is added."
        : `Firm price. If your engine takes up to half a quart more, the most you will pay is ${money(rows[0].cap ?? rows[0].price)}. We text you before anything else is added.`,
    };
  }

  const s = SERVICES[svc];
  const rows: Row[] = [{ key: `${m.id}-${svc}`, title: s.label, detail: s.note || "Includes labor", price: s.flat[m.cls] }];
  return {
    kind: "quote", heading: `${s.label} for your ${vehicle}`, vehicle, rows, store, photo: m.photo, photoExact: m.photoExact,
    footnote: "Firm price for this vehicle. An advisor will text you before any other work is added.",
  };
}
