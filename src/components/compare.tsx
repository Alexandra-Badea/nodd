/**
 * The same job told twice, as a week of emails. No statistics, just the back and forth every
 * freelancer recognises, next to what happens with one link.
 */
const usual = [
  { when: "Monday", what: "You email the proposal as a PDF." },
  { when: "Thursday", what: "“Looks great! Could we do the bigger one?”" },
  { when: "Friday", what: "You send a new PDF, and a contract to sign." },
  { when: "Next Wednesday", what: "You ask, politely, whether they've signed." },
  { when: "Next Thursday", what: "You send the deposit invoice." },
  { when: "The week after", what: "You chase the deposit. The work still hasn't started." },
];

const nodd = [
  { when: "Monday, 10:02", what: "You send one link." },
  { when: "Monday, 18:09", what: "Hannah picks the bigger package, signs and pays the deposit." },
  { when: "Tuesday", what: "You start the work." },
];

export function Compare() {
  return (
    <section aria-labelledby="compare-title" className="border-y border-line bg-sheet py-24 sm:py-32">
      <div className="wrap">
        <h2 id="compare-title" className="max-w-[20ch] text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.02]">
          Between “sounds good” and paid, there&apos;s usually a week of emails.
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div>
            <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em] text-ink-soft">The usual way</h3>
            <ol className="mt-5 border-l border-line">
              {usual.map((r) => (
                <li key={r.when} className="relative pb-6 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-[0.55rem] h-[9px] w-[9px] rounded-full border-[1.5px] border-ink-faint bg-sheet" aria-hidden="true" />
                  <span className="block text-[0.85rem] text-ink-faint">{r.when}</span>
                  <span className="block text-ink-soft">{r.what}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em] text-pen">With Nodd</h3>
            <ol className="mt-5 border-l-2 border-pen/30">
              {nodd.map((r, i) => (
                <li key={r.when} className="relative pb-8 pl-6 last:pb-0">
                  <span
                    className={`absolute -left-[7px] top-[0.45rem] grid h-3 w-3 place-items-center rounded-full ${i === 1 ? "bg-paid" : "bg-pen"}`}
                    aria-hidden="true"
                  />
                  <span className="block text-[0.85rem] text-ink-faint">{r.when}</span>
                  <span className={`block text-[1.15rem] leading-snug text-ink ${i === 1 ? "font-semibold" : ""}`}>{r.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
