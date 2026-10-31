import Link from "next/link";
import { Header } from "@/components/header";

export const metadata = { title: "Page not found | Nodd" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <div className="ruled pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="wrap relative flex min-h-[70svh] flex-col items-start justify-center py-24">
          {/* an unsigned signature line: nothing here yet */}
          <svg viewBox="0 0 220 60" className="h-14 w-auto text-ink/25" aria-hidden="true">
            <path d="M6 44c30-2 150-2 208 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
            <path d="M10 30l10 10M20 30L10 40" stroke="#2846f0" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.6rem,1.6rem+4vw,4.4rem)] leading-[0.98] tracking-[-0.045em]">This page was never signed.</h1>
          <p className="mt-5 max-w-[30rem] text-[1.15rem] text-ink-soft">The link may be old, or there&apos;s a typo in the address. Everything else is on the home page.</p>
          <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-[10px] bg-pen px-5 font-semibold text-white transition-colors hover:bg-pen-dark">
            Go to the home page
          </Link>
        </div>
      </main>
    </>
  );
}
