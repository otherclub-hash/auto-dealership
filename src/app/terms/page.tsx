import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms of Use | Lakeshore Auto Family" };

export default function Terms() {
  const year = new Date().getFullYear();
  return (
    <article className="legal">
      <p><Link href="/">← Back to the site</Link></p>
      <h1>Terms of Use</h1>
      <p>Effective {year}. These terms are between you and NX45 LLC, a Minnesota limited liability company (&quot;NX45&quot;). By using this site you agree to them.</p>

      <h2>Demonstration only</h2>
      <p>This site demonstrates a dealership website. The dealer group, brands, vehicles, prices, incentives, payments, reviews and locations shown are fictional. Nothing here is an offer, quote, advertisement of a real vehicle, financing offer, or commitment to perform service. Any calculator or estimate is illustrative only and is not financial, legal, tax, or professional advice.</p>

      <h2>AI-generated content</h2>
      <p>Some content, text, images, or responses on this site may be generated or assisted by artificial intelligence and may contain errors. Do not rely on it for decisions without verifying it independently.</p>

      <h2>Your use of the site</h2>
      <p>Use the site lawfully. Do not attempt to disrupt it, access it without authorization, scrape it at scale, or submit unlawful, harmful, or other people&apos;s personal information.</p>

      <h2>Intellectual property</h2>
      <p>The site, its design, code, text, and graphics are owned by NX45 LLC or its licensors and are protected by law. You may view the site for personal, non-commercial evaluation. Any other use requires our written permission. Fictional brand names are used for demonstration; any resemblance to real marks is unintentional.</p>

      <h2>Disclaimer of warranties</h2>
      <p>The site is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the site will be uninterrupted or error free.</p>

      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, NX45 and its members, managers, employees, and contractors are not liable for any indirect, incidental, special, consequential, or punitive damages, or for lost profits or data, arising from your use of the site. Our total liability for any claim is limited to $100.</p>

      <h2>Indemnification</h2>
      <p>You agree to indemnify and hold harmless NX45 and its members, managers, employees, and contractors from claims, damages, and expenses (including reasonable attorneys&apos; fees) arising from your misuse of the site or violation of these terms.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Minnesota, without regard to conflict-of-law rules. Disputes will be brought in the state or federal courts located in Minnesota, and you consent to their jurisdiction.</p>

      <h2>Changes and contact</h2>
      <p>We may update these terms by posting a new version here. Questions: <a href="mailto:thealaricemrys@gmail.com">thealaricemrys@gmail.com</a></p>
      <p>© {year} NX45 LLC. All rights reserved.</p>
    </article>
  );
}
