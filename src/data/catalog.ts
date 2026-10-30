// Demo price tables for the fictional Lakeshore Auto Family. A real dealer edits these in the admin;
// the answer engine only ever reads numbers from here, it never invents them.

export type VehicleClass = "car" | "suv" | "truck" | "luxury" | "ev";

export type Engine = {
  id: string;
  label: string;
  /** Oil spec, empty for electric. */
  oil: string;
  quarts: number;
  years: [number, number];
  /** Keywords a customer might use for this engine. */
  tags: string[];
  diesel?: boolean;
  electric?: boolean;
};

export type Model = {
  id: string;
  brand: string;
  brandKey: "westwind" | "woodsaaron" | "ia" | "radium";
  name: string;
  cls: VehicleClass;
  aliases: string[];
  engines: Engine[];
};

const Y: [number, number] = [2016, 2026];

export const MODELS: Model[] = [
  {
    id: "aurelia", brand: "Westwind", brandKey: "westwind", name: "Aurelia", cls: "car",
    aliases: ["aurelia", "westwind sedan"],
    engines: [
      { id: "20t", label: "2.0L turbo 4-cyl", oil: "0W-20", quarts: 5.0, years: Y, tags: ["2.0", "turbo", "4 cyl", "four cylinder"] },
      { id: "hyb", label: "1.8L hybrid", oil: "0W-16", quarts: 4.2, years: [2019, 2026], tags: ["1.8", "hybrid"] },
    ],
  },
  {
    id: "tamarack", brand: "Westwind", brandKey: "westwind", name: "Tamarack", cls: "suv",
    aliases: ["tamarack"],
    engines: [
      { id: "15t", label: "1.5L turbo 3-cyl", oil: "0W-20", quarts: 4.5, years: [2018, 2026], tags: ["1.5", "3 cyl", "three cylinder"] },
      { id: "20t", label: "2.0L turbo 4-cyl", oil: "0W-20", quarts: 5.5, years: [2018, 2026], tags: ["2.0", "4 cyl", "four cylinder"] },
    ],
  },
  {
    id: "boundary", brand: "Westwind", brandKey: "westwind", name: "Boundary", cls: "suv",
    aliases: ["boundary"],
    engines: [
      { id: "v6", label: "3.0L V6", oil: "0W-20", quarts: 6.2, years: [2017, 2026], tags: ["3.0", "v6"] },
      { id: "phev", label: "2.0L plug-in hybrid", oil: "0W-20", quarts: 5.0, years: [2022, 2026], tags: ["2.0", "plug in", "phev", "hybrid"] },
    ],
  },
  {
    id: "voyageur", brand: "Westwind", brandKey: "westwind", name: "Voyageur", cls: "suv",
    aliases: ["voyageur", "westwind minivan"],
    engines: [
      { id: "v6", label: "3.6L V6", oil: "0W-20", quarts: 6.0, years: Y, tags: ["3.6", "v6"] },
      { id: "hyb", label: "3.6L hybrid", oil: "0W-20", quarts: 5.5, years: [2021, 2026], tags: ["3.6", "hybrid"] },
    ],
  },
  {
    id: "ridgeback", brand: "Woods-Aaron", brandKey: "woodsaaron", name: "Ridgeback", cls: "truck",
    aliases: ["ridgeback", "ridge back"],
    engines: [
      { id: "27t", label: "2.7L turbo 4-cyl", oil: "0W-20", quarts: 6.0, years: Y, tags: ["2.7", "turbo", "4 cyl", "four cylinder"] },
      { id: "36", label: "3.6L V6", oil: "0W-20", quarts: 6.5, years: Y, tags: ["3.6", "v6"] },
      { id: "53", label: "5.3L V8", oil: "0W-20", quarts: 8.0, years: Y, tags: ["5.3", "v8", "eight cylinder"] },
      { id: "33d", label: "3.3L diesel", oil: "5W-40", quarts: 7.5, years: [2019, 2026], tags: ["3.3", "diesel"], diesel: true },
    ],
  },
  {
    id: "summit", brand: "Woods-Aaron", brandKey: "woodsaaron", name: "Summit", cls: "suv",
    aliases: ["summit"],
    engines: [
      { id: "36", label: "3.6L V6", oil: "0W-20", quarts: 6.5, years: Y, tags: ["3.6", "v6"] },
      { id: "53", label: "5.3L V8", oil: "0W-20", quarts: 8.0, years: [2018, 2026], tags: ["5.3", "v8"] },
    ],
  },
  {
    id: "ia-sedan", brand: "Interbachen-Antverp", brandKey: "ia", name: "IA V4 sedan", cls: "luxury",
    aliases: ["ia v4", "ia sedan", "interbachen sedan", "interbachen v4"],
    engines: [{ id: "25t", label: "2.5L turbo 4-cyl", oil: "0W-40", quarts: 6.3, years: Y, tags: ["2.5", "turbo"] }],
  },
  {
    id: "ia-suv", brand: "Interbachen-Antverp", brandKey: "ia", name: "IA V6 SUV", cls: "luxury",
    aliases: ["ia v6", "ia suv", "interbachen suv", "interbachen v6"],
    engines: [{ id: "30t", label: "3.0L turbo V6", oil: "0W-40", quarts: 7.0, years: Y, tags: ["3.0", "turbo", "v6"] }],
  },
  {
    id: "ia-coupe", brand: "Interbachen-Antverp", brandKey: "ia", name: "IA V8 coupe", cls: "luxury",
    aliases: ["ia v8", "ia coupe", "interbachen coupe", "interbachen v8"],
    engines: [{ id: "40t", label: "4.0L twin-turbo V8", oil: "0W-40", quarts: 8.5, years: Y, tags: ["4.0", "twin turbo", "v8"] }],
  },
  {
    id: "radium-one", brand: "Radium", brandKey: "radium", name: "Radium One", cls: "ev",
    aliases: ["radium one"],
    engines: [{ id: "ev", label: "Electric", oil: "", quarts: 0, years: [2021, 2026], tags: ["electric", "ev"], electric: true }],
  },
  {
    id: "radium-two", brand: "Radium", brandKey: "radium", name: "Radium Two", cls: "ev",
    aliases: ["radium two"],
    engines: [{ id: "ev", label: "Electric", oil: "", quarts: 0, years: [2022, 2026], tags: ["electric", "ev"], electric: true }],
  },
];

