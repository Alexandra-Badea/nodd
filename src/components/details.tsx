const items = [
  {
    title: "Packages, not one price",
    body: "Offer up to three versions of the work. Clients compare them on the page instead of asking for a discount by email.",
  },
  {
    title: "Signatures you can rely on",
    body: "Each signature is saved with the time, the email it was sent to and the device it came from. You both get a signed PDF.",
  },
  {
    title: "The deposit before you start",
    body: "Ask for a fixed amount or a percentage. Clients pay by card, Apple Pay, Google Pay or bank transfer, through Stripe.",
  },
  {
    title: "Reminders that send themselves",
    body: "If a proposal sits unopened for three days, Nodd sends a friendly nudge, written in your words.",
  },
  {
    title: "Your name on it",
    body: "Your logo, your colours and your email address. On the Studio plan, your own web address too.",
  },
  {
    title: "Changes without starting over",
    body: "Clients comment on any part. You edit it, and the same link updates. Nothing gets lost in an email thread.",
  },
];

export function Details() {
  return (
    <section aria-labelledby="details-title" className="pb-24 sm:pb-32">
      <div className="wrap">
        <h2 id="details-title" className="max-w-[18ch] text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.02]">
          The small things that get you paid sooner
        </h2>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-12">
          {items.map((it) => (
            <li key={it.title} className="border-t-2 border-ink pt-5">
              <h3 className="text-[1.3rem] leading-snug tracking-[-0.02em]">{it.title}</h3>
              <p className="mt-2 text-ink-soft">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
