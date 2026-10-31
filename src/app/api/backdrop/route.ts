import { BACKDROPS } from "@/data/backdrops";

// Tells Unsplash a listed photo was used. Only ids from our own list are accepted.
export async function POST(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  const known = Object.values(BACKDROPS).some((b) => b.id === id);
  const key = process.env.AccessKey ?? process.env.UNSPLASH_ACCESS_KEY;
  if (!known || !key) return Response.json({ ok: false }, { status: 202 });
  try {
    await fetch(`https://api.unsplash.com/photos/${id}/download`, { headers: { Authorization: `Client-ID ${key}` } });
  } catch {}
  return Response.json({ ok: true });
}
