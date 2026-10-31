import type { SceneId } from "@/config/tenant";
import { LOCATION_FOR_BRAND } from "@/data/catalog";

// Per-brand site content. Fictional demo copy; a real dealer edits this in the admin later.
export type BrandKey = Exclude<SceneId, "group">;

export const SLUG: Record<BrandKey, string> = {
  westwind: "westwind",
  woodsaaron: "woods-aaron",
  ia: "interbachen-antverp",
  radium: "radium",
};

export const BRAND_FROM_SLUG = Object.fromEntries(Object.entries(SLUG).map(([k, v]) => [v, k])) as Record<string, BrandKey>;

export type BrandSite = {
  about: string;
  specials: { title: string; text: string }[];
  store: string;
  hours: string[];
  asks: string[];
  askHint: string;
};

export const BRAND_SITE: Record<BrandKey, BrandSite> = {
  westwind: {
    about: "Westwind has been the family car of the lake country for three generations. Honest prices, Saturday hours and a service lane that tells you the cost before you book.",
    specials: [
      { title: "Oil change, posted price", text: "Your price shows before you book. Never more than half a quart extra without a text first." },
      { title: "Family service Saturdays", text: "Open until 3 p.m. Free shuttle within ten miles." },
      { title: "Back-to-school checkup", text: "Brakes, tires and wipers looked over in one visit." },
    ],
    store: LOCATION_FOR_BRAND.westwind,
    hours: ["Sales Mon to Sat 9 to 7", "Service Mon to Fri 7 to 6, Sat 8 to 3"],
    asks: ["Is a new Tamarack still available?", "Oil change for a 2021 Aurelia", "Used 3-row SUV under $40,000", "Tire rotation Aurelia"],
    askHint: "Ask about a Westwind car, a service price, or a part.",
  },
  woodsaaron: {
    about: "Woods-Aaron builds work trucks and trail SUVs for people who keep them a long time. Our service team knows your engine by its quarts.",
    specials: [
      { title: "Firm oil-change quotes", text: "Pick your engine, see one firm price. The not-to-exceed promise is in writing." },
      { title: "Fleet and work-truck program", text: "Priority bays and one monthly invoice for business fleets." },
      { title: "Trailer-ready inspection", text: "Hitch, brakes, tires and lights checked before the season." },
    ],
    store: LOCATION_FOR_BRAND.woodsaaron,
    hours: ["Sales Mon to Sat 8 to 7", "Service Mon to Fri 7 to 6, Sat 8 to 3"],
    asks: ["Oil change for a 2019 Ridgeback", "Is a new Ridgeback still available?", "Oil filter for a Summit", "How much for brakes on my Ridgeback?"],
    askHint: "Ask about a truck or SUV, a firm service price, or a part.",
  },
  ia: {
    about: "Interbachen-Antverp is quiet by design. Appointment-first sales, certified pre-owned and a concierge service team that comes to you.",
    specials: [
      { title: "Pickup and delivery", text: "We collect your car for service and return it washed." },
      { title: "Certified pre-owned", text: "Inspected, warrantied and priced in the open." },
      { title: "Loaner vehicles", text: "A loaner for every service visit that runs past a morning." },
    ],
    store: LOCATION_FOR_BRAND.ia,
    hours: ["Sales and concierge by appointment, Mon to Sat", "Service Mon to Fri 7:30 to 5:30"],
    asks: ["Is a V8 coupe still available?", "Oil change Interbachen-Antverp V8 coupe", "Certified pre-owned V6 SUV", "Brakes on my V4 sedan"],
    askHint: "Ask about an Interbachen-Antverp, a service price, or concierge pickup.",
  },
  radium: {
    about: "Radium is electric only, in a low-pressure studio. No oil changes, no haggling: incentives explained, chargers installed, service by appointment.",
    specials: [
      { title: "Incentive help", text: "We work out the credits you qualify for before you decide." },
      { title: "Home charger installs", text: "Quoted up front, installed by our certified electricians." },
      { title: "Test drive at home", text: "We bring a Radium to your driveway." },
    ],
    store: LOCATION_FOR_BRAND.radium,
    hours: ["Studio by appointment, Mon to Sat", "Service by appointment, Mon to Fri"],
    asks: ["Is a Radium One available to test drive?", "Tire rotation for a Radium Two", "Cabin filter Radium One", "Home charger for a Radium"],
    askHint: "Ask about a Radium, charging, or an electric service price.",
  },
};
