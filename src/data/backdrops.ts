// Unsplash backdrops, picked once so the app never searches live (the API allows 50 requests an hour).
// Images are hotlinked from Unsplash's own URLs and credited, per the Unsplash API guidelines.
export type Backdrop = {
  id: string;
  src: string;
  photographer: string;
  profile: string;
  page: string;
  position?: string;
};

const utm = "?utm_source=lakeshore_auto_family&utm_medium=referral";

export const BACKDROPS = {
  group: {
    id: "j3CjZYckM88",
    src: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b",
    photographer: "Emma Harper",
    profile: "https://unsplash.com/@emarieharp015" + utm,
    page: "https://unsplash.com/photos/j3CjZYckM88" + utm,
    position: "50% 60%",
  },
  westwind: {
    id: "aHetdmuNoO4",
    src: "https://images.unsplash.com/photo-1533139143976-30918502365b",
    photographer: "Michael Bourgault",
    profile: "https://unsplash.com/@mbzzgeorgia" + utm,
    page: "https://unsplash.com/photos/aHetdmuNoO4" + utm,
    position: "50% 55%",
  },
  woodsaaron: {
    id: "HeoWPagaufI",
    src: "https://images.unsplash.com/photo-1785844371637-c57ef44988fd",
    photographer: "Roger Palau",
    profile: "https://unsplash.com/@rpalau" + utm,
    page: "https://unsplash.com/photos/HeoWPagaufI" + utm,
    position: "50% 50%",
  },
} satisfies Record<string, Backdrop>;

export type BackdropKey = keyof typeof BACKDROPS;
