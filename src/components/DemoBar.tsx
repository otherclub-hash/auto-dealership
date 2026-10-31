import Link from "next/link";
import { SLUG } from "@/config/brands";
import { tenant } from "@/config/tenant";

// Sales-demo helper only: jumps between the group site and the brand sites.
// In production each brand is its own site on its own domain. Hide with NEXT_PUBLIC_HIDE_DEMO_BAR=1.
export default function DemoBar() {
  if (process.env.NEXT_PUBLIC_HIDE_DEMO_BAR === "1") return null;
  return (
    <div className="demobar" role="navigation" aria-label="Demo: switch site">
      <span>Demo: switch site</span>
      <Link href="/">{tenant.group}</Link>
      {tenant.scenes.map((s) => (
        <Link key={s.id} href={`/${SLUG[s.id as keyof typeof SLUG]}`}>{s.brand}</Link>
      ))}
    </div>
  );
}
