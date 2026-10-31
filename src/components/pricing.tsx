"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    who: "For trying it with a real client.",
    monthly: 0,
    yearly: 0,
    features: ["3 proposals a month", "Signatures and deposits", "A small Nodd note on your proposals"],
  },
  {
    name: "Solo",
    who: "For freelancers sending proposals every week.",
    monthly: 12,
    yearly: 10,
    features: ["Unlimited proposals", "Your logo and colours", "Templates and saved blocks", "Reminders that send themselves", "See when proposals are opened"],
    pick: true,
  },
  {
    name: "Studio",
    who: "For small teams who share clients.",
    monthly: 29,
    yearly: 24,
    features: ["Everything in Solo", "Up to 5 people", "Proposals on your own web address", "Shared templates", "Help within one working day"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="border-t border-line bg-sheet py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="pricing-title" className="text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.02]">
            Pricing
          </h2>
          <div role="group" aria-label="Billing" className="inline-flex rounded-[12px] bg-paper p-1 ring-1 ring-line">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                aria-pressed={yearly === y}
                onClick={() => setYearly(y)}
                className={`h-10 whitespace-nowrap rounded-[9px] px-4 text-[0.95rem] font-semibold transition-colors ${yearly === y ? "bg-sheet text-ink shadow-[0_1px_3px_rgb(22_27_51/0.12)]" : "text-ink-soft hover:text-ink"}`}
              >
                {y ? "Yearly, 2 months free" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        {/* one sheet, three columns: plans compared side by side like a price list */}
        <div className="mt-12 grid overflow-hidden rounded-[18px] ring-1 ring-line md:grid-cols-3">
          {plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <div key={p.name} className={`flex flex-col p-7 sm:p-8 max-md:not-last:border-b md:not-last:border-r border-line ${p.pick ? "bg-pen-soft/55" : "bg-sheet"}`}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <h3 className="text-[1.45rem] leading-none">{p.name}</h3>
                  {p.pick && <span className="whitespace-nowrap rounded-full bg-pen px-2.5 py-1 text-[0.75rem] font-semibold text-white">Best for freelancers</span>}
                </div>
                <p className="mt-2 text-[0.98rem] text-ink-soft">{p.who}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-[3rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">£{price}</span>
                  <span className="text-[0.95rem] text-ink-soft">{price === 0 ? "forever" : yearly ? "a month, billed yearly" : "a month"}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-[0.98rem]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg viewBox="0 0 16 16" className="mt-[0.3rem] h-4 w-4 shrink-0 text-pen" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#start"
                  className={`mt-8 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-[0.98rem] font-semibold transition-colors ${p.pick ? "bg-pen text-white hover:bg-pen-dark" : "bg-sheet text-ink ring-1 ring-ink/15 hover:ring-ink/40"}`}
                >
                  {price === 0 ? "Start free" : "Try free for 14 days"}
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-6 max-w-[44rem] text-[0.95rem] text-ink-soft">
          Deposits are paid through Stripe, at Stripe&apos;s usual card fees. Nodd doesn&apos;t take a cut of your money. Prices are in pounds and include VAT.
        </p>
      </div>
    </section>
  );
}
