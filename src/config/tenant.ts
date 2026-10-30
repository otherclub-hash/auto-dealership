export type SceneId = "group" | "westwind" | "woodsaaron" | "ia" | "radium";

export type Scene = {
  id: SceneId;
  brand: string;
  short: string;
  segment: string;
  headline: string;
  line: string;
  idea: string;
  perks: string[];
  cta: string;
};

export type Location = {
  name: string;
  town: string;
  role: string;
};

export type Tenant = {
  group: string;
  tagline: string;
  intents: { label: string; hint: string; href: string }[];
  scenes: Scene[];
  locations: Location[];
};

// Everything here is fictional demo content. A real dealer replaces this file (later: a database row).
export const tenant: Tenant = {
  group: "Lakeshore Auto Family",
  tagline: "Three generations. One promise: a straight answer.",
  intents: [
    { label: "Shop", hint: "New and pre-owned", href: "#brands" },
    { label: "Sell or trade", hint: "A real offer, fast", href: "#brands" },
    { label: "Service", hint: "A firm price, then book", href: "#ask" },
    { label: "Parts", hint: "Fitted to your vehicle", href: "#ask" },
    { label: "Visit", hint: "Hours and directions", href: "#locations" },
  ],
  scenes: [
    {
      id: "westwind",
      brand: "Westwind",
      short: "WW",
      segment: "Family vehicles",
      headline: "Wide open, all the way home.",
      line: "Dependable cars, crossovers and minivans for every season of your life.",
      idea: "The horizon",
      perks: ["Service prices posted", "Open Saturdays", "Book in 60 seconds"],
      cta: "Explore Westwind",
    },
    {
      id: "woodsaaron",
      brand: "Woods-Aaron Motor Co",
      short: "WAMCO",
      segment: "Trucks and SUVs",
      headline: "Built by people who stay.",
      line: "Work trucks and trail SUVs with a long history behind every one.",
      idea: "The long road",
      perks: ["Firm oil-change quotes", "Fleet and work trucks", "Trailer-ready service"],
      cta: "Explore WAMCO",
    },
    {
      id: "ia",
      brand: "Interbachen-Antverp",
      short: "IA",
      segment: "Luxury",
      headline: "Quiet. Considered. Yours.",
      line: "Refined sedans, SUVs and coupes with concierge service.",
      idea: "The spotlight",
      perks: ["Pickup and delivery", "Certified pre-owned", "Loaner vehicles"],
      cta: "Meet IA",
    },
    {
      id: "radium",
      brand: "Radium",
      short: "RA",
      segment: "Electric",
      headline: "Charged for what's next.",
      line: "Electric crossovers and sedans, with help on incentives and charging.",
      idea: "The charge",
      perks: ["Incentive help", "Home charger installs", "Test drive at home"],
      cta: "Meet Radium",
    },
  ],
  locations: [
    { name: "Lakeshore Westwind", town: "Birchwood Bay", role: "Family vehicles, service and parts" },
    { name: "Lakeshore Woods-Aaron", town: "Cedar Point", role: "Trucks and SUVs, service and parts" },
    { name: "Lakeshore Interbachen-Antverp", town: "Pinecrest", role: "Luxury, certified, concierge service" },
    { name: "Lakeshore Radium Studio", town: "Harbor Mills", role: "Electric, by appointment" },
    { name: "Lakeshore Pre-Owned and Certified", town: "Route 9 Commons", role: "Multi-brand pre-owned" },
  ],
};
