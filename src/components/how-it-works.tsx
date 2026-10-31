"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const steps = [
  {
    title: "Write it once",
    body: "Start from a template or your last proposal. Add the scope, the timeline and up to three packages, and set how much deposit you want up front.",
    shot: <EditorShot />,
  },
  {
    title: "Send one link",
    body: "Your client opens it on any phone or laptop, with no account and nothing to download. You see when they open it and which part they spend time on.",
    shot: <ActivityShot />,
  },
  {
    title: "Get the nod",
    body: "They choose a package, sign with a finger or a mouse, and pay the deposit by card, Apple Pay or bank transfer. The money goes straight to your Stripe account.",
    shot: <PaidShot />,
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // The step in the middle of the screen is the one the picture shows
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="py-24 sm:py-32">
      <div className="wrap">
        <h2 id="how-title" className="text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.02]">
          How it works
        </h2>

        <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <ol className="lg:py-[18vh]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 pb-16 last:pb-0 lg:min-h-[52vh] lg:pb-0"
              >
                <span
                  className={`font-display text-[2.6rem] leading-none font-semibold tabular-nums transition-colors duration-300 ${active === i ? "text-pen" : "text-ink/20"} max-lg:text-pen`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className={`transition-opacity duration-300 lg:pt-1 ${active === i ? "lg:opacity-100" : "lg:opacity-45"}`}>
                  <h3 className="text-[1.6rem] leading-tight sm:text-[1.85rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[28rem] text-ink-soft">{s.body}</p>
                  {/* on phones and tablets, each step carries its own picture */}
                  <div className="mt-8 lg:hidden" aria-hidden="true">
                    <Frame>{s.shot}</Frame>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* on large screens, one picture stays put and changes with the step */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-[calc(50vh-15rem)]">
              <div className="relative h-[30rem]">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(.3,0,.2,1)] motion-reduce:transition-none ${active === i ? "translate-y-0 opacity-100" : i < active ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0"}`}
                  >
                    <Frame>{s.shot}</Frame>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-[40rem] border-t border-line pt-8 text-ink-soft lg:mt-6">
          <span className="font-semibold text-ink">And when the work is done,</span> mark it done. Nodd sends the final invoice for the rest, and a polite reminder if it&apos;s late.
        </p>
      </div>
    </section>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="h-[26rem] overflow-hidden rounded-[18px] bg-sheet shadow-sheet ring-1 ring-ink/[0.06] sm:h-[30rem]">{children}</div>;
}

function Bar({ title, badge, tone = "ink" }: { title: string; badge: string; tone?: "ink" | "pen" | "paid" }) {
  const tones = { ink: "bg-ink/[0.06] text-ink-soft", pen: "bg-pen-soft text-pen", paid: "bg-paid-soft text-paid" };
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
      <span className="truncate font-semibold text-ink">{title}</span>
      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${tones[tone]}`}>{badge}</span>
    </div>
  );
}

/* 1. The proposal being put together from blocks */
function EditorShot() {
  const blocks = ["Intro", "Scope", "Packages", "Timeline", "Terms", "Sign and pay deposit"];
  return (
    <div className="flex h-full flex-col text-[0.9rem]">
      <Bar title="Little Kettle Bakery" badge="Draft" />
      <div className="flex-1 space-y-2 px-5 py-5 sm:px-6">
        {blocks.map((b) => {
          const lifted = b === "Packages";
          return (
            <div
              key={b}
              className={`flex items-center gap-3 rounded-[10px] border px-3.5 py-2.5 ${lifted ? "relative z-10 -mx-1 rotate-[-1.2deg] border-pen bg-sheet shadow-float" : "border-line bg-paper/60"}`}
            >
              <svg viewBox="0 0 10 16" className={`h-3.5 w-2.5 shrink-0 ${lifted ? "text-pen" : "text-ink-faint"}`}>
                {[2, 8, 14].map((y) => [2.5, 7.5].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="currentColor" />))}
              </svg>
              <span className={`flex-1 ${lifted ? "font-semibold text-ink" : "text-ink-soft"}`}>{b}</span>
              {lifted && <span className="text-[0.75rem] text-pen">2 options</span>}
              {b === "Sign and pay deposit" && <span className="text-[0.75rem] text-ink-faint">30%</span>}
            </div>
          );
        })}
        <div className="flex items-center gap-2 pt-3 text-[0.8rem] text-ink-faint">
          <span>Start from</span>
          {["Website", "Brand identity", "Retainer"].map((t) => (
            <span key={t} className="rounded-full border border-line px-2.5 py-1 text-ink-soft">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 2. What the freelancer sees after sending */
function ActivityShot() {
  const feed = [
    { what: "Sent to Hannah", when: "10:02" },
    { what: "Opened on an iPhone", when: "10:41" },
    { what: "Read Packages for 2 minutes", when: "10:44", bar: true },
    { what: "Shared with Tom", when: "13:15" },
    { what: "Opened again on a laptop", when: "18:02", live: true },
  ];
  return (
    <div className="flex h-full flex-col text-[0.9rem]">
      <Bar title="Little Kettle Bakery" badge="Opened 3 times" tone="pen" />
      <ul className="flex-1 px-5 py-3 sm:px-6">
        {feed.map((f) => (
          <li key={f.what} className="flex items-start gap-3 border-b border-line/70 py-3.5 last:border-0">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${f.live ? "bg-paid ring-4 ring-paid/15" : "bg-ink/20"}`} />
            <span className="flex-1">
              <span className={f.live ? "font-semibold text-ink" : "text-ink-soft"}>{f.what}</span>
              {f.bar && (
                <span className="mt-2 flex gap-1" aria-hidden="true">
                  {[22, 64, 100, 30, 18].map((w, i) => (
                    <span key={i} className={`h-1.5 rounded-full ${w === 100 ? "bg-marker" : "bg-ink/10"}`} style={{ width: `${w * 0.5}px` }} />
                  ))}
                </span>
              )}
            </span>
            <span className="text-[0.8rem] text-ink-faint tabular-nums">{f.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 3. Signed, paid, and the rest already lined up */
function PaidShot() {
  return (
    <div className="flex h-full flex-col text-[0.9rem]">
      <Bar title="Little Kettle Bakery" badge="Signed and paid" tone="paid" />
      <div className="flex-1 space-y-3 px-5 py-5 sm:px-6">
        <Row icon="sign" title="Signed by Hannah Reid" detail="Monday at 18:08, from a laptop in Bristol" />
        <Row icon="paid" title="£780 deposit paid by card" detail="Monday at 18:09" strong />
        <Row icon="bank" title="Payout to your bank" detail="Thursday, on Stripe's usual schedule" />
        <div className="mt-2 rounded-xl border border-dashed border-ink/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-ink">Final invoice, £1,820</span>
            <span className="relative h-5 w-9 shrink-0 rounded-full bg-pen" aria-hidden="true">
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
            </span>
          </div>
          <p className="mt-1 text-[0.82rem] text-ink-soft">Sends when you mark the work done</p>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, title, detail, strong }: { icon: "sign" | "paid" | "bank"; title: string; detail: string; strong?: boolean }) {
  const paths = {
    sign: <path d="M3 13c2-4 4-8 5-6s-3 6-1 6 3-4 5-3 0 3 2 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
    paid: <path d="M4 9.5l3 3 6.5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    bank: <path d="M2.5 7.5L9 3.5l6.5 4M4 8v5M9 8v5M14 8v5M2.5 14.5h13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  };
  return (
    <div className={`flex items-center gap-3.5 rounded-xl p-3.5 ${strong ? "bg-paid-soft" : "bg-paper/70"}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${strong ? "bg-paid text-white" : "bg-sheet text-pen ring-1 ring-line"}`}>
        <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]">
          {paths[icon]}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-[0.82rem] text-ink-soft">{detail}</span>
      </span>
    </div>
  );
}
