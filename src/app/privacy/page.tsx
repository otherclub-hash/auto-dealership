import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy | Lakeshore Auto Family" };

export default function Privacy() {
  const year = new Date().getFullYear();
  return (
    <article className="legal">
      <p><Link href="/">← Back to the site</Link></p>
      <h1>Privacy Policy</h1>
      <p>Effective {year}. This policy is provided by NX45 LLC, a Minnesota limited liability company (&quot;NX45,&quot; &quot;we,&quot; &quot;us&quot;).</p>

      <h2>About this site</h2>
      <p>This is a demonstration website. Lakeshore Auto Family, its brands, vehicles, prices and locations are fictional and exist only to show what a dealership website can do. Nothing on this site is an offer to sell or finance a vehicle or to perform service.</p>

      <h2>Information we collect</h2>
      <ul>
        <li>Information you give us, such as your name, phone number, email address, vehicle details, and messages if you submit a form.</li>
        <li>Technical information collected automatically, such as device type, browser, pages viewed, approximate location from your IP address, and cookies or similar storage that keep the site working.</li>
      </ul>
      <p>Please do not submit sensitive personal information (such as Social Security numbers, driver&apos;s license numbers, or payment card numbers) through this demonstration site.</p>

      <h2>How we use information</h2>
      <p>To operate and improve the site, respond to your requests, keep the site secure, and, where you agree, send you messages. We do not sell your personal information and we do not share it for cross-context behavioral advertising.</p>

      <h2>Service providers</h2>
      <p>We use third parties to run the site, including hosting providers (such as Vercel) and, where features use them, artificial intelligence services that process the content you submit to generate a response. These providers may process data only to provide their services to us.</p>

      <h2>Cookies and similar technologies</h2>
      <p>We use essential storage to make the site function. If we add analytics or marketing tools, we will describe them here and, where required, ask for your consent first.</p>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have rights to access, correct, delete, or obtain a copy of your personal information, to opt out of targeted advertising, sales, or certain profiling, and to withdraw consent. These rights may arise under laws such as the EU and UK General Data Protection Regulation, the California Consumer Privacy Act, and the Minnesota Consumer Data Privacy Act. We will not discriminate against you for exercising them. To make a request, contact us at the email below.</p>

      <h2>Children&apos;s privacy</h2>
      <p>This site is not directed to children under 13, and we do not knowingly collect personal information from them (COPPA). If you believe a child has given us information, contact us and we will delete it.</p>

      <h2>Retention and security</h2>
      <p>We keep information only as long as needed for the purposes above or as required by law, and we use reasonable safeguards. No system is perfectly secure.</p>

      <h2>Changes</h2>
      <p>We may update this policy and will post the new version on this page.</p>

      <h2>Contact</h2>
      <p>NX45 LLC, Minnesota. Email: <a href="mailto:thealaricemrys@gmail.com">thealaricemrys@gmail.com</a></p>
      <p>© {year} NX45 LLC. All rights reserved.</p>
    </article>
  );
}
