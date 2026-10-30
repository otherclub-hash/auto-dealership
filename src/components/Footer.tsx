import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        © {year} NX45 LLC. All rights reserved.
      </p>
      <nav aria-label="Legal">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
      </nav>
      <p className="footer-demo">
        Lakeshore Auto Family and its brands are fictional and shown for demonstration only.
      </p>
    </footer>
  );
}
