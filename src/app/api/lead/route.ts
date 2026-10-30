import { NextResponse } from "next/server";

// Demo endpoint. It validates a request and returns a confirmation id, but stores nothing and sends
// nothing to a real dealership. In the product this writes to the tenant's lead table and notifies staff.

type Body = {
  kind?: string;
  name?: string;
  phone?: string;
  email?: string;
  when?: string;
  note?: string;
  consent?: boolean;
  website?: string; // honeypot
};

const KINDS = new Set(["book", "callback", "sales"]);

export async function POST(req: Request) {
  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (b.website) return NextResponse.json({ ok: true, id: "ignored" });

  const name = (b.name ?? "").trim();
  const phone = (b.phone ?? "").trim();
  const email = (b.email ?? "").trim();
  if (!b.kind || !KINDS.has(b.kind)) return NextResponse.json({ ok: false, error: "Unknown request type." }, { status: 400 });
  if (name.length < 2 || name.length > 80) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  const phoneOk = phone.replace(/\D/g, "").length >= 10;
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!phoneOk && !emailOk) return NextResponse.json({ ok: false, error: "Please enter a phone number or email." }, { status: 400 });
  if (b.consent !== true) return NextResponse.json({ ok: false, error: "Please agree to be contacted." }, { status: 400 });
  if ((b.note ?? "").length > 600 || (b.when ?? "").length > 80) return NextResponse.json({ ok: false, error: "Message too long." }, { status: 400 });

  const id = `DEMO-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, id, demo: true });
}
