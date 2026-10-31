const faqs = [
  {
    q: "Do my clients need an account?",
    a: "No. They open the link, read, sign and pay. They can come back to the same link any time to see what they agreed to.",
  },
  {
    q: "Is a signature on Nodd legally binding?",
    a: "In the UK, the EU and the US, electronic signatures are valid for most business agreements, including proposals and service contracts. Nodd keeps a record of who signed, when and from where. For anything unusual, check with a lawyer.",
  },
  {
    q: "Can I use my own contract?",
    a: "Yes. Paste in your terms or upload a PDF, and Nodd adds the signature and deposit step at the end.",
  },
  {
    q: "How do I get the money?",
    a: "Connect your Stripe account once. Deposits and invoices are paid into it, and Stripe sends them on to your bank on its usual schedule.",
  },
  {
    q: "What if the client wants changes?",
    a: "They leave a comment on the part they'd like changed. You edit the proposal and the same link updates, so there's only ever one version.",
  },
  {
    q: "Can I cancel?",
    a: "Any time, from your settings. Your signed proposals stay available to download, even on the free plan.",
  },
];

export function Questions() {
  return (
    <section id="questions" aria-labelledby="questions-title" className="py-24 sm:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <h2 id="questions-title" className="text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.02]">
            Questions
          </h2>
          <p className="mt-4 max-w-[22rem] text-ink-soft">The things freelancers ask before sending their first proposal.</p>
        </div>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.12rem] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="relative h-6 w-6 shrink-0 rounded-full ring-1 ring-line transition-colors group-hover:ring-ink/30" aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-2.5 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-[38rem] pb-6 pr-10 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
