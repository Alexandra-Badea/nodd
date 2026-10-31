"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mark } from "./logo";

/*
 * The opening shot: a client goes through a Nodd proposal. They pick the bigger package, sign,
 * pay the deposit, and the freelancer gets told. It loops while it's on screen and stands still,
 * already signed and paid, for anyone who has asked for less motion.
 */

const STEPS = [
  1500, // 0  the proposal, as the client first sees it
  900, //  1  the cursor heads to the second package
  1100, // 2  click: the package is chosen and the deposit updates
  1000, // 3  scroll down to the signature, cursor to the line
  1700, // 4  the signature is drawn
  900, //  5  cursor to the pay button
  1100, // 6  click: paid
  3400, // 7  the freelancer is told
  700, //  8  everything fades back for the next round
];
const FINAL = 7;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useReducedMotion = () => useSyncExternalStore(subscribeReduced, () => matchMedia(reducedQuery).matches, () => false);

export function HeroDemo() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const s = reduced ? FINAL : step;

  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const optionB = useRef<HTMLDivElement>(null);
  const sign = useRef<HTMLDivElement>(null);
  const pay = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  // Only play while it can be seen
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !onScreen) return;
    const t = setTimeout(() => setStep((n) => (n + 1) % STEPS.length), STEPS[step]);
    return () => clearTimeout(t);
  }, [step, onScreen, reduced]);

  // Scroll the proposal and move the cursor to whatever the client is about to touch
  useLayoutEffect(() => {
    const place = () => {
      const f = frame.current, c = content.current, cur = cursor.current;
      if (!f || !c || !cur) return;
      const scrolled = s >= 3 && s <= 8 && sign.current ? Math.max(0, Math.min(sign.current.offsetTop - 28, c.scrollHeight - f.clientHeight)) : 0;
      c.style.transform = `translateY(${-scrolled}px)`;
      const at = (el: HTMLElement | null, fx: number, fy: number) => {
        if (!el) return [f.clientWidth * 0.8, f.clientHeight * 0.86];
        const r = el.getBoundingClientRect(), cr = c.getBoundingClientRect();
        return [c.offsetLeft + r.left - cr.left + r.width * fx, c.offsetTop + r.top - cr.top + r.height * fy - scrolled];
      };
      const [x, y] =
        s === 1 || s === 2 ? at(optionB.current, 0.72, 0.55)
        : s === 3 ? at(sign.current, 0.14, 0.5)
        : s === 4 ? at(sign.current, 0.86, 0.42)
        : s === 5 || s === 6 ? at(pay.current, 0.5, 0.55)
        : s === 7 ? at(pay.current, 0.82, 1.6)
        : at(null, 0, 0);
      cur.style.transform = `translate(${x}px, ${y}px)`;
    };
    place();
    const ro = new ResizeObserver(place);
    if (frame.current) ro.observe(frame.current);
    return () => ro.disconnect();
  }, [s]);

  const chosenB = s >= 2 && s <= 8;
  const signed = s >= 4 && s <= 8;
  const paid = s >= 6 && s <= 8;
  const told = s === 7;
  const fading = s === 8;
  const pressing = s === 2 || s === 6;
  const deposit = chosenB ? "£780" : "£540";

  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:mx-0 lg:ml-auto">
      {/* the link the client was sent */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sheet px-3.5 py-1.5 text-[0.82rem] text-ink-soft shadow-[0_1px_0_rgb(22_27_51/0.04)]">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-paid" aria-hidden="true">
            <path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="7" width="10" height="7.5" rx="2" fill="currentColor" />
          </svg>
          nodd.link/<span className="font-medium text-ink">little-kettle</span>
        </span>
      </div>

      <div
        ref={frame}
        className="relative h-[30rem] overflow-hidden rounded-[18px] bg-sheet shadow-sheet ring-1 ring-ink/[0.06] sm:h-[33rem]"
        role="img"
        aria-label="A Nodd proposal for Little Kettle Bakery. The client picks the second package, signs, and pays a £780 deposit; the freelancer is told straight away."
      >
        <div ref={content} className={`relative px-6 pb-10 pt-6 transition-transform duration-[900ms] ease-[cubic-bezier(.65,0,.25,1)] sm:px-9 sm:pt-8 ${fading ? "opacity-0" : "opacity-100"} [transition-property:transform,opacity]`}>
          {/* letterhead */}
          <div className="flex items-center justify-between gap-4 text-[0.8rem]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe9d6] font-display text-[0.75rem] font-bold text-[#9a4a14]">MO</span>
              <span className="leading-tight">
                <span className="block font-semibold text-ink">Maya Ortiz</span>
                <span className="text-ink-faint">Design and websites</span>
              </span>
            </div>
            <span className="text-ink-faint">Proposal 024</span>
          </div>

          <h3 className="mt-7 font-doc text-[1.75rem] leading-[1.12] font-medium tracking-[-0.01em] text-ink sm:text-[2rem]">
            A new website for Little Kettle Bakery
          </h3>
          <p className="mt-3 font-doc text-[1.02rem] leading-[1.6] text-ink-soft sm:text-[1.08rem]">
            Hannah, here&apos;s what we talked about on Tuesday: a site that shows today&apos;s bakes and <span className="marker text-ink">takes orders for collection</span>, so
            the phone stops ringing at 7am.
          </p>

          <p className="mt-6 text-[0.8rem] font-semibold text-ink">Choose a package</p>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
            <Package name="Essentials" detail="Five pages, menu, map and contact" price="£1,800" on={!chosenB} />
            <div ref={optionB}>
              <Package name="Essentials + orders" detail="All of that, plus orders for collection" price="£2,600" on={chosenB} />
            </div>
          </div>

          <p className="mt-6 text-[0.8rem] font-semibold text-ink">Timeline</p>
          <p className="mt-1 font-doc text-[1.02rem] text-ink-soft">Starts 11 November. Live by 6 December.</p>

          <p className="mt-6 text-[0.8rem] font-semibold text-ink">Accept and sign</p>
          <div ref={sign} className="relative mt-2 h-[5.5rem] rounded-xl border border-dashed border-ink/20 bg-paper/60">
            <svg viewBox="0 0 200 70" className="absolute left-4 top-1 h-[4.4rem] w-[min(15rem,calc(100%-2rem))]" aria-hidden="true" preserveAspectRatio="xMinYMid meet">
              <path
                d="M16 54C17 41 19 27 23 12M8 36c11-4 22-5 32-6M38 11c-2 14-4 29-4 44c4-9 10-12 12-6c1 5-4 8-5 3c0-6 7-8 9-2c1 5 3 6 6-1c2-6 6-6 6 0c0 6 4 6 6-1c2-6 6-6 6 0c0 6 4 6 6 0c2-5 6-6 7-1c1 5-4 7-5 2c0-5 7-7 9-1c1 4 3 5 5 0c3-11 5-22 6-33c-1 14-2 28-2 41c4-8 9-10 11-5c2 5 3 6 6 5M132 54c1-14 3-28 5-41c13-5 22 4 11 14c-4 4-10 5-13 4c9 5 15 14 22 23M170 52h0.5M18 62c48-4 104-3 150-11c10-2 18-5 26-9"
                fill="none"
                stroke="#2846f0"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: signed ? 0 : 1,
                  transition: s === 4 ? "stroke-dashoffset 1.5s cubic-bezier(.5,0,.4,1)" : "none",
                }}
              />
            </svg>
            <span className="absolute inset-x-4 bottom-5 h-px bg-ink/15" />
            <span className="absolute bottom-1.5 left-4 text-[0.72rem] text-ink-faint">Hannah Reid, Little Kettle Bakery</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper px-4 py-3">
            <span className="text-[0.9rem] text-ink-soft">
              Deposit today, 30%: <span className="font-semibold text-ink tabular-nums">{deposit}</span>
            </span>
            <div ref={pay}>
              <span
                className={`inline-flex h-10 items-center gap-2 rounded-[10px] px-4 text-[0.9rem] font-semibold text-white transition-colors duration-300 ${paid ? "bg-paid" : "bg-pen"}`}
              >
                {paid ? (
                  <>
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Paid
                  </>
                ) : (
                  <>Pay {deposit}</>
                )}
              </span>
            </div>
          </div>

          {/* the rubber stamp */}
          <div
            className={`pointer-events-none absolute bottom-24 right-8 rotate-[-9deg] rounded-lg border-[2.5px] border-paid px-3 py-1 font-display text-[1.05rem] font-bold tracking-[-0.01em] text-paid transition-all duration-300 ease-[cubic-bezier(.3,1.6,.5,1)] ${paid ? "scale-100 opacity-90" : "scale-150 opacity-0"}`}
            aria-hidden="true"
          >
            Deposit paid
          </div>
        </div>

        {/* the client's cursor */}
        <div ref={cursor} className={`pointer-events-none absolute left-0 top-0 z-10 transition-transform duration-[850ms] ease-[cubic-bezier(.6,0,.25,1)] ${reduced ? "hidden" : ""}`} aria-hidden="true">
          <div key={pressing ? `p${s}` : "idle"} className={pressing ? "animate-[press_.4s_ease-out]" : ""}>
            <svg viewBox="0 0 24 24" className="h-6 w-6 -translate-x-1 -translate-y-1 drop-shadow-[0_2px_3px_rgb(22_27_51/0.35)]">
              <path d="M5 3l14 7.5-6.2 1.6L10 18.5z" fill="#161b33" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* what the freelancer sees, the moment it happens */}
      <div
        className={`absolute -bottom-6 left-1/2 z-20 w-[min(21rem,calc(100%-1.5rem))] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(.2,.9,.3,1.2)] sm:-left-8 sm:translate-x-0 lg:-left-14 ${told ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
        aria-hidden="true"
      >
        <div className="flex items-start gap-3 rounded-2xl bg-sheet p-3.5 shadow-float">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-pen-soft">
            <Mark className="h-5 w-auto" />
          </span>
          <span className="min-w-0 flex-1 text-[0.86rem] leading-snug">
            <span className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-ink">Little Kettle Bakery said yes</span>
              <span className="shrink-0 text-[0.72rem] text-ink-faint">now</span>
            </span>
            <span className="text-ink-soft">Signed, and paid the £780 deposit.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Package({ name, detail, price, on }: { name: string; detail: string; price: string; on: boolean }) {
  return (
    <div className={`relative h-full rounded-xl border-[1.5px] p-3.5 transition-colors duration-300 ${on ? "border-pen bg-pen-soft/60" : "border-line bg-sheet"}`}>
      <span className={`absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full border-[1.5px] transition-colors duration-300 ${on ? "border-pen" : "border-ink/25"}`}>
        <span className={`h-2 w-2 rounded-full bg-pen transition-transform duration-300 ${on ? "scale-100" : "scale-0"}`} />
      </span>
      <span className="block pr-6 text-[0.9rem] font-semibold text-ink">{name}</span>
      <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-soft">{detail}</span>
      <span className="mt-2 block font-display text-[1.05rem] font-semibold text-ink tabular-nums">{price}</span>
    </div>
  );
}
