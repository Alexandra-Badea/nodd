import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "../fonts/funnel-display-latin-wght-normal.woff2",
  weight: "300 800",
  variable: "--font-funnel-display",
  display: "swap",
});

const sans = localFont({
  src: "../fonts/funnel-sans-latin-wght-normal.woff2",
  weight: "300 800",
  variable: "--font-funnel-sans",
  display: "swap",
});

// Only the proposal inside the product shots is set in a book serif, so it reads like a real document
const doc = localFont({
  src: [
    { path: "../fonts/newsreader-latin-wght-normal.woff2", style: "normal" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "200 800",
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nodd | Proposals your clients can sign and pay",
  description: "Send one link. Your client reads the proposal, picks a package, signs and pays the deposit, all in one go.",
  openGraph: {
    title: "Nodd | Proposals your clients can sign and pay",
    description: "Send one link. Get the yes, the signature and the deposit.",
    siteName: "Nodd",
    type: "website",
  },
  // A made-up product for a portfolio, so it stays out of search results
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${doc.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-[10px] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
