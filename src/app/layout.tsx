import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import DemoBar from "@/components/DemoBar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakeshore Auto Family",
  description:
    "Demonstration site for a fictional multi-brand dealer group. Three generations, one promise: a straight answer.",
};

export const viewport: Viewport = {
  themeColor: "#0b1424",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <DemoBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