export const BRAND_ALIASES: Record<Model["brandKey"], string[]> = {
  westwind: ["westwind", "west wind"],
  woodsaaron: ["woods-aaron", "woods aaron", "woodsaaron", "wamco"],
  ia: ["interbachen-antverp", "interbachen antverp", "interbachen"],
  radium: ["radium"],
};

// Makes we do not carry. The engine hands these to a person rather than guessing.
export const OTHER_MAKES = [
  "gmc", "chevy", "chevrolet", "ford", "toyota", "honda", "dodge", "ram", "nissan", "bmw", "mercedes", "audi",
  "tesla", "jeep", "hyundai", "kia", "subaru", "volkswagen", "vw", "mazda", "lexus", "volvo", "cadillac", "buick",
];

/** Oil change pricing inputs by class. */
export const OIL = {
  labor: { default: 39, diesel: 49, luxury: 59 },
  perQuart: { default: 9.5, luxury: 13.5 },
  filter: { default: 14, v8: 16, diesel: 29, luxury: 26 },
  fee: 3.5,
  /** Extra half quart covered by the not-to-exceed promise. */
  capQuarts: 0.5,
};

export type ServiceId = "oil" | "rotation" | "cabin" | "brakes" | "battery" | "wipers" | "alignment";

export const SERVICES: Record<ServiceId, { label: string; keywords: RegExp; note: string; flat: Record<VehicleClass, number> }> = {
  oil: { label: "Oil change", keywords: /\boil\b/, note: "", flat: { car: 0, suv: 0, truck: 0, luxury: 0, ev: 0 } },
  rotation: { label: "Tire rotation", keywords: /rotat/, note: "Includes tire pressure check.", flat: { car: 29.95, suv: 29.95, truck: 39.95, luxury: 49.95, ev: 29.95 } },
  cabin: { label: "Cabin air filter", keywords: /cabin|pollen/, note: "Filter and installation.", flat: { car: 44.95, suv: 44.95, truck: 54.95, luxury: 79.95, ev: 54.95 } },
  brakes: { label: "Front brake pads", keywords: /brake|\bpads?\b|rotors?/, note: "Per axle, pads and labor. Rotors are quoted after inspection.", flat: { car: 229, suv: 259, truck: 289, luxury: 389, ev: 299 } },
  battery: { label: "Battery replacement", keywords: /battery|batteries/, note: "Battery, installation and testing.", flat: { car: 189, suv: 189, truck: 219, luxury: 289, ev: 219 } },
  wipers: { label: "Wiper blades", keywords: /wiper|blade/, note: "Pair, installed free.", flat: { car: 39.95, suv: 39.95, truck: 39.95, luxury: 59.95, ev: 39.95 } },
  alignment: { label: "Wheel alignment", keywords: /align/, note: "Two-wheel alignment with printout.", flat: { car: 119.95, suv: 129.95, truck: 149.95, luxury: 189.95, ev: 149.95 } },
};

export const PARTS: Record<string, { label: string; code: string; price: Record<VehicleClass, number> }> = {
  oil: { label: "Oil filter", code: "OF", price: { car: 14, suv: 14, truck: 16, luxury: 26, ev: 0 } },
  cabin: { label: "Cabin air filter", code: "CF", price: { car: 24.95, suv: 24.95, truck: 29.95, luxury: 44.95, ev: 29.95 } },
  wipers: { label: "Wiper blades (pair)", code: "WB", price: { car: 29.95, suv: 29.95, truck: 34.95, luxury: 49.95, ev: 29.95 } },
  brakes: { label: "Front brake pads", code: "BP", price: { car: 119, suv: 139, truck: 159, luxury: 219, ev: 169 } },
  battery: { label: "Battery", code: "BT", price: { car: 149, suv: 149, truck: 179, luxury: 239, ev: 179 } },
};

export const LOCATION_FOR_BRAND: Record<Model["brandKey"], string> = {
  westwind: "Lakeshore Westwind, Birchwood Bay",
  woodsaaron: "Lakeshore Woods-Aaron, Cedar Point",
  ia: "Lakeshore Interbachen-Antverp, Pinecrest",
  radium: "Lakeshore Radium Studio, Harbor Mills",
};
