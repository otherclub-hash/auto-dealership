import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AskBox from "@/components/AskBox";
import BrandHero from "@/components/BrandHero";
import Icon from "@/components/Icons";
import Photo from "@/components/Photo";
import { BRAND_FROM_SLUG, BRAND_SITE, SLUG, type BrandKey } from "@/config/brands";
import { tenant } from "@/config/tenant";
import { MODELS } from "@/data/catalog";

export function generateStaticParams() {
  return Object.values(SLUG).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const id = BRAND_FROM_SLUG[brand];
  if (!id) return {};
  const s = tenant.scenes.find((x) => x.id === id)!;
  return {
    title: `${s.brand} | ${tenant.group}`,
    description: `${s.brand} at ${tenant.group}: ${s.line} Demonstration site for a fictional dealer.`,
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const id: BrandKey | undefined = BRAND_FROM_SLUG[brand];
  if (!id) notFound();
  const s = tenant.scenes.find((x) => x.id === id)!;
  const site = BRAND_SITE[id];
  const models = MODELS.filter((m) => m.brandKey === id);

  return (
    <div className={`brandsite brand-${id}`}>
      <header className="bbar">
        <Link href="/" className="bback">
          <span aria-hidden="true">←</span> {tenant.group}
        </Link>
        <strong className="bname">{s.brand}</strong>
        <nav aria-label={`${s.brand} sections`}>
          <a href="#models">Models</a>
          <a href="#ask">Ask us</a>
          <a href="#offers">Service and offers</a>
          <a href="#visit">Visit</a>
        </nav>
      </header>

      <BrandHero id={id} onBrandPage />

      <section id="models" className="bsec" aria-label={`${s.brand} models`}>
        <p className="eyebrow">Lineup</p>
        <h2>{s.brand} models</h2>
        <p className="blede">{site.about}</p>
        <ul className="mgrid">
          {models.map((m) => (
            <li key={m.id} className="mcard">
              <Photo k={m.photo} className="mphoto" alt={`${m.brand} ${m.name}`} />
              <h3>{m.name}</h3>
              <p className="mtype">{m.cls === "ev" ? "Electric" : m.cls === "truck" ? "Truck" : m.cls === "suv" ? "SUV" : m.cls === "luxury" ? "Luxury" : "Car"}</p>
              <p className="mengines">{m.engines.map((e) => e.label).join(" · ")}</p>
              <a className="btn small" href="#ask">Ask if it&apos;s available</a>
            </li>
          ))}
        </ul>
      </section>

      <section id="ask" className="bsec bask" aria-label={`Ask ${s.brand}`}>
        <p className="eyebrow">Straight answers</p>
        <h2>Ask about sales, service, or parts.</h2>
        <p className="blede">{site.askHint} Looking for a new or used {s.brand} car? Tell us what you want.</p>
        <AskBox examples={site.asks} placeholder={`Try: ${site.asks[0].toLowerCase()}`} />
      </section>

      <section id="offers" className="bsec" aria-label="Service and offers">
        <p className="eyebrow">Service and offers</p>
        <h2>Why owners stay</h2>
        <ul className="ogrid">
          {site.specials.map((o) => (
            <li key={o.title} className="ocard">
              <strong>{o.title}</strong>
              <span>{o.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="visit" className="bsec" aria-label="Visit">
        <p className="eyebrow">Visit</p>
        <h2>{site.store}</h2>
        <ul className="hours">
          {site.hours.map((h) => (
            <li key={h}>
              <Icon name="visit" className="loc-icon" />
              {h}
            </li>
          ))}
        </ul>
        <p className="blede">
          Part of {tenant.group}. <Link href="/#locations">See all five locations</Link>.
        </p>
      </section>
    </div>
  );
}
